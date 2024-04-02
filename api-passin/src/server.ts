import fastify, { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
const app = fastify()

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query']
})

app.post('/events', async (request: FastifyRequest, reply: FastifyReply) => {
  
  const eventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable()
  })

  const data = eventSchema.parse(request.body)

  const event = await prisma.event.create({ data: {
    title: data.title,
    slug: new Date().toISOString(),
    details: data.details,
    maximumAttendees: data.maximumAttendees
  }})

  return reply.status(201).send({ eventId: event.id })

})

app.listen({ port: 3333}).then(() => {
  console.log('Servidor ON')
})