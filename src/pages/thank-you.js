import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../common/scss/pages/signup.scss";
import Auth from "../libs/auth";

function ThankYou() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const user = Auth.getCurrentUser();
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="thankyou-page">
        <h1>Thank You</h1>
        <p>
          <span>
            You're now a member of <strong>BusiMeet</strong>.
          </span>
          We appreciate your time to become a valuable member of BusiMeet
          family. Stay connected and enjoy using Business Social Media platform.
          We assure you, a lot you can do for your Business here !
        </p>
        <Link to="/" className="button button-primary">
          Navigate to Home
        </Link>
      </div>
    </>
  );
}

export default ThankYou;
