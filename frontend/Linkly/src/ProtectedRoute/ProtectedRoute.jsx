import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);



  if (loading) {
    return <h1>Loading...</h1>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;