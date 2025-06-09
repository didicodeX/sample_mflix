import * as bcrypt from "bcrypt";
import { userRepository } from "features/user/user.repository";
import * as jwt from "jsonwebtoken";
import { LoginInput, RegisterInput } from "./auth.interface";

export const authService = {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw new Error("Email déjà utilisé");

    const hashed = await bcrypt.hash(input.password, 10);
    const newUser = await userRepository.create({ ...input, password: hashed });
    return newUser;
  },

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) throw new Error("Utilisateur introuvable");

    if (!user) throw new Error("Utilisateur introuvable");
    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) throw new Error("Mot de passe incorrect");

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return { user, accessToken };
  },
};
