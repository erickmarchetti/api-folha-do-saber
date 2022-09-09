import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRelationWriterUser1662734514393 implements MigrationInterface {
    name = 'updateRelationWriterUser1662734514393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "writer" DROP CONSTRAINT "FK_c7bdfd3508c3f161cfba39e034d"`);
        await queryRunner.query(`ALTER TABLE "writer" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "writer" ADD CONSTRAINT "FK_c7bdfd3508c3f161cfba39e034d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "writer" DROP CONSTRAINT "FK_c7bdfd3508c3f161cfba39e034d"`);
        await queryRunner.query(`ALTER TABLE "writer" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "writer" ADD CONSTRAINT "FK_c7bdfd3508c3f161cfba39e034d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
