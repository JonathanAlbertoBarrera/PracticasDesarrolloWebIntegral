-- CreateTable
CREATE TABLE "Libro" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "sinopsis" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "anioPublicacion" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "editorial" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);
