-- DropForeignKey
ALTER TABLE "ApiCall" DROP CONSTRAINT "ApiCall_validationId_fkey";

-- DropForeignKey
ALTER TABLE "Credit" DROP CONSTRAINT "Credit_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Validation" DROP CONSTRAINT "Validation_userId_fkey";

-- DropForeignKey
ALTER TABLE "ValidationResult" DROP CONSTRAINT "ValidationResult_validationId_fkey";
