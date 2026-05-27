import { prisma } from '../src/database/prisma';

async function main(): Promise<void> {
  const totalProdutos = await prisma.produto.count();

  if (totalProdutos > 0) {
    console.log('Seed ignorado: já existem produtos cadastrados.');
    return;
  }

  await prisma.produto.createMany({
    data: [
      {
        name: 'Notebook Pro',
        description: 'Notebook para produtividade e desenvolvimento',
        price: 5999.9,
        category: 'Eletrônicos',
        active: true,
      },
      {
        name: 'Mouse Ergonômico',
        description: 'Mouse com design ergonômico e sensor preciso',
        price: 189.9,
        category: 'Periféricos',
        active: true,
      },
      {
        name: 'Teclado Mecânico',
        description: 'Teclado mecânico com switches táteis',
        price: 449.9,
        category: 'Periféricos',
        active: true,
      },
    ],
  });

  console.log('Seed executado com sucesso.');
}

main()
  .catch((erro) => {
    console.error('Erro ao executar seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
