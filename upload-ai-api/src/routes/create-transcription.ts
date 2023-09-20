import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";

import { createReadStream } from "node:fs";
import { openai } from "../lib/openai";

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post(
    "/videos/:videoId/transcription",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const ParamsSchema = z.object({
        videoId: z.string().uuid(),
      });

      const { videoId } = ParamsSchema.parse(request.params);

      const BodySchema = z.object({
        prompt: z.string(),
      });

      const { prompt } = BodySchema.parse(request.body);

      const video = await prisma.video.findUniqueOrThrow({
        where: {
          id: videoId,
        },
      });

      const videoPath = video.path;

      const audioReadStream = createReadStream(videoPath);

      const response = await openai.audio.transcriptions.create({
        file: audioReadStream,
        model: "whisper-1",
        language: "pt",
        response_format: "json",
        temperature: 0,
        prompt,
      });

      const transcription = response.text;

      await prisma.video.update({
        where: {
          id: videoId,
        },
        data: { transcription },
      });

      return reply.status(201).send({ transcription });
    }
  );
}
