import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../libs/prisma'

export const getEvent = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId',
    {
      schema: {
        params: z.object({
          eventId: z.string().cuid(),
        }),

        response: {
          200: {
            event: z.object({
              id: z.string().cuid(),
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().positive().nullable(),
              attendeesAmmount: z.number(),
              attendees: z.array(
                z.object({
                  name: z.string(),
                  email: z.string().email(),
                }),
              ),
            }),
          },
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params

      const event = await db.event.findUnique({
        select: {
          id: true,
          title: true,
          slug: true,
          details: true,
          attendees: {
            select: {
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              attendees: true,
            },
          },
        },
        where: {
          id: eventId,
        },
      })

      if (event === null) {
        throw new Error('Nenhum evento encontrado com este codigo')
      }

      return reply.status(201).send({
        event: {
          id: event.id,
          title: event.title,
          slug: event.slug,
          details: event.details,
          attendeesAmmount: event._count.attendees,
          attendees: event.attendees,
        },
      })
    },
  )
}
