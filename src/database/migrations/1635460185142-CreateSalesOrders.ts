import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSalesOrders1635460185142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'saleOrders',
                columns: [
                    {
                      name: 'id',
                      type: 'varchar',
                      isPrimary: true,
                      generationStrategy: "uuid"
                    },
                    {
                        name: 'client_id',
                        type: "varchar",
                        generationStrategy: "uuid",
                        isNullable: false,
                    },
                    {
                        name: 'product_id',
                        type: "varchar",
                        generationStrategy: "uuid",
                        isNullable: false,
                    },
                    {
                        name: 'amount',
                        type: 'int',
                    },
                    {
                        name: 'saleDate',
                        type: 'Date',
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
                ],
                foreignKeys: [
                    {
                        name: 'FKClient',
                        referencedTableName: 'clients',
                        referencedColumnNames: ['id'],
                        columnNames: ['client_id'],      
                    },
                    {
                        name: 'FKProduct',
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['product_id'],
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('saleOrders')
    }
}
