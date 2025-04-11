import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true, //  needed to send cookies!
});

// Response Interceptor for auto-refresh
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = await axios.post('/api/c/auth/refresh', {}, { withCredentials: true });
        if (refresh) {
          return axiosInstance(originalRequest.url);
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        // Optionally clear store or redirect
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    } else {
      return { error: 'Both The token not found', status: 400 };
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
