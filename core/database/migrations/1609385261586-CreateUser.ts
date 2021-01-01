import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUser1609385261586 implements MigrationInterface {
  name = 'CreateUser1609385261586'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    queryRunner.createTable(new Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'username',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
