import Navbar from './components/Navbar'
import { Route , Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Footer from "./components/Footer.jsx";
import Login from './Pages/Login.jsx';
import Signup from'./Pages/Signup.jsx'
import MainLayout from './layout//MainLayout.jsx'
import ForgotPassword from './Pages/ForgotPassword.jsx'
import OTP from './Pages/OTP.jsx'
import SideBar from './components/SideBar.jsx'
import DashboardLayout from './layout/DashboardLayout.jsx'
import Dashboard from './Pages/Dashboard'
import Setting from './Pages/Setting.jsx'
import Link from './Pages/Link.jsx'
import CreateLink from './Pages/CreateLink.jsx'


function App() {

  return (
 
    <div>
     <Routes>

      <Route path="/" element={<MainLayout/>}>
      <Route index  element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      </Route>

       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />  
       <Route path="/forgot-password" element={<ForgotPassword />} />  
       <Route path ='/otp-verification/:id' element={<OTP />} />
       
       <Route path='/dashboard' element = {<DashboardLayout />}>
       <Route index element={<Dashboard />} />
       <Route path ='Setting' element={<Setting />} />
       <Route path ='links' element={<Link />} />
       <Route path='create-link' element={<CreateLink />}></Route>
       
       </Route>
       
      </Routes>

   </div>
   
  )
}

export default App
