interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface Place {
  id: number;
  name: string;
  description: string;
  img_url: string;
  //* Tags are separated by a semicolon
  tags: string;
  location: string;
  rating: number;
  price: number;
}

interface ReservationModel {
  id: number;
  placeId: number;
  firstName: string;
  secondName: string;
  email: string;
  paymentMethod: string;
  discountCode: string | null;
  additionalInformation: string | null;
  reservationDate: Date;
  userId: number;
}
