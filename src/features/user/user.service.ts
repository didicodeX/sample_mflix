import { userRepository } from "./user.repository";
import { UserInterface } from "./user.interface";

export const userService = {
  create: async (userData: UserInterface) => {
    return userRepository.create(userData);
  },

  update: async (id: string, userData:  Partial<UserInterface>) => {
    return userRepository.update(id, userData);
  },

  findAll: async () => {
    return userRepository.findAll();
  },  

  findById: async (id: string) => {
    return userRepository.findById(id);
  },

  findByEmail: async (email: string) => {
    return userRepository.findByEmail(email);
  },
};
