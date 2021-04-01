import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateFollower1617294705654 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "followers",
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
                        name: "follower_id",
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
            "followers", [
                new TableForeignKey({
                    name: "UserFollower",
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                }),
                new TableForeignKey({
                    name: "FollowerUser",
                    columnNames: ["follower_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                }),
            ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("followers");
        await queryRunner.dropForeignKeys("followers", []);
    }

}
