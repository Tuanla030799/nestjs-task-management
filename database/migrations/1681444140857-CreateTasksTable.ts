import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTasksTable1681444140857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'title',
            default: "''",
            type: 'varchar',
          },
          {
            name: 'description',
            default: "''",
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
  }
}
