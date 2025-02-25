import {
  Block,
  FriendRequest,
  PrismaClient,
  User,
  MatchResult,
  OneTimePasswordAuth,
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const num = (n: number) => `${n.toString().padStart(3, '0')}`;

/**
 * 50 + 3個のuuidをMapで作成。
 * key  :
 *        dummy001~3
 *        friends001~10
 *        requesting001~10
 *        pending001~10
 *        blocked001~10
 *        add-friend001~10
 * value: uuid
 */
const idMap = new Map<string, string>();
for (let i = 1; i <= 3; i++) {
  idMap.set('dummy' + num(i), uuidv4());
}
for (let i = 1; i <= 10; i++) {
  idMap.set('friends' + num(i), uuidv4());
  idMap.set('requesting' + num(i), uuidv4());
  idMap.set('pending' + num(i), uuidv4());
  idMap.set('blocked' + num(i), uuidv4());
  idMap.set('add-friend' + num(i), uuidv4());
}

const getColorCode = (name: string) => {
  let colorCode = '0C163D';
  if (name.match(/friends/) != null) {
    colorCode = 'E26B00';
  } else if (name.match(/blocked/) != null) {
    colorCode = 'F4C500';
  }

  return colorCode;
};

/**
 * idMapを使って、50 + 3件のuserを作成。
 */
const userData: User[] = [];
idMap.forEach((value, key) => {
  const colorCode = getColorCode(key);
  userData.push({
    id: value,
    name: key,
    avatarImageUrl:
      `https://placehold.jp/${colorCode}/fffffe/150x150.png?text=` + key,
    nickname: 'n-' + key,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

/**
 * user全員のotpAuthのレコードを作成。
 */
const otpAuthData: OneTimePasswordAuth[] = [];
userData.forEach((value) => {
  otpAuthData.push({
    authUserId: value.id,
    isEnabled: false,
    qrcodeUrl: null,
    secret: null,
    createdAt: new Date(),
  });
});

/**
 * dummy001がcreatorとなって、dummy2, 3 とフレンドになる。
 * (オンラインステータス確認のため)
 */
const friendRequestData: FriendRequest[] = [];
const creatorId = idMap.get('dummy001');
for (let i = 2; i < 4; i++) {
  const receiverId = idMap.get('dummy' + num(i));
  if (creatorId !== undefined && receiverId !== undefined) {
    friendRequestData.push({
      creatorId,
      receiverId,
      status: 'ACCEPTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

/**
 * dummy001がcreatorとなって、requesting001~10に
 * friend requestを作成する。ステータスはPENDING
 */
for (let i = 1; i <= 10; i++) {
  const creatorId = idMap.get('dummy001');
  const receiverId = idMap.get('requesting' + num(i));
  if (creatorId !== undefined && receiverId !== undefined) {
    friendRequestData.push({
      creatorId,
      receiverId,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

/**
 * dummy001がcreatorとなって、friends001~5に
 * friend requestを作成する。ステータスはACCEPTED
 */
for (let i = 1; i <= 5; i++) {
  const creatorId = idMap.get('dummy001');
  const receiverId = idMap.get('friends' + num(i));
  if (creatorId !== undefined && receiverId !== undefined) {
    friendRequestData.push({
      creatorId,
      receiverId,
      status: 'ACCEPTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

/**
 * friends6~10がcreatorとなって、dummy001に
 * friend requestを作成する。ステータスはACCEPTED
 */
for (let i = 6; i <= 10; i++) {
  const creatorId = idMap.get('friends' + num(i));
  const receiverId = idMap.get('dummy001');
  if (creatorId !== undefined && receiverId !== undefined) {
    friendRequestData.push({
      creatorId,
      receiverId,
      status: 'ACCEPTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

/**
 * pending001~10がcreatorとなって、dummy001に
 * friend requestを作成する。ステータスはPENDING
 */
for (let i = 1; i <= 10; i++) {
  const creatorId = idMap.get('pending' + num(i));
  const receiverId = idMap.get('dummy001');
  if (creatorId !== undefined && receiverId !== undefined) {
    friendRequestData.push({
      creatorId,
      receiverId,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

/**
 * dummy001がblocked001~10をBlockする。
 */
const blockData: Block[] = [];
for (let i = 1; i < 10; i++) {
  const sourceId = idMap.get('dummy001');
  const targetId = idMap.get('blocked' + num(i));
  if (targetId !== undefined && sourceId !== undefined) {
    blockData.push({
      targetId,
      sourceId,
    });
  }
}

const GAMEWINSCORE = 5;
const getLoserScore = () => {
  return Math.floor(Math.random() * (GAMEWINSCORE - 1));
};

const matchScoreData: Array<[number, number]> = [];
for (let i = 0; i < userData.length; i++) {
  const matchScore: [number, number] =
    Math.random() > 0.5
      ? [GAMEWINSCORE, getLoserScore()]
      : [getLoserScore(), GAMEWINSCORE];
  matchScoreData.push(matchScore);
}

const matchResultData: MatchResult[] = [];

/**
 * dummy001が自分以外のユーザー全員と1回ずつ対戦する。
 */
for (let i = 0; i < userData.length; i++) {
  const playerOneId = idMap.get('dummy001');
  const playerTwoId = userData[i].id;
  if (
    playerOneId !== undefined &&
    playerTwoId !== undefined &&
    playerOneId !== playerTwoId
  ) {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setMinutes(date.getMinutes() + i);
    matchResultData.push({
      id: uuidv4(),
      playerOneId,
      playerTwoId,
      playerOneScore: matchScoreData[i][0],
      playerTwoScore: matchScoreData[i][1],
      finishedAt: date,
    });
  }
}

/**
 * ユーザー全員が2回ずつ対戦する。
 */
for (let i = 0; i < userData.length - 1; i++) {
  const playerOneId = userData[i].id;
  const playerTwoId = userData[i + 1].id;
  if (playerOneId !== undefined && playerTwoId !== undefined) {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setMinutes(date.getMinutes() + i);
    matchResultData.push({
      id: uuidv4(),
      playerOneId,
      playerTwoId,
      playerOneScore: matchScoreData[i][0],
      playerTwoScore: matchScoreData[i][1],
      finishedAt: date,
    });
  }
}

const main = async () => {
  console.log(`Start seeding ...`);

  const userCount = await prisma.user.count();
  if (userCount > 0) {
    console.log(`Data exists. Delete all data ...`);
    await prisma.oneTimePasswordAuth.deleteMany({});
    await prisma.friendRequest.deleteMany({});
    await prisma.block.deleteMany({});
    await prisma.matchResult.deleteMany({});
    await prisma.user.deleteMany({});
  }

  await prisma.user.createMany({
    data: userData,
  });
  await prisma.oneTimePasswordAuth.createMany({
    data: otpAuthData,
  });
  await prisma.friendRequest.createMany({
    data: friendRequestData,
  });
  await prisma.block.createMany({
    data: blockData,
  });
  await prisma.matchResult.createMany({
    data: matchResultData,
  });

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
