export const ticketClassEndpoint = {
  "get-all-ticket-class": "/ticket-class/list",
  "post-create-new-ticket-class": "/ticket-class/create",
  "put-change-ticket-class-price-bonus": (name: string) =>
    `/ticket-class/update/${name}`,
  "del-delete-class-by-name": (name: string) => `/ticket-class/delete/${name}`,
};
