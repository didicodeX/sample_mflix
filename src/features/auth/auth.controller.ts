import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "./auth.service";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await authService.register(req.body as any);
    reply.code(201).send({ user });
  } catch (error) {
    reply.code(400).send({ error: (error as Error).message });
  }
}

export async function login(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { user, accessToken } = await authService.login(req.body as any);
    reply.setCookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    reply.send({ user });
  } catch (error) {
    reply.code(401).send({ error: (error as Error).message });
  }
}

export async function getMe(req: FastifyRequest, reply: FastifyReply) {
  const user = (req as any).user;
  reply.send(user);
}
