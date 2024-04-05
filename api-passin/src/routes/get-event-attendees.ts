import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../libs/prisma'

export const getEventAttendees = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Get event for atteendees',
        tags: ['Events'],
        params: z.object({
          eventId: z.string().cuid(),
        }),

        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.string().nullish().default('0').transform(Number),
        }),

        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.string().cuid(),
                name: z.string(),
                email: z.string().email(),
                createdAt: z.date(),
                checkInAt: z.date().nullable(),
                attendeeAmmount: z.number(),
              }),
            ),
          }),
        },
      },
    },

    async (request, reply) => {
      const { eventId } = request.params
      const { pageIndex, query } = request.query

      const attendees = await db.attendee.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          checkIn: {
            select: {
              createdAt: true,
            },
          },
        },
        where: query
          ? {
              eventId,
              name: {
                contains: query,
              },
            }
          : {
              id: eventId,
            },

        take: 10,
        skip: pageIndex * 10,
        orderBy: {
          createdAt: 'desc',
        },
      })

      const attendeeAmmount = attendees.length

      return reply.status(201).send({
        attendees: attendees.map((attendee) => {
          return {
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            createdAt: attendee.createdAt,
            checkInAt: attendee.checkIn?.createdAt ?? null,
            attendeeAmmount,
          }
        }),
      })
    },
  )
}
