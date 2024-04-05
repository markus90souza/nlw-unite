import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../libs/prisma'
import { BadRequest } from './_errors/bad-request'

export const getAttendeeBadge = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        summary: 'Create an event',
        tags: ['Attendees'],
        params: z.object({
          attendeeId: z.string().cuid(),
        }),

        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string(),
              eventTitle: z.string(),
              checkInUrl: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params

      const attendee = await db.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: true,
        },
        where: {
          id: attendeeId,
        },
      })

      if (attendee === null) {
        throw new BadRequest('Nenhum ingresso encontrado')
      }

      const baseUrl = `${request.protocol}://${request.hostname}`

      const checkInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseUrl)

      return reply.status(201).send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInUrl: checkInUrl.toString(),
        },
      })
    },
  )
}
