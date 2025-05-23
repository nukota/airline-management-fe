export const seatsEndpoint = {
  "get-all-seats-of-flight": (flightId: string) =>
    `/seat-flight/seat-list?flightId=${flightId}`,
  "put-change-seats-class": "seat-flight/change-class",
  "get-sumarize-seats-amout": (flightId: string) =>
    `/seat-flight/seat-amount?flightId=${flightId}`,
  "get-seat-detail": (flightId: string, seatId: string) =>
    `/seat-flight/detail?flightId=${flightId}&seatId=${seatId}`,
  "post-generate-seats-for-flight": "/seat-flight/generate-seat",
};
