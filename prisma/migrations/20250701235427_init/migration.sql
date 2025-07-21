/*
  Warnings:

  - You are about to drop the column `userId` on the `travel_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId,travelId]` on the table `travel_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `travel_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "travel_users" DROP CONSTRAINT "travel_users_userId_fkey";

-- DropIndex
DROP INDEX "travel_users_userId_travelId_key";

-- AlterTable
ALTER TABLE "travel_users" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "travel_users_clerkId_travelId_key" ON "travel_users"("clerkId", "travelId");

-- AddForeignKey
ALTER TABLE "travel_users" ADD CONSTRAINT "travel_users_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "users"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
