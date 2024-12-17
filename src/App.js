import './App.css';
import RegisterPage from "./pages/profile/RegisterPage";
import LoginPage from "./pages/profile/LoginPage";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import VideoDetails from './pages/VideoDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import Foot from './components/Foot';
import ContactDetails from './pages/admin/ContactDetails';
import ChangePassword from './pages/profile/ChangePassword';
import ForgetPassword from './pages/profile/ForgetPassword';
import UpdateProfile from './pages/profile/UpdateProfile';
import UserProfile from './pages/profile/UserProfile';
import Dashboard from './pages/admin/Dashboard';
import ContactIdDetails from './pages/admin/ContactIdDetails';
import NewVideo from './pages/admin/NewVideo';
import UpdateVideo from './pages/admin/UpdateVideo';
import AllUserDetails from './pages/admin/AllUserDetails';
import Contact from './pages/Contact';
import AllContactDetails from './pages/admin/AllContactDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <ToastContainer theme='dark' position='top-center' />
          <NavBar />
          <Routes>
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/video/:id" element={<VideoDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/changepassword" element={<ChangePassword />} />
            <Route path="/profile/updateprofile" element={<UpdateProfile />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/allcontactdetails" element={<AllContactDetails />} />
            <Route path="/admin/newvideo" element={<NewVideo />} />
            <Route path="/admin/updatevideo/:id" element={<UpdateVideo />} />
            <Route path="/admin/alluserdetails" element={<AllUserDetails />} />
            <Route path="/admin/contactiddetails/:id" element={<ContactIdDetails />} />
            <Route path="/admin/contactdetails/:id" element={<ContactDetails />} />
          </Routes>
          <Foot />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
