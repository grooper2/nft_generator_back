--CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "assets" (
    "asset_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "project_id" UUID NOT NULL,
    "asset_type" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "image_file" TEXT NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("asset_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "users_projects" (
    "project_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id" UUID NOT NULL,
    "project_title" TEXT NOT NULL,
    "date_created" DATE NOT NULL,

    CONSTRAINT "users_projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");
