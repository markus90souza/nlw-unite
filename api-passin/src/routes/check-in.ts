import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../libs/prisma'
import { BadRequest } from './_errors/bad-request'

export const CheckIn = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/check-in',
    {
      schema: {
        summary: 'Register check-in an event',
        tags: ['Check-in'],
        params: z.object({
          attendeeId: z.string().cuid(),
        }),

        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params

      const attendeeCheckIn = await db.checkIn.findUnique({
        where: {
          attendeeId,
        },
      })

      if (attendeeCheckIn !== null) {
        throw new BadRequest('Voce já fex check in neste evento')
      }

      await db.checkIn.create({
        data: {
          attendeeId,
        },
      })

      return reply.status(201).send()
    },
  )
}
