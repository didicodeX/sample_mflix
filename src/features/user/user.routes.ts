import { FastifyInstance } from "fastify";
import { createUser, getAllUsers } from "./user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/", createUser);
  fastify.get("/", getAllUsers);

  // You can add more routes here, e.g., for updating or fetching users
  // fastify.put("/:id", updateUser);
  // fastify.get("/:id", getUserById);
  // fastify.delete("/:id", deleteUser);
  // Example: fastify.get("/email/:email", getUserByEmail);
  // fastify.get("/search", searchUsers);}
}
