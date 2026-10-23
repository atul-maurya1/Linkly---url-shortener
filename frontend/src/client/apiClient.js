import axios from "axios";

const baseURL =  "http://localhost:5000/api/v1"

const apiClient = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const refreshClient = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let refreshPromise = null;

apiClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            originalRequest.url?.includes("/auth/refresh-token") ||
            originalRequest.url?.includes("/auth/login")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            if (!refreshPromise) {
                refreshPromise = refreshClient
                    .post("/auth/refresh-token")
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            await refreshPromise;

            // The backend has set a new access-token cookie.
            // Retry the original request.
            return apiClient(originalRequest);
        } catch (refreshError) {
            if (window.location.pathname !== "/login") {
                window.location.assign("/login");
            }

            return Promise.reject(refreshError);
        }
    }
);

export default apiClient;