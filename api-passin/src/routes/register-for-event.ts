import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../libs/prisma'

export const registerForEvent = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events/:eventId/attendees',
    {
      schema: {
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),

        params: z.object({
          eventId: z.string().cuid(),
        }),

        response: {
          201: z.object({
            attendeeId: z.string().cuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body
      const { eventId } = request.params

      const emailExistsInSameEvent = await db.attendee.findUnique({
        where: {
          eventId_email: {
            eventId,
            email,
          },
        },
      })

      if (emailExistsInSameEvent !== null) {
        throw new Error('Este email já esta cadastrado neste evento')
      }

      const [event, maxAttendeeForEvent] = await Promise.all([
        db.event.findUnique({
          where: { id: eventId },
        }),

        db.attendee.count({
          where: {
            eventId,
          },
        }),
      ])

      if (event?.maximumAttendees) {
        if (maxAttendeeForEvent >= event.maximumAttendees) {
          throw new Error('Este evento já atingiu o maximo de participantes')
        }
      }

      const attendee = await db.attendee.create({
        data: {
          name,
          email,
          eventId,
        },
      })

      return reply.status(201).send({ attendeeId: attendee.id })
    },
  )
}
