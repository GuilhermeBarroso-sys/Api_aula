import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProvider1636415823678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table(
        {
          name: "providers",
          columns: [
            {
              name: "id",
              type: "varchar",
              generationStrategy: "uuid"
            },
            {
              name: "name",
              type: "varchar",
              isNullable: false,
            },
            {
              name: "email",
              type: "varchar",
              isNullable: false,
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
            }
          ]
        }
      ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('providers')
    }

}
