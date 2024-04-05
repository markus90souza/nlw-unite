import fastify from 'fastify'

import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import { createEvent } from './routes/create-event'
import { registerForEvent } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'
import { CheckIn } from './routes/check-in'
import { getEventAttendees } from './routes/get-event-attendees'
import { errorHandler } from './error-handler'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      version: '1.0.0',
      description: 'lorem',
    },
  },

  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(getEventAttendees)
app.register(CheckIn)

app.setErrorHandler(errorHandler)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('Servidor ON')
})
