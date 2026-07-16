import react, { useEffect, useState } from "react";
import axios from "axios";

import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

		async function fetchUser() {
			try {
				const res = await axios.get(
					"https://linkly-url-shortener-4gr0.onrender.com/api/v1/user/get-user",
					{
						withCredentials: true,
					}, 
				);
                
                setUser(res.data.data);

			} catch (e) {
				console.log("error", e.response?.data || e.message);
			}finally{
				setLoading(false)
			}
		}

    useEffect(() => {
		fetchUser();
		
  }, []);

	return (
		<UserContext.Provider value={{ user, setUser, fetchUser, loading}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
