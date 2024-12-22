-- Create auth schema and extension
CREATE SCHEMA IF NOT EXISTS auth;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create auth.user_id() function
CREATE OR REPLACE FUNCTION auth.user_id() RETURNS text AS $$
BEGIN
  RETURN current_setting('request.jwt.claim.sub', true);
EXCEPTION
  WHEN OTHERS THEN RETURN NULL;
END
$$ LANGUAGE plpgsql;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,
    "username" TEXT,
    "externalId" TEXT,
    "publicMetadata" JSONB,
    "privateMetadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- Enable RLS
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data" ON "User"
    FOR SELECT
    USING (auth.user_id() = id);

CREATE POLICY "Users can update their own data" ON "User"
    FOR UPDATE
    USING (auth.user_id() = id); 