import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../common/scss/pages/home.scss";
import profilePic from "../assets/images/profile.png";
import PostImage from "../assets/images/post-image.jpg";
import PostImage2 from "../assets/images/social1.jpg";
import PostImage3 from "../assets/images/social2.jpg";
import { ReactComponent as ConnectIcon } from "../assets/images/connect-icon.svg";
import { ReactComponent as BuyerIcon } from "../assets/images/buyer-icon.svg";
import { ReactComponent as SellerIcon } from "../assets/images/seller-icon.svg";
import { ReactComponent as SocialIcon } from "../assets/images/social-icon.svg";
import { ReactComponent as ResetIcon } from "../assets/images/reset-icon.svg";
import { ReactComponent as ShareIcon } from "../assets/images/share-icon.svg";
import { ReactComponent as CaretDownIcon } from "../assets/images/caret-down.svg";
import { ReactComponent as MoreIcon } from "../assets/images/more-icon.svg";
import { ReactComponent as HistoryIcon } from "../assets/images/history-icon.svg";
import { ReactComponent as EditIcon } from "../assets/images/edit-icon.svg";
import { ReactComponent as LikeIcon } from "../assets/images/like-icon.svg";
import { ReactComponent as LikeIconFilled } from "../assets/images/like-icon-filled.svg";
import { ReactComponent as CommentIcon } from "../assets/images/comment-icon.svg";
import { ReactComponent as CommentIconFilled } from "../assets/images/comment-icon-filled.svg";
import { ReactComponent as SendQuoteIcon } from "../assets/images/send-quote-icon.svg";
import { ReactComponent as MeetingRoomIcon } from "../assets/images/meeting-room-icon.svg";
import { ReactComponent as MeetingRoomIconFilled } from "../assets/images/meeting-room-icon-filled.svg";
import { ReactComponent as PostShareIcon } from "../assets/images/post-share-icon.svg";
import { ReactComponent as PostShareIconFilled } from "../assets/images/post-share-icon-filled.svg";
import { ReactComponent as AcceptDealIcon } from "../assets/images/accept-deal-icon.svg";
import { ReactComponent as NegotiationIcon } from "../assets/images/negotiation-icon.svg";
import { ReactComponent as SocialReactIcon } from "../assets/images/social-react.svg";
import { ReactComponent as CardIcon } from "../assets/images/card-icon.svg";
import { ReactComponent as SearchIcon } from "../assets/images/search-icon.svg";
import { ReactComponent as ReactLikeIcon } from "../assets/images/react-like.svg";
import { ReactComponent as CelebrateIcon } from "../assets/images/celebrate.svg";
import { ReactComponent as CareIcon } from "../assets/images/care.svg";
import { ReactComponent as LoveIcon } from "../assets/images/love.svg";
import { ReactComponent as InsightfulIcon } from "../assets/images/insightful.svg";
import { ReactComponent as CuriousIcon } from "../assets/images/curious.svg";
import { ReactComponent as AttachmentIcon } from "../assets/images/attachment.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/images/arrow-down.svg";
import Header from "../common/header";
import PostSocialModal from "./post-social-modal";
import VerifyModal from "./verify-modal";
import VerifyGSTModal from "./verify-gst-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { get, getAuthConfig, post, postwithOu } from "../libs/http-hydrate";
import { ThemeContext } from "../context/Theme.context";
import Auth from "../libs/auth";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import swal from "sweetalert";
import { useCallback } from "react";
import { useRef } from "react";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import Select from "react-select";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Home() {
  const user = Auth.getCurrentUser();
  const location = useLocation();
  const { setLightTheme, setDarkTheme, theme } = useContext(ThemeContext);
  const [shareLink, setShareLink] = useState(false);
  const [HomeDatas, setHomeDatas] = useState({});
  const [CommentV, setComment] = useState({
    comment: "",
    comment_Id: "",
  });
  const [sent, setSent] = useState({
    items: [],
  });
  const [timeline, setTimeline] = useState({
    items: [],
    has_more: false,
  });
  const [roleData, setRoleData] = useState();
  const [Update, setSupdate] = useState(false);
  const [infiniteScroll, setinfiniteScroll] = useState(false);
  const buyerRole = (roleData) => {
    setRoleData(roleData);
  };

  const [available_usersPage, setavailable_usersPage] = useState(0);
  const [IndPage, setIndPage] = useState(0);

  const [suggested_usersPage, setsuggested_usersPage] = useState(0);
  const [TimeLine_usersPage, setTimeLine_usersPage] = useState(0);
  const [categoryPage, setcategoryPage] = useState(0);
  const [subCatPage, setsubCatPage] = useState(0);

  const [LoadingT, setLoadingT] = useState(false);
  const navigate = useNavigate();
  const MarketUpdates = useRef(null);

  const [stateList, setStateList] = useState({
    items: [],
    has_more: false,
  });
  const [cityList, setCityList] = useState([]);
  const [productArray, setProductArray] = useState({
    items: [],
    has_more: false,
  });
  const [productSubCategoryArray, setProductSubCategoryArray] = useState({
    items: [],
    has_more: false,
  });
  const [availableIndustry, setAvailableIndustry] = useState({
    items: [],
    has_more: false,
  });

  const [FilterAvail, setFilterAvail] = useState({
    state_Id: "",
    city_Id: "",
    industry_Id: "",
    category_id: "",
    subcategory_id: "",
  });
  const settingsPost = {
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 2.25,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [data, setData] = useState({
    dataa: "",
  });
  const [available, setAvailable] = useState({
    items: [],
    has_more: false,
  });
  const [suggest, setSuggest] = useState({
    items: [],
    has_more: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  UseEffectOnce(() => {
    // fetchData();
  }, []);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (location.state === "scrollToDiv") {
      MarketUpdates.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  UseEffectOnce(() => {
    available_usersPages();
    fetchMoreData();
  });

  useEffect(() => {
    if (available_usersPage === 0) {
    } else {
      available_usersPages();
    }
  }, [available_usersPage]);

  useEffect(() => {
    if (categoryPage === 0) {
    } else {
      intialCat();
    }
  }, [categoryPage]);
  useEffect(() => {
    if (TimeLine_usersPage === 0) {
    } else {
      fetchMoreData();
    }
  }, [TimeLine_usersPage]);

  useEffect(() => {
    if (suggested_usersPage === 0) {
    } else {
      // suggest_usersPages();
    }
  }, [suggested_usersPage]);

  useEffect(() => {
    if (subCatPage === 0) {
    } else {
      searcSubCat(FilterAvail?.category_id);
    }
  }, [subCatPage]);

  useEffect(() => {
    if (IndPage === 0) {
    } else {
      Industry();
    }
  }, [IndPage]);

  function IntialState() {
    get("/general/region_listing?region_id=1")
      .then((response) => {
        setStateList((p) => ({
          ...p,
          items: response?.data?.data,
        }));
        setStateList((p) => ({
          ...p,
          has_more: response?.data?.has_more,
        }));
      })
      .catch((e) => {});
  }

  function City() {
    get(`/general/region_listing?region_id=${FilterAvail?.state_Id}`)
      .then((response) => {
        setCityList(response.data.data);
      })
      .catch((e) => {});
  }

  function intialCat() {
    post("/general/category_listing", {
      type: "product",
      page: categoryPage + 1,
    })
      .then((response) => {
        console.log("response?.data?.data", response?.data?.data);

        setProductArray((p) => ({
          ...p,
          items: productArray.items.concat(response?.data?.data),
        }));
        setProductArray((p) => ({ ...p, has_more: response?.data?.has_more }));
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }

  function searcSubCat(parent_id, newValue) {
    post("/general/category_listing", {
      type: "product_sub_category",
      page: subCatPage + 0,
      search: newValue,
      parent_id: parent_id,
    })
      .then((response) => {
        if (subCatPage === 0) {
          setProductSubCategoryArray((p) => ({
            ...p,
            items: response?.data?.data,
          }));
        } else {
          setProductSubCategoryArray((p) => ({
            ...p,
            items: productSubCategoryArray.items.concat(response?.data?.data),
          }));
        }

        setProductSubCategoryArray((p) => ({
          ...p,
          has_more: response?.data?.has_more,
        }));
        // setProductSubCategoryArray(response.data.data);
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }

  function Industry() {
    post(
      "/general/category_listing",
      { type: "industry", page: IndPage + 1 }
      // { headers: { Authorization: `Bearer ${user.token}` } }
    ).then((response) => {
      setAvailableIndustry((p) => ({
        ...p,
        items: availableIndustry.items.concat(response?.data?.data),
      }));
      setAvailableIndustry((p) => ({
        ...p,
        has_more: response?.data?.data?.has_more,
      }));
      // setAvailableIndustry(response.data.data);
    });
  }
  async function available_usersPages() {
    const data = await get(
      `/home/available_users?page=${available_usersPage + 1}`,
      getAuthConfig()
    ).then((response) => {
      setAvailable((p) => ({
        ...p,
        items: available.items.concat(response?.data?.data?.items),
      }));
      setAvailable((p) => ({ ...p, has_more: response?.data?.data?.has_more }));

      console.log(data);
    });
  }

  UseEffectOnce(() => {
    HomeData();
  }, []);
  async function suggest_usersPages() {
    const data = await get(
      `/home/suggested_users?page=${suggested_usersPage + 1}`,
      getAuthConfig()
    ).then((response) => {
      setSuggest((p) => ({
        ...p,
        items: suggest.items.concat(response?.data?.data?.items),
      }));
      setSuggest((p) => ({ ...p, has_more: response?.data?.data?.has_more }));

      console.log(data);
    });
  }
  useEffect(() => {
    if (Update === true) {
      // fetchData();
      HomeData();
    }
    setSupdate(false);
  }, [Update]);
  useEffect(() => {
    if (location.state === "scrollToDiv") {
      console.log("ewoio");
    }
  }, [location.state != null]);

  async function fetchData() {
    const data = await get("/user/profile/basic_details", getAuthConfig());
    if (data.status === 200) {
      setData({ ...data, dataa: data.data });
    }
  }
  async function HomeData() {
    const data = await get("/home", getAuthConfig());
    if (data.status === 200) {
      setHomeDatas(data.data.data);

      localStorage.setItem("PENDREQ", data?.data?.data?.pending_request);
    }
  }

  function UpdateTrue() {
    setSupdate(true);
  }
  function UpdateFalse() {
    setSupdate(false);
  }

  console.log(data);

  async function sentConnectionRequest(User_id) {
    const formdata = new FormData();
    formdata.append("user_id", User_id);
    const data = await postwithOu("/connection/send", getAuthConfig(), formdata)
      .then((datta) => {
        if (datta.status === 200) {
          swal(
            "Success",
            "Your Connection Request Successfully Sent ",
            "success"
          );
          setSent((p) => ({
            ...p,
            items: sent.items.concat(User_id),
          }));
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          swal("Warning", "Request Already sent to this user ", "warning");
        }
      });
  }

  async function fetchMoreData() {
    setLoadingT(true);

    const data = await get(
      `/home/timeline?page=${TimeLine_usersPage + 1}`,
      getAuthConfig()
    ).then((response) => {
      if(TimeLine_usersPage === 0){
        setTimeline((p) => ({
          ...p,
          items: response?.data?.data?.items,
        }));
      }
      else{
        setTimeline((p) => ({
          ...p,
          items: timeline.items.concat(response?.data?.data?.items),
        }));
      }
      setTimeline((p) => ({ ...p, has_more: response?.data?.data?.has_more }));
      setLoadingT(false);
    });
  }
  function UpdateTimeLine() {
    let pg = TimeLine_usersPage + 1;
    alert(pg);
    setTimeLine_usersPage(pg);
  }

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      // if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && timeline?.has_more) {
          setTimeLine_usersPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [timeline?.has_more]
  );

  const observer1 = useRef();
  const lastStateElementRef = useCallback(
    (node) => {
      // if (loading) return;
      if (observer1.current) observer1.current.disconnect();
      observer1.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && productArray?.has_more) {
          setcategoryPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [productArray?.has_more]
  );

  async function reaction(Post_Id, type) {
    const formdata = new FormData();

    if (type === "social_post") {
      formdata.append("social_post_id", Post_Id);
    } else if (type === "product") {
      formdata.append("product_id", Post_Id);
    }

    formdata.append("type", type);
    formdata.append("reaction", "like");

    const data = await postwithOu(
      "/general/reaction",
      getAuthConfig(),
      formdata
    )
      .then((datta) => {
        if (datta.status === 200) {
          fetchMoreData()
        }
      })
      .catch((e) => {});
  }

  async function Comment(Post_Id, type) {
    const formdata = new FormData();

    if (type === "social_post") {
      formdata.append("social_post_id", Post_Id);
    } else if (type === "product") {
      formdata.append("product_id", Post_Id);
    }

    formdata.append("type", type);
    formdata.append("comment", CommentV?.comment);

    const data = await postwithOu("/general/comment", getAuthConfig(), formdata)
      .then((datta) => {
        if (datta.status === 200) {
          fetchMoreData()
        }

      })
      .catch((e) => {});
  }
  const categoryRef = useRef(null);

  function clear() {
    console.log(categoryRef.current.commonProps.setValue(""));
  }
  console.log("stateList?.items", stateList?.items);
  return (
    <>
      <Header
        home
        // UserDetail={data?.dataa?.data}
        buyerRole={buyerRole}
        UpdateTrue={UpdateTrue}
        Buyer={data?.dataa?.data?.is_buyer}
      />

      <div className="grey-bg">
        <div className="container-fluid">
          <div className="layout-grid-box">
            {/* <div className="layout-grid layout-grid--left">
              <div className="card card-profile">
                <div className="card-inner">
                  <div className="card-body">
                    <div className="card-profile-image">
                      <div className="profile-bg">
                        <img
                          src={data?.dataa?.data?.cover_image}
                          className="profile-pic"
                        />
                      </div>
                      <Link to={"/edit-profile"}>
                        <div className="profile-main">
                          <img
                            src={data?.dataa?.data?.profile_image}
                            className="profile-pic"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="profile-name">
                      <Link to={"/edit-profile"}>
                        <h6>{data?.dataa?.data?.name}</h6>
                      </Link>
                      <p className="profile-bio">{data?.dataa?.data?.about}</p>
                      <div className="profile-followers">
                        <HeartFilledIcon /> 130 people followed you
                      </div>
                    </div>
                    <div className="profile-links">
                      <ul>
                        <li>
                          <Link to={""}>
                            <MyTransactionIcon />
                            My Transactions
                          </Link>
                        </li>
                        <li>
                          <Link to={"/settings"} state={{ PreFilled: "true" }}>
                            <FormIcon />
                            Pre Filled Forms
                          </Link>
                        </li>
                        <li>
                          <Link to={""}>
                            <MyNetworkIcon />
                            My Network
                          </Link>
                        </li>
                        <li>
                          <Link to={""}>
                            <PendingIcon />
                            Pending Requests <strong>(10)</strong>
                          </Link>
                        </li>
                        <li>
                          <Link to={""}>
                            <ManageAccountIcon />
                            Manage Account
                          </Link>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <Link to={""}>
                            <MyPostIcon />
                            My Post
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <LeftSideBar />
            <div className="layout-grid">
              <div className="card top-buttons">
                <div className="flex-box">
                  {data?.dataa?.data?.is_buyer === 1 ? (
                    <> </>
                  ) : (
                    <>
                      {" "}
                      <div className="flex-item">
                        {user?.verified_at === null ? (
                          <Link
                            to={"/"}
                            className="button button-primary button-primary--bordered"
                            onClick={(e) => {
                              e.preventDefault();
                              swal(
                                "Warning",
                                "Please Verify Your Profile ",
                                "error"
                              );
                            }}
                          >
                            <SellerIcon />
                            Post to Sell
                          </Link>
                        ) : (
                          <Link
                            to={"/create-post-sell"}
                            className="button button-primary button-primary--bordered"
                          >
                            <SellerIcon />
                            Post to Sell
                          </Link>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex-item">
                    {user?.verified_at === null ? (
                      <Link
                        to={"/"}
                        className="button button-primary button-primary--bordered"
                        onClick={(e) => {
                          e.preventDefault();
                          swal(
                            "Warning",
                            "Please Verify Your Profile ",
                            "error"
                          );
                        }}
                      >
                        <BuyerIcon />
                        Post to Buy
                      </Link>
                    ) : (
                      <Link
                        to={"/create-post-buy"}
                        className="button button-primary button-primary--bordered"
                      >
                        <BuyerIcon />
                        Post to Buy
                      </Link>
                    )}
                  </div>
                  <div className="flex-item">
                    {user?.verified_at === null ? (
                      <Link
                        to={""}
                        className="button button-primary button-primary--bordered"
                        onClick={(e) => {
                          e.preventDefault();
                          swal(
                            "Warning",
                            "Please Verify Your Profile ",
                            "error"
                          );
                        }}
                      >
                        <SocialIcon />
                        Post to Social
                      </Link>
                    ) : (
                      <Link
                        to={""}
                        className="button button-primary button-primary--bordered"
                        data-toggle="modal"
                        data-target="#PostSocialModal"
                      >
                        <SocialIcon />
                        Post to Social
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/*<div className='no-ads'>
                <div className='close'><CloseIcon /></div>
                <div className='flex-box'>
                  <div className='flex-item'><img src={NoAdsVector} alt='No Ads' /></div>
                  <div className='flex-item'><button className='button button-primary'>Create Campaign</button></div>
                </div>
              </div>*/}
              {/*<div className='campaign-ads'>
                <div className='campaign-ads-title'><h6>Run Campaign</h6></div>
                <Slider {...settings}>
                  <div className='slide-item'>
                    <div className='card featured'>
                      <div className='card-body'>
                        <div className='user-profile'>
                          <div className='user-profile-image'><img src={profilePic} className='profile-pic' /></div>
                          <div className='user-profile-content'>
                            <div className='user-profile-name'>
                              <h6>Makita Panchal<span>(Profile ID: 302101)</span></h6>
                              <p>Owner at mehta brothers</p>
                            </div>
                            <div className='featured-tag'><img src={featuredTagIcon} />Featured Profile</div>
                          </div>
                        </div>
                        <div className='featured-details'>
                          <ul>
                            <li><span className='featured-details--label'>Location</span>:<span className='featured-details--text'>Ahmedabad</span></li>
                            <li><span className='featured-details--label'>GST</span>:<span className='featured-details--text'>NHD9F987G0834</span></li>
                            <li><span className='featured-details--label'>Deals Closed</span>:<span className='featured-details--text'>32</span></li>
                            <li><span className='featured-details--label'>Followers</span>:<span className='featured-details--text'>234</span></li>
                          </ul>
                          <div className='featured-details--highlights'>
                            <strong>Industry: Industrial Supplies</strong>
                          </div>
                          <div className='featured-details--highlights'>
                            <strong>Deals In</strong>
                            <p>Abrasives, Power Tools, Hand To-
                              ols, and Industrial Safty Tools</p>
                          </div>
                        </div>
                        <div className='featured-actions'>
                          <button className='button button-primary button-connect'><ConnectIcon />Follow</button>
                          <button className='button button-primary button-connect'><MeetingRoomIcon />Meeting Room</button>
                          <button className='button button-blue button-connect'><PostShareIcon /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='slide-item'>
                    <div className='card featured'>
                      <div className='card-body'>
                        <div className='user-profile'>
                          <div className='user-profile-image'><img src={profilePic} className='profile-pic' /></div>
                          <div className='user-profile-content'>
                            <div className='user-profile-name'>
                              <h6>Makita Panchal<span>(Profile ID: 302101)</span></h6>
                              <p>Owner at mehta brothers</p>
                            </div>
                            <div className='featured-tag'><img src={featuredTagIcon} />Featured Profile</div>
                          </div>
                        </div>
                        <div className='featured-details'>
                          <ul>
                            <li><span className='featured-details--label'>Location</span>:<span className='featured-details--text'>Ahmedabad</span></li>
                            <li><span className='featured-details--label'>GST</span>:<span className='featured-details--text'>NHD9F987G0834</span></li>
                            <li><span className='featured-details--label'>Deals Closed</span>:<span className='featured-details--text'>32</span></li>
                            <li><span className='featured-details--label'>Followers</span>:<span className='featured-details--text'>234</span></li>
                          </ul>
                          <div className='featured-details--highlights'>
                            <strong>Industry: Industrial Supplies</strong>
                          </div>
                          <div className='featured-details--highlights'>
                            <strong>Deals In</strong>
                            <p>Abrasives, Power Tools, Hand To-
                              ols, and Industrial Safty Tools</p>
                          </div>
                        </div>
                        <div className='featured-actions'>
                          <button className='button button-primary button-connect'><ConnectIcon />Follow</button>
                          <button className='button button-primary button-connect'><MeetingRoomIcon />Meeting Room</button>
                          <button className='button button-blue button-connect'><PostShareIcon /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='slide-item'>
                    <div className='card featured'>
                      <div className='card-body'>
                        <div className='user-profile'>
                          <div className='user-profile-image'><img src={profilePic} className='profile-pic' /></div>
                          <div className='user-profile-content'>
                            <div className='user-profile-name'>
                              <h6>Makita Panchal<span>(Profile ID: 302101)</span></h6>
                              <p>Owner at mehta brothers</p>
                            </div>
                            <div className='featured-tag'><img src={featuredTagIcon} />Featured Profile</div>
                          </div>
                        </div>
                        <div className='featured-details'>
                          <ul>
                            <li><span className='featured-details--label'>Location</span>:<span className='featured-details--text'>Ahmedabad</span></li>
                            <li><span className='featured-details--label'>GST</span>:<span className='featured-details--text'>NHD9F987G0834</span></li>
                            <li><span className='featured-details--label'>Deals Closed</span>:<span className='featured-details--text'>32</span></li>
                            <li><span className='featured-details--label'>Followers</span>:<span className='featured-details--text'>234</span></li>
                          </ul>
                          <div className='featured-details--highlights'>
                            <strong>Industry: Industrial Supplies</strong>
                          </div>
                          <div className='featured-details--highlights'>
                            <strong>Deals In</strong>
                            <p>Abrasives, Power Tools, Hand To-
                              ols, and Industrial Safty Tools</p>
                          </div>
                        </div>
                        <div className='featured-actions'>
                          <button className='button button-primary button-connect'><ConnectIcon />Follow</button>
                          <button className='button button-primary button-connect'><MeetingRoomIcon />Meeting Room</button>
                          <button className='button button-blue button-connect'><PostShareIcon /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='slide-item'>
                    <div className='card featured'>
                      <div className='card-body'>
                        <div className='user-profile'>
                          <div className='user-profile-image'><img src={profilePic} className='profile-pic' /></div>
                          <div className='user-profile-content'>
                            <div className='user-profile-name'>
                              <h6>Makita Panchal<span>(Profile ID: 302101)</span></h6>
                              <p>Owner at mehta brothers</p>
                            </div>
                            <div className='featured-tag'><img src={featuredTagIcon} />Featured Profile</div>
                          </div>
                        </div>
                        <div className='featured-details'>
                          <ul>
                            <li><span className='featured-details--label'>Location</span>:<span className='featured-details--text'>Ahmedabad</span></li>
                            <li><span className='featured-details--label'>GST</span>:<span className='featured-details--text'>NHD9F987G0834</span></li>
                            <li><span className='featured-details--label'>Deals Closed</span>:<span className='featured-details--text'>32</span></li>
                            <li><span className='featured-details--label'>Followers</span>:<span className='featured-details--text'>234</span></li>
                          </ul>
                          <div className='featured-details--highlights'>
                            <strong>Industry: Industrial Supplies</strong>
                          </div>
                          <div className='featured-details--highlights'>
                            <strong>Deals In</strong>
                            <p>Abrasives, Power Tools, Hand To-
                              ols, and Industrial Safty Tools</p>
                          </div>
                        </div>
                        <div className='featured-actions'>
                          <button className='button button-primary button-connect'><ConnectIcon />Follow</button>
                          <button className='button button-primary button-connect'><MeetingRoomIcon />Meeting Room</button>
                          <button className='button button-blue button-connect'><PostShareIcon /></button>
                        </div>
                      </div>
                    </div>
                  </div>

                </Slider>
              </div>*/}
              <div className="card seller-list">
                <div className="card-header">
                  <h6>
                    Nos. of {user?.is_seller === 1 ? "Buyer" : "Seller"}{" "}
                    Available{" "}
                    <strong>({HomeDatas?.available_users?.count})</strong>
                  </h6>
                  <a
                    className="collapse-button"
                    data-toggle="collapse"
                    href="#collapseSeller"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseSeller"
                  >
                    <ArrowDownIcon />
                  </a>
                </div>
                <div className="collapse show" id="collapseSeller">
                  <div className="card search-market">
                    <div className="card-header">
                      <h6>
                        <span>Search Market -</span>{" "}
                        <span className="country-tag">India</span>
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Search"
                          />
                          <button className="search-button">
                            <SearchIcon />
                          </button>
                        </div>
                      </h6>
                      <Link to={""} className="reset-icon">
                        <ResetIcon />
                        Reset
                      </Link>
                      <a
                        className="collapse-button mobile-view"
                        data-toggle="collapse"
                        href="#collapseSearch"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseSearch"
                      >
                        <ArrowDownIcon />
                      </a>
                    </div>
                    <div
                      className="card-body pt-0 collapse desktop-view"
                      id="collapseSearch"
                    >
                      <form className="flex-box">
                        <div className="form-field flex-item">
                          <label>State</label>
                          <Select
                            placeholder="Select State"
                            id="State"
                            onFocus={(e) => {
                              e.preventDefault();
                              IntialState();
                            }}
                            options={
                              stateList?.items &&
                              stateList?.items.length > 0 &&
                              stateList?.items?.map(function (productArray) {
                                return {
                                  value: productArray.id,
                                  label: productArray.name,
                                };
                              })
                            }
                            onKeyDown={(e) => {
                              console.log("e.target.value", e.target.value);
                              // searcCat(e.target.value);
                            }}
                            onChange={(e) => {
                              clear();
                              setFilterAvail((p) => ({
                                ...p,
                                state_Id: e.value,
                              }));
                            }}
                            onBlur={(e) => {
                              e.preventDefault();
                            }}
                          ></Select>
                        </div>
                        <div className="form-field flex-item">
                          <label>City</label>
                          <Select
                            ref={categoryRef}
                            placeholder="Select city"
                            id="city"
                            onFocus={(e) => {
                              e.preventDefault();
                              City();
                            }}
                            options={cityList.map(function (productArray) {
                              return {
                                value: productArray.id,
                                label: productArray.name,
                              };
                            })}
                            onKeyDown={(e) => {
                              console.log("e.target.value", e.target.value);
                              // searcCat(e.target.value);
                            }}
                            onChange={(e) => {}}
                            onBlur={(e) => {
                              e.preventDefault();
                            }}
                          ></Select>
                        </div>
                        <div className="form-field flex-item">
                          <label>Industry Category</label>
                          <Select
                            placeholder="Select"
                            id="industry"
                            onFocus={(e) => {
                              e.preventDefault();
                              Industry();
                            }}
                            options={availableIndustry?.items.map(function (
                              productArray
                            ) {
                              return {
                                value: productArray.id,
                                label: productArray.name,
                              };
                            })}
                            onKeyDown={(e) => {}}
                            onChange={(e) => {
                              setFilterAvail((p) => ({
                                ...p,
                                industry_Id: e.value,
                              }));
                            }}
                            onBlur={(e) => {
                              e.preventDefault();
                            }}
                            onMenuScrollToBottom={(e) => {
                              if (availableIndustry?.has_more === true) {
                                let p = IndPage + 1;
                                setIndPage(p);
                              }
                            }}
                          ></Select>
                        </div>
                        <div className="form-field flex-item">
                          <label>Product Category</label>

                          <Select
                            placeholder="Select Category"
                            id="category"
                            onFocus={(e) => {
                              e.preventDefault();
                              intialCat();
                            }}
                            options={
                              productArray?.items &&
                              productArray?.items.length > 0 &&
                              productArray?.items.map(function (te) {
                                return {
                                  value: te.id,
                                  label: te.name,
                                };
                              })
                            }
                            onKeyDown={(e) => {}}
                            onChange={(e) => {
                              setFilterAvail((p) => ({
                                ...p,
                                category_id: e.value,
                              }));
                            }}
                            onBlur={(e) => {
                              e.preventDefault();
                            }}
                            onMenuScrollToBottom={(e) => {
                              if (productArray?.has_more === true) {
                                let p = categoryPage + 1;
                                setcategoryPage(p);
                              }
                            }}
                          ></Select>

                          {/* <AsyncPaginate
                      
          loadOptions={extendedLoadOptions}
          
          shouldLoadMore={(scrollHeight, clientHeight, scrollTop) => {
            return scrollHeight - scrollTop < 1000;
          }}
        /> */}

                          {/* <AsyncSelect
  loadOptions={loadOptions}
/>                         */}
                        </div>
                        <div className="form-field flex-item">
                          <label>Sub Category</label>
                          <Select
                            // ref={selectInputRef}
                            id="subCategory"
                            placeholder="Select Sub Category"
                            options={productSubCategoryArray?.items.map(
                              function (sub_category) {
                                return {
                                  value: sub_category.id,
                                  label: sub_category.name,
                                };
                              }
                            )}
                            onFocus={(e) => {
                              e.preventDefault();
                              if (FilterAvail?.category_id != "") {
                                searcSubCat(FilterAvail?.category_id);
                              }
                            }}
                            onKeyDown={(e) => {
                              console.log("e.target.value", e.target.value);
                            }}
                            // onInputChange={(newValue) => {
                            //   searcSubCat(newValue, ProductData?.category_id);
                            // }}
                            onChange={(e) => {}}
                            onBlur={(e) => {
                              e.preventDefault();
                            }}
                            onMenuScrollToBottom={(e) => {
                              if (productSubCategoryArray?.has_more === true) {
                                let p = subCatPage + 1;
                                setsubCatPage(p);
                              }
                            }}
                          ></Select>
                        </div>
                        <div className="form-button flex-item">
                          <button
                            className="button button-primary"
                            type="submit"
                          >
                            Go
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="card-lists">
                      {available?.items &&
                        available?.items.length > 0 &&
                        available?.items.map((item, index) => {
                          return (
                            <>
                              <div className="card-lists-item user-profile">
                                <Link to={`/edit-profile-seller/${item.slug}`}>
                                  <div className="user-profile-image">
                                    <img
                                      alt="profile_img"
                                      src={item?.profile_image}
                                      className="profile-pic"
                                    />
                                  </div>
                                </Link>
                                <div className="user-profile-content">
                                  <div className="user-profile-name">
                                    <h6>
                                      {item?.name}
                                      <span>(Profile ID: {item?.id})</span>
                                    </h6>
                                    <p>
                                      {/* {item?.company_details?.designation != null ?  "at" : ""}  */}
                                      {/* {item.i_am === "individual" ? (item?.company_details?.name) : (item?.i_am)(item?.company_details?.name)}  */}
                                      {item?.company_details?.name}{" "}
                                    </p>
                                    <p>
                                      Product Category:
                                      <span>
                                        {item?.industry &&
                                          item?.industry.length > 0 &&
                                          item?.industry.map((it, ind) => {
                                            return (
                                              <>
                                                {ind === 0 ? " " : " , "}
                                                {it?.name}
                                              </>
                                            );
                                          })}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="btn-wrap">
                                    {sent?.items.filter(
                                      (word) => word === item?.id
                                    ).length > 0 ? (
                                      <button className="btn btn-success button-connect">
                                        <ConnectIcon />
                                        Request Sent
                                      </button>
                                    ) : (
                                      <button
                                        className="button button-primary button-connect"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          if (user?.verified_at === null) {
                                            // swal("error","Please verify your profile","error");
                                            sentConnectionRequest(item?.id);
                                          } else {
                                            sentConnectionRequest(item?.id);
                                          }
                                        }}
                                      >
                                        <ConnectIcon />
                                        Add Connection
                                      </button>
                                    )}

                                    {/* <button
                                      className="button button-primary button-connect"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if(user?.verified_at === null){
                                          swal("error","Please verify your profile","error");
                                          sentConnectionRequest(item?.id);

                                        }
                                        else{
                                          sentConnectionRequest(item?.id);

                                        }
                                      }}
                                    >
                                      <ConnectIcon />
                                      Add Connection
                                    </button> */}
                                    <CopyToClipboard
                                      text={`https://busimeet.com/edit-profile-seller/${item?.slug}`}
                                      onCopy={() => setShareLink(true)}
                                    >
                                      <button className="button button-secondary button-share">
                                        <ShareIcon />
                                      </button>
                                    </CopyToClipboard>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div className="card-footer">
                    {available?.has_more === true ? (
                      <span
                        className="seemore-link"
                        onClick={(e) => {
                          e.preventDefault();
                          let p = available_usersPage + 1;
                          setavailable_usersPage(p);
                        }}
                      >
                        See More <CaretDownIcon />
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="posts" ref={MarketUpdates}>
                <div className="posts-header">
                  <h6 id="section-1">Market Updates</h6>
                  <div className="tab-group">
                    <div className="tabs tabs--solid">
                      <ul>
                        <li className="active">
                          <Link to={""}>All</Link>
                        </li>
                        <li>
                          <Link to={""}>Sellers</Link>
                        </li>
                        <li>
                          <Link to={""}>Buyers</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="tabs tabs--solid">
                      <ul>
                        <li>
                          <Link to={""}>All</Link>
                        </li>
                        <li>
                          <Link to={""}>Social</Link>
                        </li>
                        <li>
                          <Link to={""}>Business</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a
                    className="collapse-button"
                    data-toggle="collapse"
                    href="#collapupdate"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapupdate"
                  >
                    <ArrowDownIcon />
                  </a>
                </div>

                <div className="posts-content collapse show" id="collapupdate">
                  {timeline?.items &&
                    timeline?.items.map((item, index) => {
                      return (
                        <>
                          {item?.type === "post_to_sell" ||
                          item?.type === "product" ? (
                            <>
                              <div
                                className="card post-seller"
                                ref={lastBookElementRef}
                                key={item}
                              >
                                <div className="card-body">
                                  <div className="user-profile">
                                    <Link
                                      to={`/edit-profile-seller/${item?.user?.slug}`}
                                    >
                                      <div className="user-profile-image">
                                        <img
                                          src={item?.user?.profile_image}
                                          className="profile-pic"
                                        />
                                      </div>
                                    </Link>
                                    <div className="user-profile-content">
                                      <Link
                                        to={`/edit-profile-seller/${item?.user?.slug}`}
                                      >
                                        <div className="user-profile-name">
                                          <h6>
                                            {item?.user?.name}
                                            <span>
                                              (Profile ID: {item?.user?.id})
                                            </span>
                                          </h6>
                                          <p>
                                            {item?.user?.company_details
                                              ?.designation != null
                                              ? "Partner" +
                                                item?.user?.company_details
                                                  ?.designation +
                                                "at"
                                              : " "}
                                            {item?.user?.company_details?.name}
                                          </p>
                                          <span className="post-tag">
                                            {item?.user?.is_buyer === 1
                                              ? "Buyer"
                                              : "Seller"}
                                          </span>

                                          {item?.user?.id === user?.id ? (
                                            ""
                                          ) : (
                                            <button
                                              className="button button-primary button-connect"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                if (
                                                  user?.verified_at === null
                                                ) {
                                                  swal(
                                                    "error",
                                                    "Please verify your profile",
                                                    "error"
                                                  );
                                                } else {
                                                  sentConnectionRequest(
                                                    item?.user?.id
                                                  );
                                                }
                                              }}
                                            >
                                              + Connect
                                            </button>
                                          )}
                                        </div>
                                      </Link>
                                    </div>
                                    <div className="posts-action">
                                      <div className="posts-time">
                                        <p>
                                          <HistoryIcon />7 Hours ago
                                        </p>
                                        <p>
                                          <EditIcon />2 Hours Ago
                                        </p>
                                      </div>
                                      {user?.id === item?.user?.id ? (
                                        " "
                                      ) : (
                                        <div className="more-btn">
                                          <div className="nav-item dropdown account-dropdown">
                                            <Link
                                              to={""}
                                              className="nav-link dropdown-toggle"
                                              href="#"
                                              id="navbarDropdown"
                                              role="button"
                                              data-toggle="dropdown"
                                              aria-haspopup="true"
                                              aria-expanded="false"
                                            >
                                              <MoreIcon />
                                            </Link>
                                            <div
                                              className="dropdown-menu"
                                              aria-labelledby="navbarDropdown"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                              >
                                                Report
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <p className="posts-summery">
                                    {item?.post_template?.content}
                                  </p>
                                  <div className="posts-product-details flex-box">
                                    <div className="flex-item posts-image-wrap">
                                      {item.media.length > 1 ? (
                                        <div className="posts-image">
                                          <Slider
                                            {...settingsPost}
                                            arrows={true}
                                          >
                                            {item.media.map((imagess) => (
                                              <img
                                                src={imagess.file}
                                                alt="productImage"
                                              />
                                            ))}
                                          </Slider>
                                        </div>
                                      ) : (
                                        <div className="posts-image">
                                          <a href="">
                                            <img
                                              src={item?.media[0]?.file}
                                              alt=""
                                            />
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-item posts-info-wrap">
                                      <div className="tags">
                                        <div className="tags--title">
                                          Product Details
                                        </div>
                                        <span className="tag">
                                          {item?.name}
                                        </span>
                                        {/* <span className="tag">{item?.name}</span> */}
                                        {item?.postable?.size && (
                                          <span className="tag">
                                            Size: {item?.size}
                                          </span>
                                        )}

                                        <span className="tag">
                                          Colour: Blue
                                        </span>
                                        {item?.material_type && (
                                          <span className="tag">
                                            Material: {item?.material_type}
                                          </span>
                                        )}
                                        <span className="tag">
                                          Brand: Stanley
                                        </span>
                                        {item?.product_code && (
                                          <span className="tag">
                                            Item Code: {item?.product_code}
                                          </span>
                                        )}
                                        {item?.shape && (
                                          <span className="tag">
                                            Shape: {item?.shape}
                                          </span>
                                        )}
                                        {item?.storage_capacity && (
                                          <span className="tag">
                                            Storage: {item?.storage_capacity}
                                          </span>
                                        )}
                                      </div>
                                      <div className="tags">
                                        <div className="tags--title">
                                          Pricing and Tax
                                        </div>
                                        {item?.amount && (
                                          <span className="tag">
                                            Advance Payment Price:{" "}
                                            {item?.amount} /-
                                          </span>
                                        )}
                                        {item?.credit_amount && (
                                          <span className="tag">
                                            Credit Payment Price:{" "}
                                            {item?.credit_amount}/-
                                          </span>
                                        )}
                                        <span className="attachment">
                                          <AttachmentIcon />
                                        </span>
                                        <span className="tag">
                                          HSN Code: {item?.hsn_code}
                                        </span>
                                        <span className="tag">
                                          GST: {item?.gst_rate}%
                                        </span>
                                      </div>
                                      <div className="tags">
                                        <div className="tags--title">
                                          Other Details
                                        </div>

                                        {item?.order_qty && (
                                          <span className="tag">
                                            MOQ: {item?.order_qty}Pcs
                                          </span>
                                        )}
                                        {item?.postable?.quality_standard && (
                                          <span className="tag">
                                            Quality Standard:{" "}
                                            {item?.quality_standard}
                                          </span>
                                        )}
                                        <span className="tag">
                                          Delivery Within State:{" "}
                                          {
                                            item?.delivery_details
                                              ?.delivery_outside_state
                                          }
                                        </span>
                                        <span className="tag">
                                          Delivery Outside State:{" "}
                                          {
                                            item?.delivery_details
                                              ?.delivery_within_state
                                          }
                                        </span>
                                        <span className="tag">
                                          <strong>Other Description:</strong>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item?.description,
                                            }}
                                          ></p>
                                        </span>
                                      </div>
                                      <ul>
                                        <li>
                                          <AttachmentIcon /> Product Catalogue
                                        </li>
                                        <li>
                                          Freight Charges{" "}
                                          {item?.freight_charges}%
                                        </li>
                                        {/* <li>Available In: Ahmedabad</li> */}
                                      </ul>
                                    </div>
                                    <div className="posts-data">
                                      <div className="posts-connections">
                                        {/*<span className='profiles'>
                            <img src={profilePic} className='profile-pic' />
                            <img src={profilePic} className='profile-pic' />
                            <img src={profilePic} className='profile-pic' />
                            <img src={profilePic} className='profile-pic' />
                          </span>*/}
                                        <span>
                                          <LikeIcon />
                                        </span>
                                        <span>
                                          {/* You and 20 Others */}
                                          {item?.interactions?.reactions}
                                        </span>
                                      </div>
                                      <div className="comments-deals">
                                        <span>
                                          {" "}
                                          {item?.interactions?.comments}
                                          Comments
                                        </span>
                                        <span>7 Cards Received</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="posts-activity">
                                    <div className="posts-activity-actions">
                                      <span className="posts-activity-actions--button reaction">
                                        {/* <span className="icon" onClick={(e) =>{

                                        // alert("ewpp" , e)
                                        // reaction(item?.id , "products")
                                      }}>
                                        <LikeIcon />
                                      </span> */}
                                        <span className="">
                                          <LikeIconFilled
                                            onClick={(e) => {
                                              if (user?.verified_at === null) {
                                                swal(
                                                  "error",
                                                  "Please verify Your profile ",
                                                  "error"
                                                );
                                              } else {
                                                if (
                                                  e.target.style.fill === ""
                                                ) {
                                                  e.target.style.fill =
                                                    "#0a95ff";
                                                  reaction(item?.id, "product");
                                                } else {
                                                  e.target.style.fill = "";
                                                }
                                              }
                                            }}
                                          />
                                        </span>
                                        <span className="posts-activity-actions--text">
                                          Like
                                        </span>
                                      </span>
                                      <span className="posts-activity-actions--button comment">
                                        <span className="icon">
                                          <CommentIcon />
                                        </span>
                                        <span className="icon-filled">
                                          <CommentIconFilled />
                                        </span>
                                        <span className="posts-activity-actions--text">
                                          Comment
                                        </span>
                                      </span>
                                      <span className="posts-activity-actions--button send-quote">
                                        <span className="icon">
                                          <AcceptDealIcon />
                                        </span>
                                        <span className="icon-filled">
                                          <AcceptDealIcon />
                                        </span>
                                        <span className="posts-activity-actions--text">
                                          Accept Deal
                                        </span>
                                      </span>
                                      <span className="posts-activity-actions--button meeting-room">
                                        <span className="icon">
                                          <NegotiationIcon />
                                        </span>
                                        <span className="icon-filled">
                                          <NegotiationIcon />
                                        </span>
                                        <span className="posts-activity-actions--text">
                                          Negotiation
                                        </span>
                                      </span>
                                      <span className="posts-activity-actions--button share">
                                        <span className="icon">
                                          <PostShareIcon />
                                        </span>
                                        <span className="icon-filled">
                                          <PostShareIconFilled />
                                        </span>
                                        <span className="posts-activity-actions--text">
                                          Share
                                        </span>
                                      </span>
                                    </div>
                                    <div className="add-comments">
                                      <form>
                                        <div className="add-comments--form">
                                          <div className="profile-image">
                                            <img
                                              src={user?.profile_image}
                                              className="profile-pic"
                                            />
                                          </div>
                                          <div className="comment-form">
                                            <div className="form-field">
                                              <input
                                                type="text"
                                                name="cname"
                                                id="cname"
                                                className="form-input"
                                                placeholder="Add Comment from below options"
                                                value={
                                                  CommentV?.comment_Id ===
                                                  item?.id
                                                    ? CommentV?.comment
                                                    : ""
                                                }
                                                onChange={(e) => {
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment: e.target.value,
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              />
                                              <button
                                                className="button button-primary"
                                                onClick={(e) => {
                                                  e.preventDefault();

                                                  if (
                                                    user?.verified_at === null
                                                  ) {
                                                    swal(
                                                      "error",
                                                      "Please verify your profile"
                                                    );
                                                  } else {
                                                    if (
                                                      CommentV?.comment === ""
                                                    ) {
                                                    } else {
                                                      Comment(
                                                        item?.id,
                                                        "product"
                                                      );
                                                    }
                                                  }
                                                }}
                                              >
                                                Post
                                              </button>
                                            </div>
                                            <div className="tags">
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "Interested, kindly connect !",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Interested, kindly connect !
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "Please provide product catalogue on email id:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Please provide product catalogue
                                                on email id:{" "}
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      " Please provide product catalogue on mobile number:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Please provide product catalogue
                                                on mobile number:{" "}
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "  Please send us price list on email id:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Please send us price list on
                                                email id:
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "  Pls send us price list on mobile number:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Pls send us price list on mobile
                                                number:{" "}
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "  Is this still available?",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Is this still available?
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : item?.type === "social_post" ? (
                            <div
                              className="card post-seller post-social"
                              ref={lastBookElementRef}
                              key={item}
                            >
                              <div className="card-body">
                                <div className="user-profile">
                                  <Link
                                    to={`/edit-profile-seller/${item?.user?.slug}`}
                                  >
                                    <div className="user-profile-image">
                                      <img
                                        src={item?.user?.profile_image}
                                        className="profile-pic"
                                      />
                                    </div>
                                  </Link>
                                  <div className="user-profile-content">
                                    <Link
                                      to={`/edit-profile-seller/${item?.user?.slug}`}
                                    >
                                      <div className="user-profile-name">
                                        <h6>
                                          {item?.user?.name}
                                          <span>
                                            (Profile ID: {item?.user?.id})
                                          </span>
                                        </h6>
                                        <p>
                                          {item?.user?.company_details
                                            ?.designation != null
                                            ? "Partner" +
                                              item?.user?.company_details
                                                ?.designation +
                                              "at"
                                            : " "}
                                          {item?.user?.company_details?.name}
                                        </p>
                                        <span className="post-tag">
                                          {item?.user?.is_buyer === 1
                                            ? "Buyer"
                                            : "Seller"}
                                        </span>
                                        {item?.user?.id === user?.id ? (
                                          ""
                                        ) : (
                                          <button
                                            className="button button-primary button-connect"
                                            onClick={(e) => {
                                              e.preventDefault();

                                              if (user?.verified_at === null) {
                                                swal(
                                                  "error",
                                                  "Please verify your profile",
                                                  "error"
                                                );
                                              } else {
                                                sentConnectionRequest(
                                                  item?.user?.id
                                                );
                                              }
                                            }}
                                          >
                                            + Connect
                                          </button>
                                        )}
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="posts-action">
                                    <div className="more-btn">
                                      <div className="nav-item dropdown account-dropdown">
                                        <a
                                          className="nav-link dropdown-toggle"
                                          href="#"
                                          id="navbarDropdown"
                                          role="button"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          <MoreIcon />
                                        </a>
                                        <div
                                          className="dropdown-menu"
                                          aria-labelledby="navbarDropdown"
                                        >
                                          <a className="dropdown-item" href="#">
                                            Report
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <p className="posts-summery">
                                  {item?.description}
                                  <a href="">@Shah Enterprise</a>,
                                  Congratulations one again.!
                                </p>
                                <div className="posts-product-details flex-box">
                                  <div className="flex-item social-post-image">
                                    <div className="posts-image">
                                      <a href="">
                                        <img src={PostImage2} alt="" />
                                      </a>
                                      <a href="">
                                        <img src={PostImage3} alt="" />
                                      </a>
                                      <a href="">
                                        <img
                                          src={item?.category?.icon}
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="posts-data">
                                    <div className="posts-connections">
                                      {/*<span className='profiles'>
                            <img src={profilePic} className='profile-pic' />
                            <img src={profilePic} className='profile-pic' />
                            <img src={profilePic} className='profile-pic' />
                            <img src={profilePic} className='profile-pic' />
                          </span>*/}
                                      <span>
                                        <LikeIcon />
                                      </span>
                                      <span>
                                        {" "}
                                        {item?.interactions?.reactions}
                                      </span>
                                    </div>
                                    <div className="comments-deals">
                                      <span>
                                        {" "}
                                        {item?.interactions?.comments} Comments
                                      </span>
                                      <span>7 Cards Received</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="posts-activity">
                                  <div className="posts-activity-actions">
                                    <span className="posts-activity-actions--button reaction">
                                      <span className="icon">
                                        <SocialReactIcon />
                                      </span>
                                      <span className="icon-filled">
                                        <SocialReactIcon />
                                      </span>
                                      <span className="posts-activity-actions--text">
                                        React
                                      </span>
                                    </span>
                                    <span className="posts-activity-actions--button reaction">
                                      <span className="">
                                        <LikeIconFilled
                                          onClick={(e) => {
                                            if (user?.verified_at === null) {
                                              swal(
                                                "error",
                                                "Please verify Your profile ",
                                                "error"
                                              );
                                            } else {
                                              if (e.target.style.fill === "") {
                                                e.target.style.fill = "#0a95ff";
                                                reaction(item?.id, "product");
                                              } else {
                                                e.target.style.fill = "";
                                              }
                                            }
                                          }}
                                        />
                                      </span>
                                      <span className="posts-activity-actions--text">
                                        Like
                                      </span>
                                    </span>
                                    <span className="posts-activity-actions--button comment">
                                      <span className="icon">
                                        <CommentIcon />
                                      </span>
                                      <span className="icon-filled">
                                        <CommentIconFilled />
                                      </span>
                                      <span className="posts-activity-actions--text">
                                        Comment
                                      </span>
                                    </span>
                                    <span className="posts-activity-actions--button send-card">
                                      <span className="icon">
                                        <CardIcon />
                                      </span>
                                      <span className="icon-filled">
                                        <CardIcon />
                                      </span>
                                      <span className="posts-activity-actions--text">
                                        Send Card
                                      </span>
                                    </span>
                                  </div>
                                  <div className="add-comments">
                                      <form>
                                        <div className="add-comments--form">
                                          <div className="profile-image">
                                            <img
                                              src={user?.profile_image}
                                              className="profile-pic"
                                            />
                                          </div>
                                          <div className="comment-form">
                                            <div className="form-field">
                                              <input
                                                type="text"
                                                name="cname"
                                                id="cname"
                                                className="form-input"
                                                placeholder="Add Comment from below options"
                                                value={
                                                  CommentV?.comment_Id ===
                                                  item?.id
                                                    ? CommentV?.comment
                                                    : ""
                                                }
                                                onChange={(e) => {
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment: e.target.value,
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              />
                                              <button
                                                className="button button-primary"
                                                onClick={(e) => {
                                                  e.preventDefault();

                                                  if (
                                                    user?.verified_at === null
                                                  ) {
                                                    swal(
                                                      "error",
                                                      "Please verify your profile"
                                                    );
                                                  } else {
                                                    if (
                                                      CommentV?.comment === ""
                                                    ) {
                                                    } else {
                                                      Comment(
                                                        item?.id,
                                                        "social_post"
                                                      );
                                                    }
                                                  }
                                                }}
                                              >
                                                Post
                                              </button>
                                            </div>
                                            <div className="tags">
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "Interested, kindly connect !",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Interested, kindly connect !
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "Please provide product catalogue on email id:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Please provide product catalogue
                                                on email id:{" "}
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      " Please provide product catalogue on mobile number:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Please provide product catalogue
                                                on mobile number:{" "}
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "  Please send us price list on email id:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Please send us price list on
                                                email id:
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "  Pls send us price list on mobile number:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Pls send us price list on mobile
                                                number:{" "}
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "  Is this still available?",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Is this still available?
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  
                                </div>
                              </div>
                            </div>
                          ) : item?.type === "post_to_buy" ? (
                            <div
                              className="card post-buyer"
                              ref={lastBookElementRef}
                              key={item}
                            >
                              <div className="card-body">
                                <div className="user-profile">
                                  <Link
                                    to={`/edit-profile-seller/${item?.user?.slug}`}
                                  >
                                    <div className="user-profile-image">
                                      <img
                                        src={item?.user?.profile_image}
                                        className="profile-pic"
                                      />
                                    </div>
                                  </Link>
                                  <div className="user-profile-content">
                                    <Link
                                      to={`/edit-profile-seller/${item?.user?.slug}`}
                                    >
                                      <div className="user-profile-name">
                                        <h6>
                                          {item?.user?.name}
                                          <span>
                                            (Profile ID: {item?.user?.id})
                                          </span>
                                        </h6>
                                        <p>
                                          {item?.user?.company_details
                                            ?.designation != null
                                            ? "Partner" +
                                              item?.user?.company_details
                                                ?.designation +
                                              "at"
                                            : " "}
                                          {item?.user?.company_details?.name}
                                        </p>
                                        <span className="post-tag">
                                          {item?.user?.is_buyer === 1
                                            ? "Buyer"
                                            : "Seller"}
                                        </span>

                                        {item?.user?.id === user?.id ? (
                                          ""
                                        ) : (
                                          <button
                                            className="button button-primary button-connect"
                                            onClick={(e) => {
                                              e.preventDefault();

                                              if (user?.verified_at === null) {
                                                swal(
                                                  "error",
                                                  "Please verify your profile",
                                                  "error"
                                                );
                                              } else {
                                                sentConnectionRequest(
                                                  item?.user?.id
                                                );
                                              }
                                            }}
                                          >
                                            + Connect
                                          </button>
                                        )}
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="posts-action">
                                    <div className="posts-time">
                                      <p>
                                        <HistoryIcon />7 Hours ago
                                      </p>
                                      <p>
                                        <EditIcon />2 Hours Ago
                                      </p>
                                    </div>
                                    {user?.id === item?.user?.id ? (
                                      " "
                                    ) : (
                                      <div className="more-btn">
                                        <div className="nav-item dropdown account-dropdown">
                                          <Link
                                            to={""}
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            id="navbarDropdown"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                          >
                                            <MoreIcon />
                                          </Link>
                                          <div
                                            className="dropdown-menu"
                                            aria-labelledby="navbarDropdown"
                                          >
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Report
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <p className="posts-summery">
                                  {item?.post_template?.content}
                                </p>
                                <div className="posts-product-details flex-box">
                                  <div className="flex-item posts-image-wrap">
                                    <div className="posts-image">
                                      {item.media.length > 1 ? (
                                        <div className="posts-image">
                                          <Slider
                                            {...settingsPost}
                                            arrows={true}
                                          >
                                            {item.media.map((imagess) => (
                                              <img src={imagess.file} alt="" />
                                            ))}

                                            <a href="">
                                              <img src={PostImage} alt="" />
                                            </a>
                                          </Slider>
                                        </div>
                                      ) : (
                                        <div className="posts-image">
                                          <a href="">
                                            <img
                                              src={item?.media[0]?.file}
                                              alt=""
                                            />
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-item posts-info-wrap">
                                    <div className="tags">
                                      <div className="tags--title">
                                        Product Details
                                      </div>
                                      <span className="tag">{item?.name}</span>
                                      {/* <span className="tag">6 mm to 32 mm</span> */}
                                      {/* <span className="tag">
                                        Application: bolt tightening
                                      </span> */}
                                      <span className="tag">
                                        Item code:{" "}
                                        {item?.product_code != null
                                          ? item?.product_code
                                          : "NA"}
                                      </span>
                                      <span className="tag">
                                        Brand : {item?.brand?.id}
                                      </span>
                                    </div>
                                    <div className="tags">
                                      <div className="tags--title">
                                        Other Product Provided By Seller
                                      </div>
                                      <span className="tag">MOQ: 10 pcs</span>
                                      <span className="tag">
                                        HSN Code:{" "}
                                        {item?.hsn_code != null
                                          ? item?.hsn_code
                                          : "NA"}
                                      </span>
                                      <span className="tag">Warranty: NO</span>
                                      <span className="tag">
                                        In stock: 500 pcs
                                      </span>
                                    </div>
                                    <div className="tags">
                                      <div className="tags--title">
                                        Price and Delivery Details
                                      </div>
                                      <span className="tag">
                                        Preferred Transport:{" "}
                                        {
                                          item?.delivery_details
                                            ?.preferred_transport
                                        }
                                      </span>
                                      <span className="tag">
                                        Required In city :
                                        {
                                          item?.delivery_details
                                            ?.required_in_city
                                        }
                                      </span>
                                      {/* <span className="tag">
                                        Delivery in state: 2 days
                                      </span>
                                      <span className="tag">
                                        Credit price: 1230/-
                                      </span> */}
                                    </div>
                                  </div>
                                  <div className="posts-data">
                                    <div className="posts-connections">
                                      {/*<span className='profiles'>
                            <img src={profilePic} className='profile-pic' />
                            <img src={profilePic} className='profile-pic' />
                            <img src={profilePic} className='profile-pic' />
                            <img src={profilePic} className='profile-pic' />
                          </span>*/}
                                      <span>
                                        <LikeIcon />
                                      </span>
                                      <span>
                                        {" "}
                                        {item?.interactions?.reactions}
                                      </span>
                                    </div>
                                    <div className="comments-deals">
                                      <span>
                                        {" "}
                                        {item?.interactions?.comments} Comments
                                      </span>
                                      <span>7 Cards Received</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="posts-activity">
                                  <div className="posts-activity-actions">
                                    <span className="posts-activity-actions--button reaction">
                                      <span className="icon">
                                        <LikeIconFilled
                                          onClick={(e) => {
                                            if (user?.verified_at === null) {
                                              swal(
                                                "error",
                                                "Please verify Your profile ",
                                                "error"
                                              );
                                            } else {
                                              if (e.target.style.fill === "") {
                                                e.target.style.fill = "#0a95ff";
                                                reaction(item?.id, "product");
                                              } else {
                                                e.target.style.fill = "";
                                              }
                                            }
                                          }}
                                        />
                                      </span>
                                      <span className="icon-filled">
                                        <LikeIconFilled
                                          onClick={(e) => {
                                            if (user?.verified_at === null) {
                                              swal(
                                                "error",
                                                "Please verify Your profile ",
                                                "error"
                                              );
                                            } else {
                                              if (e.target.style.fill === "") {
                                                e.target.style.fill = "#0a95ff";
                                                reaction(item?.id, "product");
                                              } else {
                                                e.target.style.fill = "";
                                              }
                                            }
                                          }}
                                        />
                                      </span>
                                      <span className="posts-activity-actions--text">
                                        Like
                                      </span>
                                      <div className="reaction-hover">
                                        <span>
                                          <ReactLikeIcon />
                                        </span>
                                        <span>
                                          <CelebrateIcon />
                                        </span>
                                        <span>
                                          <CareIcon />
                                        </span>
                                        <span>
                                          <LoveIcon />
                                        </span>
                                        <span>
                                          <InsightfulIcon />
                                        </span>
                                        <span>
                                          <CuriousIcon />
                                        </span>
                                      </div>
                                    </span>
                                    <span className="posts-activity-actions--button comment">
                                      <span className="icon">
                                        <CommentIcon />
                                      </span>
                                      <span className="icon-filled">
                                        <CommentIconFilled />
                                      </span>
                                      <span className="posts-activity-actions--text">
                                        Comment
                                      </span>
                                    </span>
                                    <span className="posts-activity-actions--button comment">
                                      <span className="icon">
                                        <SendQuoteIcon />
                                      </span>
                                      <span className="icon-filled">
                                        <SendQuoteIcon />
                                      </span>
                                      <span className="posts-activity-actions--text">
                                        Send Quote
                                      </span>
                                    </span>
                                    <span className="posts-activity-actions--button meeting-room">
                                      <Link to={"/chat-room"}>
                                        <span className="icon">
                                          <MeetingRoomIcon />
                                        </span>
                                        <span className="icon-filled">
                                          <MeetingRoomIconFilled />
                                        </span>
                                        <span className="posts-activity-actions--text">
                                          Meeting Room
                                        </span>
                                      </Link>
                                    </span>
                                    <span className="posts-activity-actions--button share">
                                      <span className="icon">
                                        <PostShareIcon />
                                      </span>
                                      <span className="icon-filled">
                                        <PostShareIconFilled />
                                      </span>
                                      <span className="posts-activity-actions--text">
                                        Share
                                      </span>
                                    </span>
                                  </div>
                                  <div className="add-comments">
                                      <form>
                                        <div className="add-comments--form">
                                          <div className="profile-image">
                                            <img
                                              src={user?.profile_image}
                                              className="profile-pic"
                                            />
                                          </div>
                                          <div className="comment-form">
                                            <div className="form-field">
                                              <input
                                                type="text"
                                                name="cname"
                                                id="cname"
                                                className="form-input"
                                                placeholder="Add Comment from below options"
                                                value={
                                                  CommentV?.comment_Id ===
                                                  item?.id
                                                    ? CommentV?.comment
                                                    : ""
                                                }
                                                onChange={(e) => {
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment: e.target.value,
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              />
                                              <button
                                                className="button button-primary"
                                                onClick={(e) => {
                                                  e.preventDefault();

                                                  if (
                                                    user?.verified_at === null
                                                  ) {
                                                    swal(
                                                      "error",
                                                      "Please verify your profile"
                                                    );
                                                  } else {
                                                    if (
                                                      CommentV?.comment === ""
                                                    ) {
                                                    } else {
                                                      Comment(
                                                        item?.id,
                                                        "product"
                                                      );
                                                    }
                                                  }
                                                }}
                                              >
                                                Post
                                              </button>
                                            </div>
                                            <div className="tags">
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "Interested, kindly connect !",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Interested, kindly connect !
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "Please provide product catalogue on email id:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Please provide product catalogue
                                                on email id:{" "}
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      " Please provide product catalogue on mobile number:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Please provide product catalogue
                                                on mobile number:{" "}
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "  Please send us price list on email id:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Please send us price list on
                                                email id:
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "  Pls send us price list on mobile number:",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Pls send us price list on mobile
                                                number:{" "}
                                              </span>
                                              <span
                                                className="tag"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment:
                                                      "  Is this still available?",
                                                  }));
                                                  setComment((p) => ({
                                                    ...p,
                                                    comment_Id: item?.id,
                                                  }));
                                                }}
                                              >
                                                Is this still available?
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  {/* <div className="posts-comments">
                                    <div className="comment-item">
                                      <div className="user-profile">
                                        <div className="user-profile-image">
                                          <img
                                            src={user?.profile_image}
                                            className="profile-pic"
                                          />
                                        </div>
                                        <div className="comment-content">
                                          <div className="comment-meta">
                                            <div className="user-profile-content">
                                              <div className="user-profile-name">
                                                <h6>
                                                  Ravi Panchal
                                                  <span>
                                                    (Profile ID: 302101)
                                                  </span>
                                                </h6>
                                                <p>Partner at Mehta Brothers</p>
                                              </div>
                                            </div>
                                            <div className="posts-action">
                                              <div className="posts-time">
                                                <p>
                                                  <HistoryIcon />7 Hours ago
                                                </p>
                                              </div>
                                              {user?.id === item?.user?.id ? (
                                                " "
                                              ) : (
                                                <div className="more-btn">
                                                  <div className="nav-item dropdown account-dropdown">
                                                    <Link
                                                      to={""}
                                                      className="nav-link dropdown-toggle"
                                                      href="#"
                                                      id="navbarDropdown"
                                                      role="button"
                                                      data-toggle="dropdown"
                                                      aria-haspopup="true"
                                                      aria-expanded="false"
                                                    >
                                                      <MoreIcon />
                                                    </Link>
                                                    <div
                                                      className="dropdown-menu"
                                                      aria-labelledby="navbarDropdown"
                                                    >
                                                      <a
                                                        className="dropdown-item"
                                                        href="#"
                                                      >
                                                        Report
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <div className="comment-text">
                                            <p>
                                              Hello ! We have the below product
                                              available with us at the best
                                              rates and as per mentioned
                                              description. If you require this
                                              product, kindly connect with us
                                              with your requirement. Thank you.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="comment-actions">
                                        <span className="comment-actions--button reaction">
                                          <span className="icon">
                                            <LikeIcon />
                                          </span>
                                          <span className="icon-filled">
                                            <LikeIconFilled />
                                          </span>
                                          <span className="comment-actions--text">
                                            Like
                                          </span>
                                        </span>
                                        <span className="comment-actions--button comment">
                                          <span className="icon">
                                            <CommentIcon />
                                          </span>
                                          <span className="icon-filled">
                                            <CommentIconFilled />
                                          </span>
                                          <span className="comment-actions--text">
                                            Comment
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="posts-comments-footer">
                                    <a href="" className="seemore-link">
                                      Load more comments <CaretDownIcon />
                                    </a>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
            <RightSideBar />
          </div>
        </div>
      </div>
      <PostSocialModal data={data?.dataa?.data} UpdateTrue={UpdateTrue} />
      <VerifyModal />
      <VerifyGSTModal />
    </>
  );
}

export default Home;
