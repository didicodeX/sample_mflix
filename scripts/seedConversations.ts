import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Conversation } from "../src/features/conversation/conversation.model";
import { Message } from "../src/features/message/message.model";
import { User } from "../src/features/user/user.model";
dotenv.config(); // Charger les variables d'environnement

const MONGO_URI = process.env.MONGO_URI!;

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  // Optionnel : vider les collections existantes
  await Promise.all([
    User.deleteMany({}),
    Conversation.deleteMany({}),
    Message.deleteMany({}),
  ]);

  // Étape 1 — Créer 5 users
  const users = await User.insertMany(
    Array.from({ length: 5 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "hashedpassword", // à adapter si tu utilises bcrypt
    }))
  );

  console.log("✅ Users créés");

  // Étape 2 — Créer 3 conversations (rooms)
  const conversations = await Promise.all(
    Array.from({ length: 3 }).map(() => {
      // Prendre 2 à 4 participants au hasard
      const shuffled = faker.helpers.shuffle(users);
      const participants = shuffled.slice(
        0,
        faker.number.int({ min: 2, max: 4 })
      );

      return Conversation.create({
        participants: participants.map((u) => u._id),
        name: faker.word.words({ count: { min: 1, max: 3 } }),
        isGroup: participants.length > 2, // Si plus de 2 participants, c'est un groupe
        createdBy: participants[0]._id, // Un des participants est le créateur
      });
    })
  );

  console.log("✅ Conversations créées");

  // Étape 3 — Créer 10 messages par conversation
  for (const convo of conversations) {
    const messages = Array.from({ length: 10 }).map(() => {
      const sender = faker.helpers.arrayElement(convo.participants);
      console.log(convo.participants.length, sender);
      return {
        text: faker.lorem.sentence(),
        senderId: sender,
        conversationId: convo._id,
        createdAt: faker.date.recent(),
      };
    });

    await Message.insertMany(messages);
  }

  console.log("✅ Messages créés");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
