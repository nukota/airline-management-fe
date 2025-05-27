export const bookingEndpoint = {
  "put-cancel-booking": (id: string) => `/booking/cancel-booking/${id}`,
  "get-my-orders": "/order-service/order/me",
  "get-all-booking-list": "booking/list",
  "post-book-for-seat": "/flight-service/booking/book-seats",
  "get-booking-detail-by-id": (id: string) => `/booking/detail/${id}`,
  "get-check-booking-avaiable": (id: string) =>
    `/booking/check-booking?flightId=${id}`,
};
