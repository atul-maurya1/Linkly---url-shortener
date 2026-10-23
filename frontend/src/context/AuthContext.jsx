import { createContext, useState } from "react";
import { login, register, verifyEmail, logout } from "../api/authApi";

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

    const registerUser = async(email, password, confirmPassword) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await register(email, password, confirmPassword);
            return response;
        } catch (error) {
            setError(error.message || "Unable to register. Please try again.");
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const userVerify = async(otp, email) => {
        try{
          setIsLoading(true);
          setError(null);
          const response = await verifyEmail(otp, email);
          const loggedInUser = response?.data?.user;
          if (!response?.success || !loggedInUser) {
            throw new Error(response?.message || "Email verification did not return a user.");
          }
          setUser(loggedInUser);
          setIsAuthenticated(true);
          return response;
        } catch (error) {
            setError(error.message || "Unable to verify your email. Please try again.");
            return null;
        } finally {
           setIsLoading(false);
        }
    }

    const logoutUser = async () => {
        try{
           setIsLoading(true);
           await logout()
           setUser(null);
        }catch(error){
            setError(error.message)
        }finally{
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
            setUser,
            isAuthenticated,
            userVerify,
            logoutUser
             }} >
            {children}
        </AuthContext.Provider>
    )
}