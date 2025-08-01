import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      password: "hashedpassword123", // In real app, this should be properly hashed
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      password: "hashedpassword456", // In real app, this should be properly hashed
    },
  });

  // Create members for the users
  const member1 = await prisma.member.create({
    data: {
      userId: user1.id,
    },
  });

  const member2 = await prisma.member.create({
    data: {
      userId: user2.id,
    },
  });

  // Create sample posts
  const post1 = await prisma.post.create({
    data: {
      memberId: member1.id,
      postType: "Text",
      title: "Welcome to DDD Forum!",
      content:
        "This is a sample text post to get started with our DDD Forum application.",
    },
  });

  const post2 = await prisma.post.create({
    data: {
      memberId: member2.id,
      postType: "Link",
      title: "Great Resource on Domain Driven Design",
      content: "https://martinfowler.com/bliki/DomainDrivenDesign.html",
    },
  });

  // Create sample comments
  const comment1 = await prisma.comment.create({
    data: {
      postId: post1.id,
      memberId: member2.id,
      text: "Great introduction post! Looking forward to more content.",
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      postId: post2.id,
      memberId: member1.id,
      text: "Thanks for sharing this excellent resource!",
    },
  });

  // Create sample votes
  await prisma.vote.create({
    data: {
      postId: post1.id,
      memberId: member2.id,
      voteType: "Upvote",
    },
  });

  await prisma.vote.create({
    data: {
      postId: post2.id,
      memberId: member1.id,
      voteType: "Upvote",
    },
  });

  console.log("Seed completed successfully!");
  console.log(`Created ${await prisma.user.count()} users`);
  console.log(`Created ${await prisma.member.count()} members`);
  console.log(`Created ${await prisma.post.count()} posts`);
  console.log(`Created ${await prisma.comment.count()} comments`);
  console.log(`Created ${await prisma.vote.count()} votes`);
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
