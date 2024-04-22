interface SafeUser {
  id: number;
  email: string;
  isAdmin: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: SafeUser;
  token: string;
}

interface JWTPayload {
  userId: string;
}
