-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "occurred_at" DATETIME NOT NULL,
    "actor_email" TEXT NOT NULL,
    "actor_name" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "action_name" TEXT NOT NULL,
    "action_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL
);
