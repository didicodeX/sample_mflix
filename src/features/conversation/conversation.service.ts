import { conversationRepository } from './conversation.repository'

export const conversationService = {
  createConversation: (data: any) => {
    const isGroup = data.participants.length > 2 || !!data.name
    return conversationRepository.create({ ...data, isGroup })
  },
  getUserConversations: (userId: string) => {
    return conversationRepository.findAllByUserId(userId)
  },
}
