/*
  Warnings:

  - A unique constraint covering the columns `[deaprtmentId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Employee_deaprtmentId_key` ON `Employee`(`deaprtmentId`);
