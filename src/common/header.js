import Auth from "../libs/auth";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/Auth.context";
import logo from "../assets/images/logo.svg";
import "./scss/common/header.scss";
import { ReactComponent as LandingHomeIcon } from "../assets/images/landing-nav-home.svg";
import { ReactComponent as AboutIcon } from "../assets/images/landing-nav-about.svg";
import { ReactComponent as ContactIcon } from "../assets/images/landing-nav-contact.svg";
import logoSmall from "../assets/images/logo-small.svg";
import profilePic from "../assets/images/profile.png";
import { ReactComponent as HomeIcon } from "../assets/images/home.svg";
import { ReactComponent as TransactionIcon } from "../assets/images/transaction.svg";
import { ReactComponent as RequestIcon } from "../assets/images/request.svg";
import { ReactComponent as FeedsIcon } from "../assets/images/feeds.svg";
import { ReactComponent as NotificationIcon } from "../assets/images/notification.svg";
import { ReactComponent as SettingIcon } from "../assets/images/settings-icon.svg";
import { ReactComponent as HelpIcon } from "../assets/images/help-icon.svg";
import { ReactComponent as LogoutIcon } from "../assets/images/logout-icon.svg";
import { ReactComponent as LightModeIcon } from "../assets/images/light-mode.svg";
import { ReactComponent as DarkModeIcon } from "../assets/images/dark-mode.svg";
import { ReactComponent as ToggleBuyIcon } from "../assets/images/toggle-buy.svg";
import { ReactComponent as ToggleSellIcon } from "../assets/images/toggle-sell.svg";
import { ReactComponent as HeartFilledIcon } from "../assets/images/heart-filled.svg";
import { ReactComponent as MyTransactionIcon } from "../assets/images/my-transaction-icon.svg";
import { ReactComponent as FormIcon } from "../assets/images/form-icon.svg";
import { ReactComponent as MyNetworkIcon } from "../assets/images/my-network-icon.svg";
import { ReactComponent as PendingIcon } from "../assets/images/pending-icon.svg";
import { ReactComponent as ManageAccountIcon } from "../assets/images/manage-account-icon.svg";
import { ReactComponent as MyPostIcon } from "../assets/images/my-post-icon.svg";
import { ThemeContext } from "../context/Theme.context";
import { Link, useLocation } from "react-router-dom";
import { get, getAuthConfig, postwithOu } from "../libs/http-hydrate";
import { useNavigate } from "react-router-dom";
import { SwitchProfile } from "../context/switchProfile.context";
import { UseEffectOnce } from "../Hook/UseEffectOnce";

