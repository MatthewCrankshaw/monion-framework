import { MigrationInterface, QueryRunner } from 'typeorm';

export class OauthTables1702454092771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "oauth_tokens" (
          "id" uuid PRIMARY KEY,
          "access_token" text,
          "access_token_expires_on" TIMESTAMP WITHOUT TIME ZONE,
          "client_id" text,
          "refresh_token" text,
          "refresh_token_expires_on" TIMESTAMP WITHOUT TIME ZONE,
          "user_id" uuid
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "oauth_clients" (
        "client_id" TEXT,
        "client_secret" TEXT,
        "redirect_url" TEXT,
        PRIMARY KEY("client_id", "client_secret")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid PRIMARY KEY,
        "username" TEXT,
        "password" TEXT
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "oauth_tokens";`);
    await queryRunner.query(`DROP TABLE "oauth_clients";`);
    await queryRunner.query(`DROP TABLE "user";`);
  }
}
