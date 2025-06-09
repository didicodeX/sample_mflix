export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  password: string; // En pratique, tu stockes un hash, pas le mot de passe en clair
  createdAt?: Date;
  updatedAt?: Date;
}
