import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'maikel@email.com' },
    update: {},
    create: {
      username: 'maikel',
      email: 'maikel@email.com',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      cep: '59060230',
      estado: 'RN',
      cidade: 'Natal',
      bairro: 'Bom Pastor',
      rua: 'Av. Lima e Silva',
      posicao: 'Feroz',
      gols: 0,
    },
  });
  const grupo = await prisma.grupo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      admin_id: 1,
      descricao: 'uma pelada muito invocada',
      nome: 'pelada invocada',
    },
  });

  const pelada = await prisma.pelada.upsert({
    where: { id: 1 },
    update: {},
    create: {
      grupo_id: 1,
      data: new Date('01-01-1900'),
      cep: 'testing',
      rua: 'testing',
      bairro: 'testing',
      cidade: 'testing',
      estado: 'testing',
    },
  });

  console.log(user, grupo, pelada);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// async function main() {
//   const alice = await prisma.user.upsert({
//     where: { email: 'alice@prisma.io' },
//     update: {},
//     create: {
//       email: 'alice@prisma.io',
//       name: 'Alice',
//       posts: {
//         create: {
//           title: 'Check out Prisma with Next.js',
//           content: 'https://www.prisma.io/nextjs',
//           published: true,
//         },
//       },
//     },
//   })
//   console.log({ alice, bob })
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
