import { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "./user.service";
import { UserInterface } from "./user.interface";

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  const userData = req.body as UserInterface;

  try {
    // 1. Création de l'utilisateur
    const user = await userService.create(userData);

    // 2. Réponse HTTP
    reply.code(201).send(user);
  } catch (error) {
    // Gérer les erreurs, par exemple si l'email est déjà pris
    reply.code(400).send({ error: error.message });
  }
}

export async function getAllUsers(req: FastifyRequest, reply: FastifyReply) {
  try {
    // 1. Récupération de tous les utilisateurs
    const users = await userService.findAll();

    // 2. Réponse HTTP
    reply.code(200).send(users);
  } catch (error) {
    // Gérer les erreurs
    reply.code(500).send({ error: error.message });
  }
}