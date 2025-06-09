export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface JwtPayload {
  _id: string;
  email: string;
  name: string;
}

export interface AuthenticatedRequest {
  cookies: { accessToken?: string };
  user: JwtPayload;
}

export interface AuthResponse {
  user: {
    _id: string;
    email: string;
    name: string;
  };
  accessToken: string;
}
