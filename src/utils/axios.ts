import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./auth";

const client = axios.create();

client.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) throw new Error("No refresh token");

                const res = await axios.post(`${import.meta.env.VITE_USERS_HOST}/auth/refresh`, {
                    refreshToken,
                });

                setTokens(res.data.accessToken, res.data.refreshToken);
                originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return client(originalRequest);
            } catch (refreshErr) {
                clearTokens();
                window.location.href = "/login"; // Optionnel : rediriger
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(err);
    }
);

export default client;