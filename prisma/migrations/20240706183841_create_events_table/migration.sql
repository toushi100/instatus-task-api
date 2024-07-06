-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "actor_email" TEXT NOT NULL,
    "actor_name" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "action_name" TEXT NOT NULL,
    "action_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
