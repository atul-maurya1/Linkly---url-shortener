import { createContext, useState } from "react";
import { login, register } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginUser = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await login(email.trim(), password);
            const loggedInUser = response?.data?.user;
            if (!response?.success || !loggedInUser) {
                throw new Error(response?.message || "The login response did not include a user.");
            }

            setUser(loggedInUser);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            setError(error.message || "Unable to sign in. Please try again.");
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const registerUser = async (name, email, password) => {
        setIsLoading(true);
        try {
            const response = await register(name, email, password);
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <AuthContext.Provider value={{
            loginUser,
            registerUser,
            isLoading,
            error,
            setError,
            user,
            isAuthenticated
             }} >
            {children}
        </AuthContext.Provider>
    )
}