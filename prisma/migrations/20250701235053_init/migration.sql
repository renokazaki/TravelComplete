-- DropForeignKey
ALTER TABLE "travel_users" DROP CONSTRAINT "travel_users_userId_fkey";

-- AddForeignKey
ALTER TABLE "travel_users" ADD CONSTRAINT "travel_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
