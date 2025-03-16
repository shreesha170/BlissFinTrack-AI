-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AccountType" ADD VALUE 'FD';
ALTER TYPE "AccountType" ADD VALUE 'RD';
ALTER TYPE "AccountType" ADD VALUE 'SALARY';
ALTER TYPE "AccountType" ADD VALUE 'PPF';
ALTER TYPE "AccountType" ADD VALUE 'DEMAT';
ALTER TYPE "AccountType" ADD VALUE 'LOAN';
