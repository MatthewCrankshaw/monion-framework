import { MigrationInterface, QueryRunner } from 'typeorm';

export class OauthTables1702454092771 implements MigrationInterface {
  /**
   * Executes the migration, creating the necessary tables for OAuth functionality.
   *
   * @param queryRunner - The query runner used to execute the database queries.
   *
   * @returns A promise that resolves when the migration is complete.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the necessary extension for UUID generation
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Create the "users" table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "username" TEXT,
        "password" TEXT
      );
    `);

    // Create the "oauth_clients" table
    await queryRunner.query(`
      CREATE TABLE "oauth_clients" (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "clientId" TEXT,
        "clientSecret" TEXT,
        "clientName" TEXT,
        "redirectUri" TEXT,
        "grants" TEXT[],
        "scopes" TEXT[],
        "userId" uuid REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);

    // Create the "oauth_tokens" table
    await queryRunner.query(`
      CREATE TABLE "oauth_tokens" (
          "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "accessToken" text,
          "accessTokenExpiresAt" TIMESTAMP WITHOUT TIME ZONE,
          "clientId" uuid REFERENCES "oauth_clients"("id") ON DELETE CASCADE,
          "refreshToken" text,
          "refreshTokenExpiresAt" TIMESTAMP WITHOUT TIME ZONE,
          "userId" uuid REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);

    // Create the "oauth_authorisation_codes" table
    await queryRunner.query(`
      CREATE TABLE "oauth_authorisation_codes" (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "authorizationCode" TEXT,
        "expiresAt"  TIMESTAMP WITHOUT TIME ZONE,
        "redirectUri" TEXT,
        "scope" TEXT[],
        "clientId" uuid REFERENCES "oauth_clients"("id"),
        "userId" uuid  REFERENCES "users"("id"),
        "codeChallenge" TEXT,
        "codeChallengeMethod" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  /**
   * Reverts the migration, dropping the created tables.
   *
   * @param queryRunner - The query runner used to execute the database queries.
   *
   * @returns A promise that resolves when the migration is complete.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the "oauth_tokens" table
    await queryRunner.query(`DROP TABLE "oauth_tokens";`);

    // Drop the "oauth_authorisation_codes" table
    await queryRunner.query(`DROP TABLE "oauth_authorisation_codes"`);

    // Drop the "oauth_clients" table
    await queryRunner.query(`DROP TABLE "oauth_clients";`);

    // Drop the "users" table
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
