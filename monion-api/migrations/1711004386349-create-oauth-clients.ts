import { MigrationInterface, QueryRunner } from 'typeorm';
import { randomBytes } from 'crypto';

/**
 * Represents a migration to create OAuth clients.
 */
export class CreateOauthClients1711004386349 implements MigrationInterface {
  /**
   * Runs the migration to create OAuth clients.
   *
   * @param queryRunner - The query runner object.
   *
   * @returns A promise that resolves when the migration is complete.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    let existingUser = await queryRunner.query(
      'SELECT * FROM "users" WHERE "email" = $1',
      ['admin@monion.com'],
    );

    if (existingUser.length === 0) {
      const userPassword = randomBytes(16).toString('hex');
      await queryRunner.query(
        'INSERT INTO "users" ("email", "password") VALUES ($1, $2)',
        ['admin@monion.com', userPassword],
      );

      existingUser = await queryRunner.query(
        'SELECT * FROM "users" WHERE "email" = $1',
        ['admin@monion.com'],
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
        'INSERT INTO "oauth_clients" ("clientId", "clientSecret", "clientName", "redirectUri", "grants", "scope", "userId") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [
          clientId,
          clientSecret,
          'MonionSuperClient',
          'http://localhost:3000',
          ['client_credentials', 'password', 'refresh_token'],
          ['super'],
          userId,
        ],
      );
    }
  }

  /**
   * Reverts the migration by deleting the created OAuth client.
   *
   * @param queryRunner - The query runner object.
   *
   * @returns A promise that resolves when the migration is complete.
   */
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
