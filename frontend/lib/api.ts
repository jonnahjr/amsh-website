import axios from 'axios';

// 1. Determine Base URL with Fallbacks
const API_URL = 
    process.env.NEXT_PUBLIC_API_URL || 
    (process.env as any).REACT_APP_API_URL || 
    '/api';

// 2. Debug Logging (Only in Development)
if (process.env.NODE_ENV === 'development') {
    console.log('🌐 [AMSH API] Base URL:', API_URL);
}

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: 30000, // 30 second timeout
});

// Request interceptor - add auth token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('emsh_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Response interceptor - handle auth errors & network failures
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 3. Handle Network Errors (ERR_CONNECTION_REFUSED, etc.)
        if (!error.response) {
            console.error('❌ [AMSH API] Network Error - Is the backend running?', error.message);
            // You could trigger a global notification here
            return Promise.reject({
                ...error,
                message: 'Could not connect to the server. Please check your internet connection or try again later.'
            });
        }

        // 4. Handle Auth Errors (401)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('emsh_refresh_token');
                if (refreshToken) {
                    // Use standard axios for refresh to avoid interceptor loop
                    const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
                    const { token } = res.data;
                    localStorage.setItem('emsh_token', token);
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }
            } catch (_) {
                localStorage.removeItem('emsh_token');
                localStorage.removeItem('emsh_refresh_token');
                if (typeof window !== 'undefined') {
                    window.location.href = '/admin/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;

// API service functions
export const authAPI = {
    login: (email: string, password: string) => api.post('/auth/login', { email, password }),
    logout: () => api.post('/auth/logout'),
    me: () => api.get('/auth/me'),
    changePassword: (data: any) => api.post('/auth/change-password', data),
};

export const postsAPI = {
    getAll: (params?: any) => api.get('/posts', { params }),
    getBySlug: (slug: string) => api.get(`/posts/${slug}`),
    getById: (id: string) => api.get(`/posts/id/${id}`),
    create: (data: any) => api.post('/posts', data),
    update: (id: string, data: any) => api.put(`/posts/${id}`, data),
    delete: (id: string) => api.delete(`/posts/${id}`),
};

export const settingsAPI = {
    getAll: () => api.get('/settings'),
    getGroup: (group: string) => api.get(`/settings/group/${group}`),
    update: (settings: Record<string, string>) => api.put('/settings', { settings }),
    updateKey: (key: string, data: any) => api.put(`/settings/${key}`, data),
};

export const doctorsAPI = {
    getAll: (params?: any) => api.get('/doctors', { params }),
    getById: (id: string) => api.get(`/doctors/${id}`),
    create: (data: any) => api.post('/doctors', data),
    update: (id: string, data: any) => api.put(`/doctors/${id}`, data),
    delete: (id: string) => api.delete(`/doctors/${id}`),
};

export const departmentsAPI = {
    getAll: () => api.get('/departments'),
    getBySlug: (slug: string) => api.get(`/departments/${slug}`),
    create: (data: any) => api.post('/departments', data),
    update: (id: string, data: any) => api.put(`/departments/${id}`, data),
    delete: (id: string) => api.delete(`/departments/${id}`),
};

export const servicesAPI = {
    getAll: () => api.get('/services'),
    getBySlug: (slug: string) => api.get(`/services/${slug}`),
    create: (data: any) => api.post('/services', data),
    update: (id: string, data: any) => api.put(`/services/${id}`, data),
    delete: (id: string) => api.delete(`/services/${id}`),
};

export const researchAPI = {
    getAll: (params?: any) => api.get('/research', { params }),
    getPublished: () => api.get('/research', { params: { status: 'PUBLISHED' } }),
    getById: (id: string) => api.get(`/research/${id}`),
    submit: (data: any) => {
        const config: any = {};
        if (data instanceof FormData) config.headers = { 'Content-Type': undefined };
        return api.post('/research', data, config);
    },
    getAdminAll: () => api.get('/research/admin/all'),
    update: (id: string, data: any) => {
        const config: any = {};
        if (data instanceof FormData) config.headers = { 'Content-Type': undefined };
        return api.put(`/research/${id}`, data, config);
    },
    delete: (id: string) => api.delete(`/research/${id}`),
    updateStatus: (id: string, status: string) => api.patch(`/research/${id}/status`, { status }),
    track: (submissionId: string) => api.get(`/research/track/${submissionId}`),
};

export const cpdAPI = {
    getAll: (params?: any) => api.get('/cpd', { params }),
    getById: (id: string) => api.get(`/cpd/${id}`),
    create: (data: any) => api.post('/cpd', data),
    update: (id: string, data: any) => api.put(`/cpd/${id}`, data),
    delete: (id: string) => api.delete(`/cpd/${id}`),
    register: (id: string, data: any) => {
        const config: any = {};
        if (data instanceof FormData) {
            config.headers = { 'Content-Type': 'multipart/form-data' };
        }
        return api.post(`/cpd/${id}/register`, data, config);
    },
    getRegistrations: (id: string) => api.get(`/cpd/${id}/registrations`),
    getAllRegistrations: () => api.get('/cpd/registrations/all'),
    updateRegistrationStatus: (id: string, status: string) => api.patch(`/cpd/registrations/${id}/status`, { status }),
};

export const formsAPI = {
    getAll: () => api.get('/forms'),
    getById: (id: string) => api.get(`/forms/${id}`),
    submit: (id: string, data: any) => api.post(`/forms/${id}/submit`, data),
    getAllSubmissions: () => api.get('/forms/all/submissions'),
    getSubmissions: (id: string) => api.get(`/forms/${id}/submissions`),
    updateSubmissionStatus: (id: string, status: string) => api.patch(`/forms/submissions/${id}/status`, { status }),
};

export const appointmentsAPI = {
    getAll: (params?: any) => api.get('/appointments', { params }),
    book: (data: any) => api.post('/appointments', data),
    updateStatus: (id: string, status: string, notes?: string) => api.patch(`/appointments/${id}/status`, { status, notes }),
    delete: (id: string) => api.delete(`/appointments/${id}`),
};

export const contactAPI = {
    send: (data: any) => api.post('/contact', data),
    getAll: (params?: any) => api.get('/contact', { params }),
    markRead: (id: string) => api.patch(`/contact/${id}/read`),
    delete: (id: string) => api.delete(`/contact/${id}`),
};

export const newsletterAPI = {
    subscribe: (email: string, name?: string) => api.post('/newsletter/subscribe', { email, name }),
    getSubscribers: () => api.get('/newsletter/subscribers'),
    broadcast: (data: { subject: string; content: string }) => api.post('/newsletter/broadcast', data),
};

export const analyticsAPI = {
    getOverview: () => api.get('/analytics/overview'),
    track: (path: string) => api.post('/analytics/track', { path }).catch(() => { }),
};

export const chatbotAPI = {
    sendMessage: (message: string, conversationHistory?: any[]) =>
        api.post('/chatbot/message', { message, conversationHistory }),
};

export const mediaAPI = {
    getAll: (params?: any) => api.get('/media', { params }),
    upload: (file: File, folder?: string) => {
        const formData = new FormData();
        formData.append('file', file);
        if (folder) formData.append('folder', folder);
        // CRITICAL: Do NOT set Content-Type manually — axios must auto-set it
        // with the multipart boundary. Without the boundary, Multer cannot parse
        // the request body and uploads fail silently on cross-device requests.
        return api.post('/media/upload', formData, {
            headers: { 'Content-Type': undefined },
            timeout: 120000, // 2 min timeout for large files
        });
    },
    delete: (id: string) => api.delete(`/media/${id}`),
};

export const faqAPI = {
    getAll: () => api.get('/faq'),
    create: (data: any) => api.post('/faq', data),
    update: (id: string, data: any) => api.put(`/faq/${id}`, data),
    delete: (id: string) => api.delete(`/faq/${id}`),
};

export const testimonialsAPI = {
    getAll: (params?: any) => api.get('/testimonials', { params }),
    create: (data: any) => api.post('/testimonials', data),
    submit: (data: any) => api.post('/testimonials/submit', data),
    update: (id: string, data: any) => api.put(`/testimonials/${id}`, data),
    delete: (id: string) => api.delete(`/testimonials/${id}`),
};

export const usersAPI = {
    getAll: () => api.get('/users'),
    create: (data: any) => api.post('/users', data),
    update: (id: string, data: any) => api.put(`/users/${id}`, data),
    delete: (id: string) => api.delete(`/users/${id}`),
};

export const pagesAPI = {
    getAll: (params?: any) => api.get('/pages', { params }),
    getBySlug: (slug: string) => api.get(`/pages/${slug}`),
    create: (data: any) => api.post('/pages', data),
    update: (id: string, data: any) => api.put(`/pages/${id}`, data),
    delete: (id: string) => api.delete(`/pages/${id}`),
};

export const navigationAPI = {
    getAll: () => api.get('/navigation'),
    update: (items: any[]) => api.put('/navigation', { items }),
};

export const categoriesAPI = {
    getAll: () => api.get('/categories'),
};

export const serviceCategoriesAPI = {
    getAll: () => api.get('/service-categories'),
    getById: (id: string) => api.get(`/service-categories/${id}`),
    getBySlug: (slug: string) => api.get(`/service-categories/slug/${slug}`),
    create: (data: any) => api.post('/service-categories', data),
    update: (id: string, data: any) => api.put(`/service-categories/${id}`, data),
    delete: (id: string) => api.delete(`/service-categories/${id}`),
};
export const departmentCategoriesAPI = {
    getAll: () => api.get('/department-categories'),
    getById: (id: string) => api.get(`/department-categories/${id}`),
    create: (data: any) => api.post('/department-categories', data),
    update: (id: string, data: any) => api.put(`/department-categories/${id}`, data),
    delete: (id: string) => api.delete(`/department-categories/${id}`),
};

export const facebookAPI = {
    getPosts: (params?: any) => api.get('/facebook/posts', { params }),
    sync: () => api.post('/facebook/sync'),
};

/**
 * Resolves a backend image path/URL to a valid frontend-accessible URL for Next.js proxying.
 * It handles absolute URLs, stale localhost URLs from local uploads, and relative filenames.
 */
/**
 * Cleans corrupted emoji/icon strings that often occur due to database encoding mismatches.
 */
export const sanitizeIcon = (icon?: string | null): string => {
    if (!icon) return '🏥';
    
    // Direct mappings for corrupted strings (Greek/UTF-8 and encoding mismatches)
    const corruptedMappings: Record<string, string> = {
        // Clinical / Medical
        '≡ƒ¬¦': '🩺', '=ƒ¬¦': '🩺', '≡ƒ⌐╗': '🩺', '=ƒæ¦': '🩺', '≡ƒæ¦': '🩺',
        '≡ƒö¼': '🧠', '=ƒö¼': '🧠', '≡ƒºá': '🧠', '=ƒºá': '🧠',
        '≡ƒ¬+': '☢️', '=ƒ¬+': '☢️',
        '≡ƒº¬': '🔬', '=ƒº¬': '🔬',
        '≡ƒÆè': '💊', '=ƒÆè': '💊',
        '≡ƒÅÑ': '🛌', '=ƒÅÑ': '🛌',
        '≡ƒ⌐║': '🏥', '=ƒ⌐║': '🏥', '≡ƒ⌐¦': '🏥', '≡ƒôô': '🏥',
        '≡ƒÜ¿': '🚑', '=ƒÜ¿': '🚑',
        '≡ƒö╡': '🆘',
        
        // Symbols / Action
        '≡ƒÜæ': '🚨', '=ƒÜæ': '🚨',
        'GÜÖn+Å': '⚙️',
        'Γ¡É': '✨', 'G¡É': '✨',
        '≡ƒôè': '📝', '=ƒôè': '📝',
        '≡ƒôü': '📋', '=ƒôü': '📋',
        '≡ƒôé': '📂', '=ƒôé': '📂',
        '≡ƒöù': '🔗', '=ƒöù': '🔗',
        '≡ƒö¥': '🔝',

        // People / Team
        '≡ƒæ⌐ΓÇìΓÜò∩╕Å': '👩‍⚕️', '≡ƒæ¬GÇìGÜòn+Å': '👩‍⚕️', '=ƒæ¬GÇìGÜòn+Å': '👩‍⚕️',
        'Γ¥ñ∩╕ÅΓÇì≡ƒöÑ': '❤️‍🔥', 'G¥ñn+ÅGÇì≡ƒöÑ': '🏥',
        '≡ƒñ¥': '🤝', '=ƒñ¥': '🤝',
        '≡ƒÆ¬': '💪',
        '≡ƒææ': '👁️', '=ƒææ': '👁️',

        // Infrastructure / Tech
        '≡ƒîì': '🌍',
        '≡ƒÅù∩╕Å': '🏢',
        '≡ƒôí': '📱', '=ƒôí': '📱',
        '≡ƒÆ+': '💻', '=ƒÆ+': '💻',
        '≡ƒôù': '📡',
        '≡ƒôï': '🛡️', '=ƒôï': '🛡️',
        '≡ƒôP': '📞', '=ƒôP': '📞',
        
        // Education / Other
        '≡ƒÄô': '🎓', '=ƒÄô': '🎓',
        '≡ƒÄùn+Å': '🎗️', '=ƒÄùn+Å': '🎗️',
        '≡ƒôÜ': '📚', '=ƒôÜ': '📚',
        '≡ƒÿì': '😍', '≡ƒÿè': '😊',
        'ΓÜÖ∩╕Å': '⚙️', 
        '≡ƒöä': '🩺', 
        '≡ƒô₧': '📞', 
        '≡ƒÆ╗': '💻',
    };

    // If the icon is exactly one of the corrupted strings
    if (corruptedMappings[icon]) return corruptedMappings[icon];

    // If the icon contains corrupted bits
    for (const [corrupted, clean] of Object.entries(corruptedMappings)) {
        if (icon.includes(corrupted)) return clean;
    }

    return icon;
};

const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.amsh.gov.et/api';

export const resolveImageUrl = (path?: string | null): string => {
    if (!path) return '';

    // 1. Return external URLs as is (unless they point to the broken frontend /uploads/)
    if (path.startsWith('https://') || path.startsWith('http://')) {
        if (path.includes('amsh.gov.et/uploads/')) {
            // Strip the domain and treat as relative
            const parts = path.split('/uploads/');
            return `${backendUrl}/uploads/${parts[1]}`;
        }
        return path;
    }

    // 2. Fix stale localhost URLs (rewrite to backend)
    if (path.includes('localhost:5000') || path.includes('localhost:5001')) {
        const parts = path.split('/uploads/');
        if (parts.length > 1) return `${backendUrl}/uploads/${parts[1]}`;
    }

    // 3. Handle relative paths (assume they reside in 's4' default folder)
    if (!path.startsWith('/')) {
        return `${backendUrl}/uploads/s4/${path}`;
    }

    // 4. Transform all local /uploads/ paths to use the absolute backend URL
    if (path.startsWith('/uploads/')) {
        return `${backendUrl}${path}`;
    }

    // 5. Fallback: if it starts with /api/uploads, it's already semi-prepared
    if (path.startsWith('/api/uploads/')) {
        return `${backendUrl}${path.replace('/api/', '/')}`;
    }

    return path;
};
