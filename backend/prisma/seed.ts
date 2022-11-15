import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

const date = new Date('2022-11-01T04:34:22+09:00');

const userData: User[] = [
  {
    id: '21514d8b-e6af-490c-bc51-d0c7a359a267',
    createdAt: new Date(date),
    updatedAt: new Date(date),
    name: 'dummy1',
  },
  {
    id: '40e8b4b4-9b39-4b7e-8e31-78e31975d320',
    createdAt: new Date(date),
    updatedAt: new Date(date),
    name: 'dummy2',
  },
  {
    id: '5001da8b-0316-411e-a34f-1db29d4d4c4b',
    createdAt: new Date(date),
    updatedAt: new Date(date),
    name: 'dummy3',
  },
  {
    id: '7fd8fa2a-398f-495a-bb55-7290136c7e3f',
    createdAt: new Date(date),
    updatedAt: new Date(date),
    name: 'dummy4',
  },
  {
    id: '9f1b53bf-e25d-4630-a174-ac4c7adadcd6',
    createdAt: new Date(date),
    updatedAt: new Date(date),
    name: 'dummy5',
  },
];

const createUsers = async () => {
  const users = [];
  for (const u of userData) {
    const user = prisma.user.create({
      data: u,
    });
    users.push(user);
  }

  return await prisma.$transaction(users);
};

// const updateUsers = async () => {
//   const firstIndex = 0;
//   const lastIndex = userData.length - 1;
//   for (let i = 1; i < lastIndex; i++) {
//     await prisma.user.update({
//       where: { id: userData[i].id },
//       data: {
//         updatedAt: new Date(),
//         following: {
//           connect: [
//             { id: userData[i - 1].id },
//             { id: userData[firstIndex].id },
//           ],
//         },
//         followedBy: {
//           connect: [{ id: userData[i - 1].id }, { id: userData[lastIndex].id }],
//         },
//       },
//     });
//   }
// };

const main = async () => {
  console.log(`Start seeding ...`);

  await createUsers();
  // await updateUsers();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
