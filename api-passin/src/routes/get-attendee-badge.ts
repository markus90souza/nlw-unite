import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../libs/prisma'

export const getAttendeeBadge = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        params: z.object({
          attendeeId: z.string().cuid(),
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
      const { attendeeId } = request.params

      const attendee = await db.attendee.findUnique({
        select: {
          name: true,
          email: true,
          eventId: true,
          event: {
            select: {
              title: true,
              id: true,
            },
          },
        },
        where: {
          id: attendeeId,
        },
      })

      if (attendee === null) {
        throw new Error('Nenhum ingresso encontrado')
      }

      return reply.status(201).send({
        attendee,
        // : {
        //   id: event.id,
        //   title: event.title,
        //   slug: event.slug,
        //   details: event.details,
        //   attendeesAmmount: event._count.attendees,
        //   attendees: event.attendees,
        // },
      })
    },
  )
}
