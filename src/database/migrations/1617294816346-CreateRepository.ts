import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRepository1617294816346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "repositories",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "open",
                        type: "boolean",
                        isNullable: false,
                    },
                    {
                        name: "slug",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },

                ],
            }),
        );
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("repositories");
    }

}
