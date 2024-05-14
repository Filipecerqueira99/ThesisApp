import axios from 'axios';
const { VUE_APP_API_URL = "vue_app_api_url" } = process.env;
import authHeaderRefresh from "@/helpers/authRefresh";


const api = axios.create({
  baseURL: VUE_APP_API_URL
});

// Function to refresh the access token
const refreshAccessToken = (originalRequest) => {
  const authHeader = authHeaderRefresh(); // Move this line here

  return api({
    method: "post",
    url: `/users/refresh-token`,
    headers: authHeader
  }).then(response => {
    const newAccessToken = response.data.accessToken;

    // Update the access token in localStorage
    localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

    return api(originalRequest);
  })
};

// Interceptor to handle token expiration
api.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    console.log(error)
    // Check if the error response status is 401 and the original request had an access token
    if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the original request as retried

      // Refresh the access token and retry the original request
      return refreshAccessToken(originalRequest).then(res => {
        return res;
      }).catch(err => {
        // Handle refresh token failure or other errors
        throw err;
      });
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default api;