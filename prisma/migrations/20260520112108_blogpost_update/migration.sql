-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_commentId_fkey";

-- AlterTable
ALTER TABLE "BlogPost" ALTER COLUMN "commentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
