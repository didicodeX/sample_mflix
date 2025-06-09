import { messageRepository } from './message.repository'

export const messageService = {
  sendMessage: (data: any) => {
    return messageRepository.create(data)
  },

  getMessagesByRoom: (roomId: string, limit = 50) => {
    return messageRepository.findByConversationId(roomId, limit)
  }
}
