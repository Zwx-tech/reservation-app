interface User {
  id: number;
  email: string;
  password: string;
}

interface SafeUser {
  id: number;
  email: string;
}
interface ReservationModel {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  paymentMethod: string;
  discountCode: string | null;
  additionalInformation: string | null;
  reservationDate: Date;
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
