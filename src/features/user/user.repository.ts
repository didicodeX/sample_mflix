import { UserInterface } from "./user.interface";
import { User } from "./user.model";

export const userRepository = {
  create: async (userData: UserInterface) => {
    const user = new User(userData);
    return user.save();
  },

  update: async (id: string, userData: Partial<UserInterface>) => {
    return User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
  },

  findById: async (id: string) => {
    return User.findById(id).exec();
  },

  findAll: async () => {
    return User.find().exec();
  },

  delete: async (id: string) => {
    return User.findByIdAndDelete(id).exec();
  },

  findByEmail: async (email: string) => {
    return await User.findOne({ email }).exec();
  },
};
