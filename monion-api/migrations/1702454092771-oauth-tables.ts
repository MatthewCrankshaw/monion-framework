import { MigrationInterface, QueryRunner } from 'typeorm';

export class OauthTables1702454092771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "username" TEXT,
        "password" TEXT
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "oauth_clients" (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "clientId" TEXT,
        "clientSecret" TEXT,
        "redirectUri" TEXT,
        "grants" TEXT[],
        "scopes" TEXT[],
        "userId" uuid REFERENCES "users"("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "oauth_tokens" (
          "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "accessToken" text,
          "accessTokenExpiresAt" TIMESTAMP WITHOUT TIME ZONE,
          "clientId" uuid REFERENCES "oauth_clients"("id"),
          "refreshToken" text,
          "refreshTokenExpiresAt" TIMESTAMP WITHOUT TIME ZONE,
          "userId" uuid REFERENCES "users"("id")
      );
    `);

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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "oauth_tokens";`);
    await queryRunner.query(`DROP TABLE "oauth_clients";`);
    await queryRunner.query(`DROP TABLE "users";`);
    await queryRunner.query(`DROP TABLE "oauth_authorisation_codes"`);
  }
}
