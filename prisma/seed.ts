import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const keywords = [
  'radicalization', 'extremism', 'cyber-attack', 'recruitment', 'dark-web',
  'encrypted', 'anonymity', 'vulnerability', 'malware', 'botnet',
  'propaganda', 'encryption', 'proxy', 'leak', 'zero-day',
  'phishing', 'social-engineering', 'data-breach', 'exploit', 'payload'
];

const categories = ['Threat', 'Behavior', 'Technical', 'Social'];

async function main() {
  console.log('Cleaning up database...');
  await prisma.interaction.deleteMany();
  await prisma.networkMetric.deleteMany();
  await prisma.trendSnapshot.deleteMany();
  await prisma.message.deleteMany();
  await prisma.hashtag.deleteMany();
  await prisma.telegramUser.deleteMany();

  console.log('Seeding Telegram Users...');
  const users = [];
  for (let i = 1; i <= 30; i++) {
    const user = await prisma.telegramUser.create({
      data: {
        id: `user_${i}`,
        username: `analyst_${i}`,
        firstName: `First_${i}`,
        lastName: `Last_${i}`,
        phone: `+9050000000${i.toString().padStart(2, '0')}`,
      },
    });
    users.push(user);
  }

  console.log('Seeding Hashtags...');
  const hashtags = [];
  for (const tag of keywords) {
    const hashtag = await prisma.hashtag.create({
      data: {
        tag,
        count: Math.floor(Math.random() * 100),
        lastSeen: new Date(),
      },
    });
    hashtags.push(hashtag);
  }

  console.log('Seeding Messages...');
  const messages = [];
  const chats = ['chat_A', 'chat_B', 'chat_C', 'chat_D'];
  for (let i = 1; i <= 200; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const chat = chats[Math.floor(Math.random() * chats.length)];
    const text = `Analyzing ${keywords[Math.floor(Math.random() * keywords.length)]} trends in the network. Status: ${Math.random() > 0.5 ? 'Critical' : 'Stable'}.`;
    
    const message = await prisma.message.create({
      data: {
        telegramId: 1000 + i,
        chatId: chat,
        userId: user.id,
        text,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
        hashtags: {
          connect: [
            { tag: keywords[Math.floor(Math.random() * keywords.length)] },
            { tag: keywords[Math.floor(Math.random() * keywords.length)] },
          ].filter((v, i, a) => a.findIndex(t => t.tag === v.tag) === i), // Unique tags
        },
      },
    });
    messages.push(message);
  }

  console.log('Seeding Interactions...');
  for (let i = 1; i <= 100; i++) {
    const sourceUser = users[Math.floor(Math.random() * users.length)];
    let targetUser = users[Math.floor(Math.random() * users.length)];
    while (targetUser.id === sourceUser.id) {
      targetUser = users[Math.floor(Math.random() * users.length)];
    }

    await prisma.interaction.create({
      data: {
        sourceUserId: sourceUser.id,
        targetUserId: targetUser.id,
        type: Math.random() > 0.3 ? 'reply' : 'mention',
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  console.log('Seeding Trend Snapshots...');
  for (let d = 0; d < 7; d++) { // Last 7 days
    const date = new Date(Date.now() - d * 24 * 60 * 60 * 1000);
    for (const keyword of keywords.slice(0, 10)) {
      await prisma.trendSnapshot.create({
        data: {
          timestamp: date,
          keyword,
          frequency: Math.floor(Math.random() * 50) + 10,
          growthRate: (Math.random() * 2) - 0.5, // -0.5 to 1.5
          category: categories[Math.floor(Math.random() * categories.length)],
        },
      });
    }
  }

  console.log('Seeding Network Metrics...');
  for (const user of users) {
    await prisma.networkMetric.create({
      data: {
        userId: user.id,
        degreeCentrality: Math.random(),
        betweenness: Math.random() * 0.5,
        community: Math.floor(Math.random() * 5),
        timestamp: new Date(),
      },
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
