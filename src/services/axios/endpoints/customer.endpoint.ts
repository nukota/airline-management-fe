export const customerEndpoint = {
  "get-all": "/customer",
  "post-create": "/customer",
  "get-one": (id: string) => `/customer${id}`,
  "put-update": (id: string) => `/customer/${id}`,
  "delete-by-id": (id: string) => `/customer/${id}`,
  "post-login": "/customer/login",
  "get-me-by-token": "/customer/me",
  "post-send-verify-email": "/customer/send-verify-email",
  "get-login-with-google": "/customer/login-with-google",
  "post-upload-profile-picture": "/customer/upload-profile-picture",
};
