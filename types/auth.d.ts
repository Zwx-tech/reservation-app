interface User {
  id: number;
  email: string;
  password: string;
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
  userId: number;
}
