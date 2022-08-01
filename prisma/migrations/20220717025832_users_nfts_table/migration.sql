-- CreateTable
CREATE TABLE "users_nfts" (
    "nft_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "project_id" UUID NOT NULL,
    "nft_name" TEXT NOT NULL,
    "nft_file" TEXT NOT NULL,
    "date_created" DATE NOT NULL,

    CONSTRAINT "users_nfts_pkey" PRIMARY KEY ("nft_id")
);
