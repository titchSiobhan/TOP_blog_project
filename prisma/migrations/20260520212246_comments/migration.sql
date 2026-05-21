/*
  Warnings:

  - You are about to drop the column `commentId` on the `BlogPost` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_commentId_fkey";

-- DropIndex
DROP INDEX "BlogPost_title_key";

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "commentId";

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "postId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
