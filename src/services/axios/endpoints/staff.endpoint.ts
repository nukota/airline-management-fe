export const staffEndpoint = {
  "post-login": "/staff/login",
  "get-info-by-token": "/staff/me",
  "post-create-new": "/staff",
  "put-update-info": (id: string) => `/staff/${id}`,
  "del-delete-staff": (id: string) => `/staff/${id}`,
  "get-by-staff-by": (id: string) => `/staff/${id}`,
  "get-list-all-staff": "/staff",
};
