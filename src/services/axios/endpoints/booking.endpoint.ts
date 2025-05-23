export const bookingEndpoint = {
  "put-cancel-booking": (id: string) => `/booking/cancel-booking/${id}`,
  "get-my-booking-history": "/booking/me",
  "get-all-booking-list": "booking/list",
  "post-book-for-seat": "/booking/create",
  "get-booking-detail-by-id": (id: string) => `/booking/detail/${id}`,
  "get-check-booking-avaiable": (id: string) =>
    `/booking/check-booking?flightId=${id}`,
};
