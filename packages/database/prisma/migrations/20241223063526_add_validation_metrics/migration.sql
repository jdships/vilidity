-- CreateTable
CREATE TABLE "ValidationMetrics" (
    "id" TEXT NOT NULL,
    "validationId" TEXT NOT NULL,
    "marketSize" DOUBLE PRECISION NOT NULL,
    "targetAudience" DOUBLE PRECISION NOT NULL,
    "competitorCount" INTEGER NOT NULL,
    "growthPotential" DOUBLE PRECISION NOT NULL,
    "marketTrends" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValidationMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitorAnalysis" (
    "id" TEXT NOT NULL,
    "metricsId" TEXT NOT NULL,
    "competitorName" TEXT NOT NULL,
    "marketShare" DOUBLE PRECISION NOT NULL,
    "strengthScore" DOUBLE PRECISION NOT NULL,
    "weaknessScore" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitorAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketTrend" (
    "id" TEXT NOT NULL,
    "validationId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "trendValue" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketTrend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValidationMetrics_validationId_key" ON "ValidationMetrics"("validationId");

-- CreateIndex
CREATE INDEX "ValidationMetrics_validationId_idx" ON "ValidationMetrics"("validationId");

-- CreateIndex
CREATE INDEX "CompetitorAnalysis_metricsId_idx" ON "CompetitorAnalysis"("metricsId");

-- CreateIndex
CREATE INDEX "MarketTrend_validationId_idx" ON "MarketTrend"("validationId");
