import { FastifyInstance } from 'fastify'
import { sendMessage, getMessages } from './message.controller'

export default async function messageRoutes(fastify: FastifyInstance) {
  fastify.post('/', sendMessage)
  fastify.get('/:roomId', getMessages)
}
