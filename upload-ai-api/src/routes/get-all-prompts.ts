import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export async function getAllPromptsRoute(app: FastifyInstance) {
  app.get("/prompts", async (request: FastifyRequest, reply: FastifyReply) => {
    const prompts = await prisma.prompt.findMany();

    return reply.status(201).send(prompts);
  });
}
