import { PrismaClient } from '@prisma/client';

/**
 * Cliente Prisma compartilhado pela aplicação.
 * Mantém uma única instância para evitar múltiplas conexões em dev/teste.
 */
const prisma = new PrismaClient();

export async function conectarBanco(): Promise<void> {
  await prisma.$connect();
}

export async function desconectarBanco(): Promise<void> {
  await prisma.$disconnect();
}

export { prisma };
