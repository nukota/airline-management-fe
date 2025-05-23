export const ticketEndpoint = {
  "post-create-new-ticket": "/ticket",
  "get-print-ticket": (ticketId: string) =>
    `/ticket/print?ticketId=${ticketId}`,
  "get-create-and-print-ticket-by-id": (bookingId: string, staffId: string) =>
    `/ticket/create-and-print/by-booking-id?bookingId=${bookingId}&staffId=${staffId}`,
  "get-ticket-list": "/ticket/list",
  "get-ticket-detail-by-id": (ticketId: string) => `/ticket/detail/${ticketId}`,
};