function Header(props) {
  const { login, home, buyerRole, UpdateTrue, Buyer } = props;

  const navigate = useNavigate();

  // data to be added for current user
  const currentUser = Auth.getCurrentUser();
  const { setIsLoggedIn } = useContext(AuthContext);
  const { theme, toggleTheme, setLightThemeLogout, setDarkThemeLogout } =
    useContext(ThemeContext);
  const { accountFor, toggleAccount, setBuyerAccount, setSellerAccount } =
    useContext(SwitchProfile);
  // console.log(theme, "theme");
  const location = useLocation();
  const [basic_details, setBasicDetails] = useState({});
  const onLogout = (e) => {
    e.preventDefault();
    if (
      window.location.pathname === "/settings" ||
      window.location.pathname === "/edit-profile"
    ) {
      Auth.logout();
      navigate("/");
    } else {
      Auth.logout();
      navigate("/login");
    }
    if (localStorage.getItem("logoutThemeDark") === "true") {
      setDarkThemeLogout();
    } else if (localStorage.getItem("logoutThemeDark") === "false") {
      setLightThemeLogout();
    }
    if (localStorage.getItem("buyerAccount") === "true") {
      setBuyerAccount();
    } else if (localStorage.getItem("buyerAccount") === "false") {
      setSellerAccount();
    }
  };
  const [data, setData] = useState({});

  const [UserData, setUserData] = useState({});
  const [value, setValue] = useState();
  const [isBuyerActive, setIsBuyerActive] = useState(false);
  const [isSellerActive, setIsSellerActive] = useState(false);
  const isRunned = useRef(false);

  useEffect(() => {
    setValue(Buyer);
  }, [Buyer]);

  UseEffectOnce(() => {
    if (home) {
      fetchDataT();
    }
  });

  async function fetchData() {
    const data = await postwithOu("/user/account_switch", getAuthConfig());
    if (data.status === 200) {
      props.UpdateTrue();
    }
  }

  const handleClick = (data, defineAccount) => {
    // console.log(data, "-------data");
    // console.log("account is for", defineAccount);
    if (defineAccount === "seller") {
      setIsSellerActive(true);
      localStorage.setItem("accountFor", "seller");
    }
    if (defineAccount === "buyer") {
      setIsBuyerActive(true);
      localStorage.setItem("accountFor", "buyer");
    }

    fetchData();
  };

  async function fetchDataT() {
    const data = await get("/user/profile/basic_details", getAuthConfig())
      .then((res) => {
        if (res.status === 200) {
          setBasicDetails(res?.data);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          Auth.logout();
          navigate("/login");
        }
      });
  }

  // console.log(basic_details?.notification_count);

  return (
    <>
      <header className={home ? "header header-home" : "header"}>
        <div className="container-fluid">
          <div className="grid header-logo">
            <Link to={"/"}>
              {home ? (
                <img src={logoSmall} className="App-logoSmall" alt="logo" />
              ) : (
                <img src={logo} className="App-logo" alt="logo" />
              )}
            </Link>
          </div>
          {login && (
            <>
              <div className="grid header-nav">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse login-nav"
                    id="navbarNavAltMarkup"
                  >
                    <div className="navbar-nav">
                      <Link
                        className={`nav-item nav-link ${location.pathname.includes("about-us") ||
                          location.pathname.includes("contact-us")
                          ? ""
                          : "active"
                          }`}
                        to={"/"}
                      >
                        <span className="nav-icon">
                          <LandingHomeIcon />
                        </span>
                        Home
                      </Link>
                      <Link
                        className={`nav-item nav-link ${location.pathname.includes("about-us") ? "active" : ""
                          }`}
                        to={"/about-us"}
                      >
                        <span className="nav-icon">
                          <AboutIcon />
                        </span>
                        About
                      </Link>
                      <Link
                        className={`nav-item nav-link ${location.pathname.includes("contact-us")
                          ? "active"
                          : ""
                          }`}
                        to={"/contact-us"}
                      >
                        <span className="nav-icon">
                          <ContactIcon />
                        </span>
                        Contact Us
                      </Link>
                    </div>
                    <div className="grid header-buttons mobile-view">
                      <Link className="button button-primary" to={"/signup"}>
                        Join Now
                      </Link>
                      {/*<a href='' className='button button-secondary'>Sign In</a>*/}
                    </div>
                  </div>
                </nav>
              </div>
              <div className="grid header-buttons desktop-view">
                <Link to={"/signup"} className="button button-primary">
                  Join Now
                </Link>
                {/* <a href='' className='button button-secondary'>Sign In</a> */}
              </div>{" "}
            </>
          )}
          {home && (
            <>
              <div className="grid header-nav">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link
                          to={"/"}
                          className={`nav-link ${location.pathname.includes("/received-request") ||
                            location.pathname.includes("/sent-request") ||
                            location.pathname.includes("/received-request") ||
                            location.pathname.includes("/connection-list") ||
                            location.pathname.includes("/notification") ||
                            location.pathname.includes("/create-trasanction")
                            ? ""
                            : "active"
                            }`}
                          href="#"
                        >
                          <span className="nav-icon">
                            <HomeIcon />
                          </span>
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${location.pathname.includes("/received-request") ||
                            location.pathname.includes("/sent-request")
                            ? "active"
                            : ""
                            }`}
                          to={"/received-request"}
                        >
                          <span className="nav-icon">
                            <RequestIcon />
                          </span>
                          Requests
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${location.pathname.includes("/connection-list")
                            ? "active"
                            : ""
                            }`}
                          to={"/connection-list"}
                        >
                          <span className="nav-icon">
                            <FeedsIcon />
                          </span>
                          Connection Feeds
                        </Link>
                      </li>
                      {/*<li className='nav-item'>
                        <a className='nav-link' href='#'><span className='nav-icon'><CampaignIcon /></span>Campaign Manager</a>
                      </li>*/}
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${location.pathname.includes("/notification")
                            ? "active"
                            : ""
                            }`}
                          to={"/notification"}
                        >
                          <span className="nav-icon">
                            <p
                              className="ml-5 "
                              style={{
                                "background-color": "#ffbe26",
                                "position": "absolute",
                                "top": "1px",
                                "min-width": "20px",
                                "border-radius": "500px",
                                "padding-left": "2px",
                                "padding-right": "2px",
                                "  border": " 3px solid #f4fdff"
                              }}
                            >
                              {basic_details?.notification_count}
                            </p>
                            <NotificationIcon />
                          </span>
                          Notifications
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${location.pathname.includes("/create-trasanction")
                            ? "active"
                            : ""
                            }`}
                          to={"/create-trasanction"}
                        >
                          <span className="nav-icon">
                            <TransactionIcon />
                          </span>
                          Create Transaction
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="grid header-right">
                <ul>
                  <li>
                    <div className="switch-box">
                      {console.log('check account is : ', accountFor)}
                      <input
                        type="checkbox"
                        id="user_switch"
                        checked={!accountFor.buyer}
                        onClick={toggleAccount}
                      />
                      <label htmlFor="user_switch">
                        <span className={"switch-icon"}>
                          <ToggleBuyIcon onClick={setBuyerAccount} />
                        </span>
                        <span className={"switch-icon"}>
                          <ToggleSellIcon onClick={setSellerAccount} />
                        </span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="switch-box">
                      <input
                        type="checkbox"
                        id="mode_switch"
                        onClick={toggleTheme}
                        checked={!theme.dark}
                      />
                      <label htmlFor="mode_switch">
                        <span className="switch-icon">
                          <DarkModeIcon />
                        </span>
                        <span className="switch-icon">
                          <LightModeIcon />
                        </span>
                      </label>
                    </div>
                  </li>
                  <li className="nav-item dropdown account-dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src={profilePic} className="profile-pic" />
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="profile-name dropdown-item" href="#">
                        <img src={profilePic} className="profile-pic" /> Chirag
                        Patel
                      </a>
                      <p className="profile-bio dropdown-item mobile-view">
                        “Hi! I’m Chris Moran – I’m the founder of Instinctual
                        Balance, and I absolutely love what I do.
                      </p>
                      <div className="profile-followers dropdown-item mobile-view">
                        <HeartFilledIcon /> 130 people followed you
                      </div>
                      <div className="mobile-view profile-nav">
                        <a className="dropdown-item" href="#">
                          <span className="nav-icon">
                            <MyTransactionIcon />
                          </span>
                          My Transactions
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                          <span className="nav-icon">
                            <FormIcon />
                          </span>
                          Pre Filled Forms
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                          <span className="nav-icon">
                            <MyNetworkIcon />
                          </span>
                          My Network
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                          <span className="nav-icon">
                            <PendingIcon />
                          </span>
                          Pending Requests
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                          <span className="nav-icon">
                            <ManageAccountIcon />
                          </span>
                          Manage Account
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                          <span className="nav-icon">
                            <MyPostIcon />
                          </span>
                          My Post
                        </a>
                        <div className="dropdown-divider" />
                      </div>
                      <Link className="dropdown-item" to="/settings">
                        <span className="nav-icon">
                          <SettingIcon />
                        </span>
                        Settings
                      </Link>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="/support">
                        <span className="nav-icon">
                          <HelpIcon />
                        </span>
                        Help & Support
                      </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="/faq">
                        <span className="nav-icon">
                          <SettingIcon />
                        </span>
                        FAQs
                      </a>
                      <div className="dropdown-divider" />
                      <Link
                        className="dropdown-item logout-link"
                        to="/"
                        onClick={onLogout}
                      >
                        <span className="nav-icon">
                          <LogoutIcon />
                        </span>
                        Logout
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
