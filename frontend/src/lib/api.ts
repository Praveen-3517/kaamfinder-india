import axios, { AxiosInstance, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
  googleAuth: (token: string) => api.post('/auth/google', { token }),
  verifyOTP: (phone: string, otp: string) =>
    api.post('/auth/verify-otp', { phone, otp }),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

// Jobs APIs
export const jobsAPI = {
  getAll: (params?: any) => api.get('/jobs', { params }),
  getById: (id: string) => api.get(`/jobs/${id}`),
  create: (data: any) => api.post('/jobs', data),
  update: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
  search: (params: any) => api.get('/jobs/search', { params }),
  getNearby: (lat: number, lng: number, distance: number) =>
    api.get('/jobs/nearby', { params: { lat, lng, distance } }),
};

// Applications APIs
export const applicationsAPI = {
  create: (jobId: string, data?: any) =>
    api.post(`/applications`, { jobId, ...data }),
  getMyApplications: () => api.get('/applications/my'),
  getJobApplications: (jobId: string) => api.get(`/applications/job/${jobId}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/applications/${id}`, { status }),
  getStats: () => api.get('/applications/stats'),
};

// Companies APIs
export const companiesAPI = {
  create: (data: any) => api.post('/companies', data),
  getById: (id: string) => api.get(`/companies/${id}`),
  update: (id: string, data: any) => api.put(`/companies/${id}`, data),
  getMyCompany: () => api.get('/companies/my'),
};

// Chat APIs
export const chatAPI = {
  sendMessage: (recipientId: string, message: string) =>
    api.post('/chat', { recipientId, message }),
  getConversation: (userId: string) => api.get(`/chat/${userId}`),
  getConversations: () => api.get('/chat/conversations'),
};

// Notifications APIs
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id: string) => api.patch(`/notifications/${id}`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};

// Reviews APIs
export const reviewsAPI = {
  create: (targetId: string, data: any) =>
    api.post('/reviews', { targetId, ...data }),
  getByUser: (userId: string) => api.get(`/reviews/user/${userId}`),
};
