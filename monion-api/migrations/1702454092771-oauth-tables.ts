import { MigrationInterface, QueryRunner } from 'typeorm';

export class OauthTables1702454092771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "oauth_tokens" (
          "id" uuid PRIMARY KEY,
          "access_token" text,
          "access_token_expires_at" TIMESTAMP WITHOUT TIME ZONE,
          "client_id" text,
          "refresh_token" text,
          "refresh_token_expires_at" TIMESTAMP WITHOUT TIME ZONE,
          "user_id" uuid
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "oauth_clients" (
        "id" uuid PRIMARY KEY,
        "client_id" TEXT,
        "client_secret" TEXT,
        "redirect_url" TEXT,
        "grants" TEXT[]
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid PRIMARY KEY,
        "username" TEXT,
        "password" TEXT
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "oauth_authorisation_codes" (
        "id" uuid PRIMARY KEY,
        "authorisation_code" TEXT,
        "expires_at"  TIMESTAMP WITHOUT TIME ZONE,
        "redirect_uri" TEXT,
        "client_id" uuid,
        "user_id" uuid
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "oauth_tokens";`);
    await queryRunner.query(`DROP TABLE "oauth_clients";`);
    await queryRunner.query(`DROP TABLE "user";`);
    await queryRunner.query(`DROP TABLE "oauth_authorisation_codes"`);
  }
}
