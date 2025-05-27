export type Customer = {
  customerId: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  birthday: string;
  address: string;
  nationality: string;
  emailValidated: boolean;
  cccd: string;
  cccdPicture: string;
  profilePicture: string;
  createAt: string;
  updateAt: string;
};

export type Staff = {
  staffId: string;
  username: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  role: string;
  createAt: string;
  updateAt: string;
};

export type SeatColor = "green" | "red" | "blue" | "yellow";

export type SeatGrid = {
  seatId: string;
  class: string;
  priceBonusInterest: string;
  color: string;
  selected: boolean;
};

export type BookingType = {
  bookingId: string;
  paymentStatus: boolean;
  bookingStatus: string;
  passengerId: string;
  price: string;
  bookedAt: string;
  updateAt: string;
  seatId: string;
  flightId: string;
  class: string;
  brand: string;
};

export type TicketType = {
  ticketId: string;
  flightId: string;
  passengerId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  cccd: string;
  price: string;
  sellerId: string;
  status: string;
  sellAt: string;
  updateAt: string;
  seatFlight: SeatFlightType;
};

export type SeatFlightType = {
  seatId: string;
  flightId: string;
  ticketId: string;
  bookingId: string;
  class: string;
  isEmpty: boolean;
  ticketClass: TicketClassType;
};

export type TicketClassType = {
  className: string;
  priceBonusInterest: string;
  color: string;
  isDefaultClass: boolean;
  createdAt: string;
};

export type IntermediateAirport = {
  flightId: string;
  airportId: string;
  duration: string;
  notes: string;
  create_at?: string;
  update_at?: string;
};

export type AirplaneType = {
  airplaneModel: string;
  airlinePicture: string;
  airlines: string;
  description?: string;
  total_seat: string;
  total_business_seat: string;
  total_economy_seat: string;
  status: string;
};

export type AirportType = {
  airportId: string;
  airportCode?: string;
  airportName?: string;
  airportPicture?: string;
  city: string;
  country: string;
  description: string;
  status: string;
  create_at?: string;
  update_at?: string;
};

export type chart = {
  tittle: string;
  indicate?: string;
  unit: string;
  datas: number[];
  labels: string[];
};

export type AirlineType = {
  code: string;
  name: string;
  logo: string;
};

export type FlightType = {
  id: number;
  flightCode: string;
  departureDate: string;
  arrivalDate: string;
  totalDuration: number;
  stopCount: number;
  description: string;
  basePrice: number;
  airline: AirlineType;
  departureAirport: {
    id: number;
    code: string;
    airportName: string;
    countryName: string;
    countryCode: string;
    cityName: string;
    region: string;
    regionCode: string;
    image: string | null;
  };
  arrivalAirport: {
    id: number;
    code: string;
    airportName: string;
    countryName: string;
    countryCode: string;
    cityName: string;
    region: string;
    regionCode: string;
    image: string | null;
  };
  airplane: {
    id: number;
    name: string;
    totalColSeat: number;
    totalRowSeat: number;
    description: string;
    image: string;
  };
  createAt: string | null;
};

export type Rules = {
  airportRules: {
    minFlightDuration: GLfloat;
    maxIntermediateAirport: number;
    minIntermediateAirportStopDelay: number;
    maxIntermediateAirportStopDelay: number;
  };
  bookingRules: {
    minBookingTime: number;
    minCancelBookingTime: number;
  };
};

export type DataFetchType<T> = {
  data: T[];
  dataTotal: number;
  page: number;
  pageTotal: number;
  perPage: number;
};

export type OrderType = {
  orderId: string;
  flightBookings: {
    flightId: number;
    status: string;
    contactName: string;
    contactPhone: string;
    totalPrice: number;
    flightLuggageId: number | null;
    tickets: {
      passengerName: string;
      passengerBirthdate: string;
      passengerGender: "MALE" | "FEMALE";
      passengerIdCard: string;
      seatNumber: string;
      status: string;
      price: number;
    }[];
  }[];
};