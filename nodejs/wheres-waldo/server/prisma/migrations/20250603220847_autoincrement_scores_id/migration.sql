-- AlterTable
CREATE SEQUENCE score_id_seq;
ALTER TABLE "Score" ALTER COLUMN "id" SET DEFAULT nextval('score_id_seq');
ALTER SEQUENCE score_id_seq OWNED BY "Score"."id";
