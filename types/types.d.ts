interface ReservationFormData {
  firstName: string;
  secondName: string;
  email: string;
  paymentMethod: string;
  discountCode: string;
  additionalInformation: string;
}

enum PaymentMethod {
  'card',
  'cash',
}

type ReservationDate = {
  hour: string;
  day: number;
  month: number;
  year: number;
};

interface Reservation {
  id: number;
  userId: number;
  firstName: string;
  secondName: string;
  email: string;
  paymentMethod: PaymentMethod;
  discountCode: string | null;
  additionalInformation: string;
  date: ReservationDate;
}

interface ReservationData {
  firstName: string;
  secondName: string;
  email: string;
  paymentMethod: string;
  discountCode: string;
  additionalInformation: string;
  date: ReservationDate;
}

type ReqOptions = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
};

type ReservationStatus<T> = {
  element: T;
  status: boolean;
};
