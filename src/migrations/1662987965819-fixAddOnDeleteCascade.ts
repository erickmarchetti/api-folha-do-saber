import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAddOnDeleteCascade1662987965819 implements MigrationInterface {
    name = 'fixAddOnDeleteCascade1662987965819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "writer" DROP CONSTRAINT "FK_c7bdfd3508c3f161cfba39e034d"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_1dc5653cff6bd54aefe98f2e2cb"`);
        await queryRunner.query(`ALTER TABLE "writer" ADD CONSTRAINT "FK_c7bdfd3508c3f161cfba39e034d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_1dc5653cff6bd54aefe98f2e2cb" FOREIGN KEY ("writerId") REFERENCES "writer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_1dc5653cff6bd54aefe98f2e2cb"`);
        await queryRunner.query(`ALTER TABLE "writer" DROP CONSTRAINT "FK_c7bdfd3508c3f161cfba39e034d"`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_1dc5653cff6bd54aefe98f2e2cb" FOREIGN KEY ("writerId") REFERENCES "writer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "writer" ADD CONSTRAINT "FK_c7bdfd3508c3f161cfba39e034d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
