export const flightEndpoint = {
  "create-new-flight": "/flight",
  "get-all-flight-info": "/flight",
  "get-flight-info-by-id": (id: string) => `/flight/${id}`,
  "put-update-flight-info-by-id": (id: string) => `/flight/${id}`,
  "del-delete-flight": (id: string) => `/flight/${id}`,
  "get-search-for-flight": (departure: string, arrival: string, time: string) =>
    `/flight//find-available-flight?departure=${departure}&arrival=${arrival}&time=${time}`,
  "put-update-flight-finish": (id: string) => `/flight/set-finish/${id}`,
  "put-update-flight-in-progress": (id: string) =>
    `/flight/set-in-progress/${id}`,
  "put-update-flight-cancel": (id: string) => `/flight/set-cancel/${id}`,
  "put-update-flight-not-start": (id: string) =>
    `/flight/set-not-started/${id}`,
  "put-add-intermediate-airport": "/flight/add-intermediate-airport",
};
