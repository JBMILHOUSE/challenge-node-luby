import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTokens1617248698735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
          new Table({
              name: "tokens",
              columns: [
                {
                  name: "id",
                  type :"uuid",
                  isPrimary: true,
                },
                {
                   name: "user_id",
                   type: "uuid",
                   isNullable: true,
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
      await queryRunner.createForeignKey(
          "tokens",
          new TableForeignKey({
              name: "UsersToken",
              columnNames: ["user_id"],
              referencedColumnNames: ["id"],
              referencedTableName: "users",
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
          }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.dropTable("tokens");
     await queryRunner.dropForeignKey("tokens", "UsersToken");
    }

}
