import react, { useEffect, useState } from "react";
import axios from "axios";

import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

		async function fetchUser() {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/v1/user/get-user",
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
		<UserContext.Provider value={{ user, setUser, loading}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
