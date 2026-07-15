import DashboardContext from './DashboardContext'
import react, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import UserContext from '../context/UserContext'

const DashboardContextProvider = ({children}) => {

    const [dashboard, setDashboard] = useState()
     const { user } = useContext(UserContext);


    async function fetchData () {
       try{
         const res = await axios.get("http://localhost:5000/api/v1/user/dashboard",
                { withCredentials: true },
        );
        setDashboard(res?.data)
        //console.log("res.data ", res.data)
       }catch(e){
         console.log("Dashboard Error:", err.response?.data);
         setDashboard(null);
       }
    }

    useEffect(() => {
    if(user) fetchData()
    },[user])

    //console.log("dash ", dashboard)
 

    return (
        <DashboardContext.Provider value={{dashboard, setDashboard, fetchData}} >
            {children}
        </DashboardContext.Provider>
    )
}
export default DashboardContextProvider