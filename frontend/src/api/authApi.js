import apiClient from "../client/apiClient";

export const login = async (email, password) => {
    try {
        const response = await apiClient.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Unable to sign in. Please try again."
        );
    }
}

export const register = async (name, email, password) => {
    try {
        const response = await apiClient.post("/auth/register", { name, email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const logout = async () => {
    try {
        const response = await apiClient.post("/auth/logout");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// export const getUser = async () => {
//     try{
//         const response = await apiClient.get("/auth/user");
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }

export const verifyEmail = async (token) => {
    try{
        const response = await apiClient.get(`/auth/verify-email/${token}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}