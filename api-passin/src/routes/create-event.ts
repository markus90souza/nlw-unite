import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { generateSlug } from '../utils/generate-slug'
import { db } from '../libs/prisma'

export const createEvent = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),

        response: {
          201: z.object({
            eventId: z.string().cuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body
      const slug = generateSlug(title)

      const eventWithSameSlug = await db.event.findUnique({
        where: { slug },
      })

      if (eventWithSameSlug !== null) {
        throw new Error('Já existe um evento com esse titulo')
      }

      const event = await db.event.create({
        data: {
          title,
          slug,
          details,
          maximumAttendees,
        },
      })

      return reply.status(201).send({ eventId: event.id })
    },
  )
}
