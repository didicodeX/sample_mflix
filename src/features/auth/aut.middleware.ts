import { FastifyReply, FastifyRequest } from "fastify";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "./auth.interface";

export async function verifyToken(req: FastifyRequest, reply: FastifyReply) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) throw new Error("accessToken manquant");

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    req.user = decoded;
  } catch (err) {
    reply.code(401).send({ error: "Non autorisé" });
  }
}
