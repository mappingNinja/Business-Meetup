import { Route } from "react-router-dom";
import AboutUs from "../pages/about-us";
import ContactUs from "../pages/contact-us";
import ForgotPassword from "../pages/forgot-password";
import Landing from "../pages/landing";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ThankYou from "../pages/thank-you";






function PublicRoutes(){


    return(
<>
        <Route path="/" element={<Landing />} />
        <Route path="/login"  element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
</>
    )
}

export default PublicRoutes;