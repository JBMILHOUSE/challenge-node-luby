import {MigrationInterface, QueryRunner, Table, TableForeignKey, } from "typeorm";

export class CreateFollowing1617294774334 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "following",
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
                        name: "following_id",
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
            "following", [
                new TableForeignKey({
                    name: "UserFollowing",
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                }),
                new TableForeignKey({
                    name: "FollowingUser",
                    columnNames: ["following_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                }),
            ]);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("following");
        await queryRunner.dropForeignKeys("following", []);
    }

}
