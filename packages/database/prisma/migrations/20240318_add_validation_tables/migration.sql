-- CreateEnum
CREATE TYPE "ValidationStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'FAILED');
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE', 'LEMON_SQUEEZY');
CREATE TYPE "NotificationType" AS ENUM ('MOTIVATIONAL', 'NEW_INSIGHTS', 'VALIDATION_COMPLETE', 'CREDIT_LOW');
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "Validation" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "filePath" TEXT,
  "status" "ValidationStatus" NOT NULL DEFAULT 'IN_PROGRESS',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Validation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidationResult" (
  "id" TEXT NOT NULL,
  "validationId" TEXT NOT NULL,
  "viralityScore" DOUBLE PRECISION NOT NULL,
  "uniquenessScore" DOUBLE PRECISION NOT NULL,
  "problemSolvingScore" DOUBLE PRECISION NOT NULL,
  "overallScore" DOUBLE PRECISION NOT NULL,
  "insights" JSONB NOT NULL,
  "suggestions" TEXT NOT NULL,
  "urgency" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ValidationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credit" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "totalCredits" INTEGER NOT NULL DEFAULT 0,
  "usedCredits" INTEGER NOT NULL DEFAULT 0,
  "lastRefillDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "paymentMethod" "PaymentMethod" NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "creditsAdded" INTEGER NOT NULL,
  "transactionId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" "NotificationType" NOT NULL,
  "content" TEXT NOT NULL,
  "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "sentAt" TIMESTAMP(3),

  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiCall" (
  "id" TEXT NOT NULL,
  "validationId" TEXT NOT NULL,
  "apiName" TEXT NOT NULL,
  "endpoint" TEXT NOT NULL,
  "responseData" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ApiCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValidationResult_validationId_key" ON "ValidationResult"("validationId");
CREATE UNIQUE INDEX "Credit_userId_key" ON "Credit"("userId");
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");
CREATE UNIQUE INDEX "Setting_key_key" ON "Setting"("key");

-- CreateIndex
CREATE INDEX "Validation_userId_idx" ON "Validation"("userId");
CREATE INDEX "ValidationResult_validationId_idx" ON "ValidationResult"("validationId");
CREATE INDEX "Credit_userId_idx" ON "Credit"("userId");
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX "ApiCall_validationId_idx" ON "ApiCall"("validationId");

-- AddForeignKey
ALTER TABLE "Validation" ADD CONSTRAINT "Validation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValidationResult" ADD CONSTRAINT "ValidationResult_validationId_fkey" FOREIGN KEY ("validationId") REFERENCES "Validation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiCall" ADD CONSTRAINT "ApiCall_validationId_fkey" FOREIGN KEY ("validationId") REFERENCES "Validation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
 