import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseURL = process.env.API_BASE_URL;
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

api.interceptors.request.use(async (config: any) => {
  if (typeof window !== 'undefined') {
    const session = await getSession();
    if ((session as any)?.user?.token)
      config.headers.Authorization = `Bearer ${(session as any)?.user?.token}`;
    return config;
  }
});

// api.interceptors.request.use(
//     async (config) => {
//         const session = await getServerSession(options);
//         //@ts-expect-error token does not exist on user.
//         const token = session?.user.token;
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
export default api;
