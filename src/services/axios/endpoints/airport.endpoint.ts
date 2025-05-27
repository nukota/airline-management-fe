export const airportEndpoint = {
  "get-all-country": "/airport/country",
  // "get-all-city-by-country-code": (code: string) =>
  //   `/airport/city?country=${code}`,
  "post-search-airport": "/flight-service/airport/search",
  "post-create-airport": "/airport",
  "put-update-airport-info": (id: string) => `/airport/${id}`,
  "del-delete-airport": (id: string) => `/airport/${id}`,
  "get-all-airport": "/airport",
  "get-find-airport-by-id": (id: string) => `/flight-service/flight/${id}`,
  "post-upload-picture": "/airport/upload-picture",
};
