-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CITOYEN', 'OFFICIER', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatutDeclaration" AS ENUM ('EN_ATTENTE', 'VALIDEE', 'REJETEE');

-- CreateEnum
CREATE TYPE "TypeExtrait" AS ENUM ('INTEGRALE', 'AVEC_FILIATION', 'SANS_FILIATION');

-- CreateEnum
CREATE TYPE "StatutDemande" AS ENUM ('EN_COURS', 'PRETE', 'DELIVREE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CITOYEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "declarations" (
    "id" TEXT NOT NULL,
    "numeroActe" TEXT,
    "statut" "StatutDeclaration" NOT NULL DEFAULT 'EN_ATTENTE',
    "prenomEnfant" TEXT NOT NULL,
    "nomEnfant" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "lieuNaissance" TEXT NOT NULL,
    "sexe" TEXT NOT NULL,
    "prenomPere" TEXT NOT NULL,
    "nomPere" TEXT NOT NULL,
    "nationalitePere" TEXT,
    "prenomMere" TEXT NOT NULL,
    "nomMere" TEXT NOT NULL,
    "nationaliteMere" TEXT,
    "motifRejet" TEXT,
    "dateValidation" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "citoyenId" TEXT NOT NULL,
    "officierIdValidateur" TEXT,

    CONSTRAINT "declarations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demandes_extraits" (
    "id" TEXT NOT NULL,
    "type" "TypeExtrait" NOT NULL,
    "statut" "StatutDemande" NOT NULL DEFAULT 'EN_COURS',
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "declarationId" TEXT NOT NULL,
    "citoyenId" TEXT NOT NULL,

    CONSTRAINT "demandes_extraits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "declarations_numeroActe_key" ON "declarations"("numeroActe");

-- AddForeignKey
ALTER TABLE "declarations" ADD CONSTRAINT "declarations_citoyenId_fkey" FOREIGN KEY ("citoyenId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "declarations" ADD CONSTRAINT "declarations_officierIdValidateur_fkey" FOREIGN KEY ("officierIdValidateur") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demandes_extraits" ADD CONSTRAINT "demandes_extraits_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "declarations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demandes_extraits" ADD CONSTRAINT "demandes_extraits_citoyenId_fkey" FOREIGN KEY ("citoyenId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
