-- CreateTable
CREATE TABLE "Traffic" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "userIdentifier" TEXT NOT NULL,
    "referrer" TEXT NOT NULL,
    "organicSource" TEXT NOT NULL,
    "view" INTEGER NOT NULL,

    CONSTRAINT "Traffic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllTraffic" (
    "id" TEXT NOT NULL,
    "totalCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AllTraffic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Traffic_userIdentifier_key" ON "Traffic"("userIdentifier");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Traffic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
