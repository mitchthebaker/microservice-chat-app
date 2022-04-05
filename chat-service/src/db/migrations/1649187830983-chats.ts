import { query } from "express";
import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class Chats1649187830983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          columns: [
            {
              isPrimary: true,
              length: "36",
              name: "id",
              type: "char"
            },
            {
              default: "now()",
              name: "createdAt",
              type: "timestamp"
            },
            {
              length: "500",
              name: "message",
              type: "varchar"
            },
            {
              length: "25",
              name: "username",
              type: "varchar"
            }
          ],
          name: "chats"
        })
      );

      /*await queryRunner.createIndex(
        "chats",
        new TableIndex({
          columnNames: ["username"],
          isUnique: true,
          name: "unique_username",
        })
      );*/
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("chats");
    }

}
