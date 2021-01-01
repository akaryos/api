import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class UploadFile1609385940615 implements MigrationInterface {
  name = 'UploadFile1609385940615'

  public async up (queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'files',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'original',
        type: 'varchar'
      }, {
        name: 'type',
        type: 'varchar'
      }, {
        name: 'size',
        type: 'varchar'
      }, {
        name: 'url',
        type: 'varchar'
      }, {
        name: 'user_id',
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FileAuthor',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files')
  }
}
