import { MigrationInterface, QueryRunner } from 'typeorm';
import { randomBytes } from 'crypto';

export class CreateOauthClients1711004386349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let existingUser = await queryRunner.query(
      'SELECT * FROM "users" WHERE "username" = $1',
      ['MonionSuperUser'],
    );

    if (existingUser.length === 0) {
      const userPassword = randomBytes(16).toString('hex');
      await queryRunner.query(
        'INSERT INTO "users" ("username", "password") VALUES ($1, $2)',
        ['MonionSuperUser', userPassword],
      );

      existingUser = await queryRunner.query(
        'SELECT * FROM "users" WHERE "username" = $1',
        ['MonionSuperUser'],
      );
    }

    const userId = existingUser[0].id;
    const existingClient = await queryRunner.query(
      'SELECT * FROM "oauth_clients" WHERE "clientName" = $1',
      ['MonionSuperClient'],
    );

    if (existingClient.length === 0) {
      const clientId = randomBytes(16).toString('hex');
      const clientSecret = randomBytes(16).toString('hex');
      await queryRunner.query(
        'INSERT INTO "oauth_clients" ("clientId", "clientSecret", "clientName", "redirectUri", "grants", "scopes", "userId") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [
          clientId,
          clientSecret,
          'MonionSuperClient',
          'http://localhost:3000',
          ['client_credentials', 'password'],
          ['super'],
          userId,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const superClient = await queryRunner.query(
      'SELECT * FROM "oauth_clients" WHERE "clientName" = $1',
      ['MonionSuperClient'],
    );

    if (superClient.length !== 0) {
      await queryRunner.query('DELETE FROM "oauth_clients" WHERE "id" = $1', [
        superClient[0].id,
      ]);
    }
  }
}
