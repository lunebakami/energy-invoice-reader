-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "client_number" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "eletric_energy" INTEGER NOT NULL,
    "eletric_energy_value" DOUBLE PRECISION NOT NULL,
    "sceee_energy" INTEGER NOT NULL,
    "sceee_energy_value" DOUBLE PRECISION NOT NULL,
    "compensated_energy" INTEGER NOT NULL,
    "compensated_energy_value" DOUBLE PRECISION NOT NULL,
    "public_ilumination" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
