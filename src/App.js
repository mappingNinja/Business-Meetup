import React, {useState, useEffect, useContext } from "react";
import "./common/scss/main.scss";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/landing";
import ForgotPassword from "./pages/forgot-password";
import Signup from "./pages/signup";
import ThankYou from "./pages/thank-you";
import AboutUs from "./pages/about-us";
import ContactUs from "./pages/contact-us";
import EditProfile from "./pages/edit-profile";
import EditProfileSeller from "./pages/edit-profile-seller";
import Footer from "./common/footer";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsAndConditions from "./pages/terms-and-conditions";
import Settings from "./pages/settings";
import ResetPassword from "./pages/reset-password";
import ProductPortfolioInitial from "./pages/product-portfolio-initial";
import CreateProductPortfolio from "./pages/create-product-portfolio";
import ProductPortfolioList from "./pages/product-portfolio-list";
import ProductPortfolio from "./pages/product-portfolio";
import { ThemeContext } from "./context/Theme.context";
import Login from "./pages/login";
import Faq from "./pages/faq";
import Support from "./pages/support";
import SupportOther from "./pages/support-help-other";
import SupportOrder from "./pages/support-help-order";
import SupportOngoing from "./pages/support-ongoing-ticket";
import SupportClosed from "./pages/support-closed-ticket";
import CreatePostToSell from "./pages/create-post-sell";
import CreatePostToBuy from "./pages/create-post-buy";
import ReceivedRequest from "./pages/received-request";
import SentRequest from "./pages/sent-request";
import ConnectionList from "./pages/connection-list";
import CreateTransaction from "./pages/create-transaction";
import Notification from "./pages/notification";
import ShortOrderSeller from "./pages/short-order-seller";
import ShortOrderBuyer from "./pages/short-order-buyer";
import Transaction from "./pages/transaction";
import NegotiationsBuyer from "./pages/negotiation-buyer";
import NegotiationsSeller from "./pages/negotiation-seller";
import SendNegotiation from "./pages/send-negotiation";
import SendOffer from "./pages/send-offer";
import AcceptOffer from "./pages/accept-offer";
import MyPost from "./pages/my-post";
import ProductShortOrder from "./pages/product-portfolio-short-order";
import ProductCompanyDetail from "./pages/product-portfolio-company-detail";
import ProductPurchaseOrder from "./pages/product-portfolio-purchase-order";
import ProductPurchaseInvoice from "./pages/product-portfolio-purchase-invoice";
import ProductBankDetail from "./pages/product-portfolio-bank-detail";
import ProductPayment from "./pages/product-portfolio-payment";
import ProductEBill from "./pages/product-portfolio-e-bill";
import ProductMaterialDispatch from "./pages/product-portfolio-material-dispatch";
import ProductDelivered from "./pages/product-portfolio-delivered";
import ChatRoom from "./pages/chatroom";
import { AuthContext } from "./context/Auth.context";
import EditProduct from "./pages/EditProduct";

function App() {
  const location = useLocation()
  const {
    theme,
    setLightTheme,
    setDarkTheme,
    setLightThemeLogout,
    setDarkThemeLogout,
  } = useContext(ThemeContext);

  function activateDarkMode() {
    setDarkThemeLogout();
  }

  function activateLightMode() {
    setLightThemeLogout();
  }

  const { state } = useContext(AuthContext);
  

  useEffect(() => {
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
 
      darkModePreference.addEventListener("change", (e) =>
        e.matches ? activateDarkMode() : activateLightMode()
      );
    
  }, [activateDarkMode, activateLightMode, setLightThemeLogout]);

  useEffect(() => {
    // if (!localStorage.getItem("dark") && !localStorage.getItem("user")) {
    //   if (
    //     window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: light)").matches
    //   ) {
    //     setLightThemeLogout();
    //   } else {
    //     setDarkThemeLogout();
    //   }
    // }

    if (!localStorage.getItem("dark") && localStorage.getItem("user")) {
  
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    }



    if (localStorage.getItem("dark") === "true") {
      setDarkTheme();
    } else if (!localStorage.getItem("dark") === "true") {
      setLightTheme();
    }
  }, []);

  

  return (
    <div className={"theme " + (theme.dark ? "theme--dark" : "theme--default")}>
      <div className="theme-inner">
       
          <Routes>

          <Route path="/home" element={<Landing />} />

          
            <Route path="/" element={<Landing />} />
            <Route path="/login"  element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="edit-profile-seller/:slug" element={<EditProfileSeller />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="settings" element={<Settings />} />
            <Route
              path="product-portfolio-initial"
              element={<ProductPortfolioInitial />}
            />
            <Route
              path="create-product-portfolio"
              element={<CreateProductPortfolio />}
            />
            <Route
              path="product-portfolio-list"
              element={<ProductPortfolioList />}
            />
            <Route
              path="product-portfolio"
              element={<ProductPortfolio />}
            />
              <Route
              path="edit-product"
              element={<EditProduct />}
            />
            <Route
              path="create-post-sell"
              element={<CreatePostToSell />}
            />
            <Route
              path="create-post-buy"
              element={<CreatePostToBuy />}
            />
            <Route
              path="faq"
              element={<Faq />}
            />
            <Route
              path="support"
              element={<Support />}
            />
            <Route
              path="support-other"
              element={<SupportOther />}
            />
            <Route
              path="support-order"
              element={<SupportOrder />}
            />
            <Route
              path="support-ongoing"
              element={<SupportOngoing />}
            />
            <Route
              path="support-closed"
              element={<SupportClosed />}
            />
            <Route
              path="received-request"
              element={<ReceivedRequest />}
            />
            <Route
              path="sent-request"
              element={<SentRequest />}
            />
            <Route
              path="connection-list"
              element={<ConnectionList />}
            />
            <Route
              path="create-trasanction"
              element={<CreateTransaction />}
            />
            <Route
              path="notification"
              element={<Notification />}
            />
            <Route
              path="short-order-seller"
              element={<ShortOrderSeller />}
            />
            <Route
              path="short-order-buyer"
              element={<ShortOrderBuyer />}
            />
            <Route
              path="transaction"
              element={<Transaction />}
            />
            <Route
              path="negotiation-buyer"
              element={<NegotiationsBuyer />}
            />
            <Route
              path="negotiation-seller"
              element={<NegotiationsSeller />}
            />
            <Route
              path="send-negotiation"
              element={<SendNegotiation />}
            />
            <Route
              path="send-offer"
              element={<SendOffer />}
            />
            <Route
              path="accept-offer"
              element={<AcceptOffer />}
            />
            <Route
              path="product-short-order"
              element={<ProductShortOrder />}
            />
            <Route
              path="product-company-detail"
              element={<ProductCompanyDetail />}
            />
            <Route
              path="product-purchase-order"
              element={<ProductPurchaseOrder />}
            />
            <Route
              path="product-purchase-invoice"
              element={<ProductPurchaseInvoice />}
            />
            <Route
              path="product-bank-detail"
              element={<ProductBankDetail />}
            />
            <Route
              path="product-payment"
              element={<ProductPayment />}
            />
            <Route
              path="product-e-bill"
              element={<ProductEBill />}
            />
            <Route
              path="product-material-dispatch"
              element={<ProductMaterialDispatch />}
            />
            <Route
              path="product-delivered"
              element={<ProductDelivered />}
            />
            <Route
              path="my-post"
              element={<MyPost />}
            />
            <Route
              path="chat-room"
              element={<ChatRoom />}
            />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Routes>
       {location.pathname === "/product-portfolio" ? " " :   <Footer />}
       
      </div>
    </div>
  );
}

export default App;
