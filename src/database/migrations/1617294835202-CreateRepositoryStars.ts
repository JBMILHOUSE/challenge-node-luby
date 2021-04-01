import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRepositoryStars1617294835202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "repositories_stars",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "repository_id",
                        type: "uuid",
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
        await queryRunner.createForeignKeys(
            "repositories_stars", [
                new TableForeignKey({
                    name: "UserRepositories",
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                }),
                new TableForeignKey({
                    name: "RepositoriesStars",
                    columnNames: ["repository_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "repositories",
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                }),
            ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("repositories_stars")
        await queryRunner.dropForeignKeys("repositories_stars", []);
    }

}
