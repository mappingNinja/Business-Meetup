import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as CaretDownIcon } from "../assets/images/caret-down.svg";
import { ReactComponent as SocialReactIcon } from "../assets/images/social-react.svg";
import { ReactComponent as CardIcon } from "../assets/images/card-icon.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../common/scss/pages/home.scss";
import "../common/scss/pages/request.scss";
import profilePic from "../assets/images/profile.png";
import { ReactComponent as ArrowDownIcon } from "../assets/images/arrow-down.svg";
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
import { ReactComponent as MoreIcon } from "../assets/images/more-icon.svg";
import { ReactComponent as AttachmentIcon } from "../assets/images/attachment.svg";
import Header from "../common/header";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../libs/auth";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import { get, getAuthConfig } from "../libs/http-hydrate";
import swal from "sweetalert";
const MyPost = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState({
    items: [],
    has_more: false
  });

  const [sellPage, setSellPage] = useState(0);
  const [buyPage, setbuyPage] = useState(0);
  const [SocialPage, setSocialPage] = useState(0);
  const [PostPage, setPostPage] = useState(0);
  const settingsPost = {
    arrows: true,
    dots: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const user = Auth.getCurrentUser();
  const [filter, setFilter] = useState({
    filterValue: ""
  });
  console.log(filter.filterValue, "filter");
  UseEffectOnce(() => {
    fetchAuthPost();
  }, [filter.filterValue]);

  useEffect(() => {
    if (PostPage === 0) {
    } else {
      fetchAuthPost();
    }
  }, [PostPage]);

  useEffect(() => {
    if (sellPage === 0) {
    } else {
      fetchSell();
    }
  }, [sellPage]);
  useEffect(() => {
    if (buyPage === 0) {
    } else {
      fetchBuy();
    }
  }, [buyPage]);
  useEffect(() => {
    if (SocialPage === 0) {
    } else {
      fetchSocial();
    }
  }, [SocialPage]);

  useEffect(() => {
    if (filter.filterValue === "post_to_sell") {
      fetchSell();
    } else if (filter.filterValue === "post_to_buy") {
      fetchBuy();
    } else if (filter.filterValue === "social_post") {
      fetchSocial();
    } 
  }, [filter?.filterValue]);

  const fetchAuthPost = async () => {
    setLoading(true);

    await get(`/my_posts?page=${PostPage + 1}`, getAuthConfig())
      .then((res) => {
        setLoading(false);
        if (PostPage === 0) {
          posts?.items.splice(0, posts?.items.length);

          setPosts((p) => ({
            ...p,
            items: res?.data?.data?.items
          }));
        } else {
          setPosts((p) => ({
            ...p,
            items: posts.items.concat(res?.data?.data?.items)
          }));
        }
        setPosts((p) => ({
          ...p,
          items: posts.items.concat(res?.data?.data?.items)
        }));
        setPosts((p) => ({ ...p, has_more: res?.data?.data?.has_more }));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const fetchSell = async () => {
    setLoading(true);
    await get(
      `/my_posts?page=${sellPage + 1}&type=${filter?.filterValue}`,
      getAuthConfig()
    )
      .then((res) => {
        setLoading(false);
        if (sellPage === 0) {
          posts?.items.splice(0, posts?.items.length);

          setPosts((p) => ({
            ...p,
            items: res?.data?.data?.items
          }));
        } else {
          setPosts((p) => ({
            ...p,
            items: posts.items.concat(res?.data?.data?.items)
          }));
        }

        setPosts((p) => ({ ...p, has_more: res?.data?.data?.has_more }));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const fetchSocial = async () => {
    setLoading(true);
    await get(
      `/my_posts?page=${SocialPage + 1}&type=${filter?.filterValue}`,
      getAuthConfig()
    )
      .then((res) => {
        setLoading(false);
        if (SocialPage === 0) {
          posts?.items.splice(0, posts?.items.length);

          setPosts((p) => ({
            ...p,
            items: res?.data?.data?.items
          }));
        } else {
          setPosts((p) => ({
            ...p,
            items: posts.items.concat(res?.data?.data?.items)
          }));
        }

        setPosts((p) => ({ ...p, has_more: res?.data?.data?.has_more }));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const fetchBuy = async () => {
    setLoading(true);
    await get(
      `/my_posts?page=${buyPage + 1}&type=${filter?.filterValue}`,
      getAuthConfig()
    )
      .then((res) => {
        setLoading(false);

        if (buyPage === 0) {
          posts?.items.splice(0, posts?.items.length);

          setPosts((p) => ({
            ...p,
            items: res?.data?.data?.items
          }));
        } else {
          setPosts((p) => ({
            ...p,
            items: posts.items.concat(res?.data?.data?.items)
          }));
        }

        setPosts((p) => ({ ...p, has_more: res?.data?.data?.has_more }));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      // if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && posts?.has_more) {
          if (filter.filterValue === "post_to_sell") {
            setSellPage((prevPageNumber) => prevPageNumber + 1);
          } else if (filter.filterValue === "post_to_buy") {
            setbuyPage((prevPageNumber) => prevPageNumber + 1);
          } else if (filter.filterValue === "social_post") {
            setSocialPage((prevPageNumber) => prevPageNumber + 1);
          } else if (filter.filterValue === "") {
            setPostPage((prevPageNumber) => prevPageNumber + 1);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [posts?.has_more]
  );

  const handleDeletePost = async (id) => {
    await get(`/product/delete/${id}`, getAuthConfig())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchAuthPost();
  };

  const handleDeleteSocial = async (id) => {
    await get(`/social_post/destroy/${id}`, getAuthConfig())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchAuthPost();
  };

  console.log("posts?.items", posts?.items);
  const navigate = useNavigate();
  return (
    <>
      <Header home />

      <div className="grey-bg">
        <div className="container-fluid">
          <div className="layout-grid-box">
            <LeftSideBar />
            <div className="layout-grid">
              <div className="posts">
                <div className="posts-header">
                  <h6>My Posts</h6>
                  <div className="tab-group">
                    <div className="tabs tabs--solid">
                      <ul>
                        <li
                          className={filter?.filterValue === "" ? "active" : ""}
                        >
                          <Link
                            to={""}
                            onClick={(e) => {
                              e.preventDefault();
                              setFilter((p) => ({
                                ...filter,
                                filterValue: ""
                              }));
                            }}
                          >
                            All
                          </Link>
                        </li>
                        <li
                          className={
                            filter?.filterValue === "post_to_sell"
                              ? "active"
                              : ""
                          }
                        >
                          <Link
                            to={""}
                            onClick={(e) => {
                              e.preventDefault();
                              setFilter((p) => ({
                                ...filter,
                                filterValue: "post_to_sell"
                              }));
                            }}
                          >
                            Post to Sell
                          </Link>
                        </li>
                        <li
                          className={
                            filter?.filterValue === "post_to_buy"
                              ? "active"
                              : ""
                          }
                        >
                          <Link
                            to={""}
                            onClick={(e) => {
                              e.preventDefault();
                              setFilter((p) => ({
                                ...filter,
                                filterValue: "post_to_buy"
                              }));
                            }}
                          >
                            Post to Buy
                          </Link>
                        </li>
                        <li
                          className={
                            filter?.filterValue === "social_post"
                              ? "active"
                              : ""
                          }
                        >
                          <Link
                            to={""}
                            onClick={(e) => {
                              e.preventDefault();
                              setFilter((p) => ({
                                ...filter,
                                filterValue: "social_post"
                              }));
                            }}
                          >
                            Post to Social
                          </Link>
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
                  {posts?.items &&
                    posts?.items.length > 0 &&
                    posts?.items.map((item) => {
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
                                          alt="profileImg"
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
                                            {item?.type === "post_to_sell" &&
                                              "Seller"}
                                          </span>

                                          {item?.user?.id === user?.id ? (
                                            ""
                                          ) : (
                                            <button
                                              className="button button-primary button-connect"
                                              onClick={(e) => {
                                                e.preventDefault();
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
                                          <div className="dropdown-menu">
                                            <button
                                              className="dropdown-item"
                                              onClick={() =>
                                                navigate("/edit-product", {
                                                  state: item
                                                })
                                              }
                                            >
                                              Edit
                                            </button>
                                            <button
                                              className="dropdown-item"
                                              onClick={() => {
                                                // e.preventDefault();
                                                handleDeletePost(item?.id);
                                              }}
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <p
                                    className="posts-summery"
                                    dangerouslySetInnerHTML={{
                                      __html: item?.post_template?.content
                                    }}
                                  ></p>
                                  <div className="posts-product-details flex-box">
                                    <div className="flex-item posts-image-wrap">
                                      <div className="posts-image">
                                        <a href="">
                                          <img
                                            src={item?.media[0]?.file}
                                            alt=""
                                          />
                                        </a>
                                      </div>
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
                                              __html: item?.description
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
                                        <span>You and 20 Others</span>
                                      </div>
                                      <div className="comments-deals">
                                        <span>26 Comments</span>
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
                                              if (e.target.style.fill === "") {
                                                e.target.style.fill = "#0a95ff";
                                                // reaction(item?.id, "products");
                                              } else {
                                                e.target.style.fill = "";
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
                                              src={profilePic}
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
                                              />
                                              <button
                                                className="button button-primary"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                }}
                                              >
                                                Post
                                              </button>
                                            </div>
                                            <div className="tags">
                                              <span className="tag">
                                                Interested, kindly connect !
                                              </span>
                                              <span className="tag">
                                                Please provide product catalogue
                                                on email id:{" "}
                                              </span>
                                              <span className="tag">
                                                Please provide product catalogue
                                                on mobile number:{" "}
                                              </span>
                                              <span className="tag">
                                                Please send us price list on
                                                email id:
                                              </span>
                                              <span className="tag">
                                                Pls send us price list on mobile
                                                number:{" "}
                                              </span>
                                              <span className="tag">
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
                            <>
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
                                          alt=""
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
                                            {item?.type === "social_post" &&
                                            item.user.is_buyer === 1
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
                                            <button
                                              className="dropdown-item"
                                              // href="#"
                                            >
                                              Edit
                                            </button>
                                            <button
                                              className="dropdown-item"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleDeleteSocial(item?.id);
                                              }}
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <p className="posts-summery">
                                    {item?.description}
                                    {/* <a href="">@Shah Enterprise</a>,
                                    Congratulations one again.! */}
                                  </p>
                                  <div className="posts-product-details flex-box">
                                    <div className="flex-item social-post-image">
                                      <div className="posts-image">
                                        {/* <a href=""> */}
                                        <img src={item.media} alt="" />
                                        {/* </a> */}
                                        {/* <a href=""> */}
                                        {/* <img src={PostImage3} alt="" /> */}
                                        {/* </a> */}
                                        {/* <a href=""> */}
                                        <img
                                          src={item?.category?.icon}
                                          alt=""
                                        />
                                        {/* </a> */}
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
                                        <span>You and 20 Others</span>
                                      </div>
                                      <div className="comments-deals">
                                        <span>26 Comments</span>
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
                                              if (e.target.style.fill === "") {
                                                e.target.style.fill = "#0a95ff";
                                                // reaction(item?.id, "products");
                                              } else {
                                                e.target.style.fill = "";
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
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : item?.type === "post_to_buy" ? (
                            <>
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
                                          alt="profileImg"
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
                                            {item?.type === "post_to_buy"
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
                                              <button
                                                className="dropdown-item"
                                                onClick={() =>
                                                  navigate("/edit-product", {
                                                    state: item
                                                  })
                                                }
                                              >
                                                Edit
                                              </button>
                                              <button
                                                className="dropdown-item"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  handleDeletePost(item?.id);
                                                }}
                                              >
                                                Delete
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <p
                                    className="posts-summery"
                                    // dangerouslySetInnerHTML={{
                                    //   _html: item?.post_template?.content
                                    // }}
                                  >
                                    {item?.post_template?.content}
                                  </p>
                                  <div className="posts-product-details flex-box">
                                    <div className="flex-item posts-image-wrap">
                                      <div className="posts-image">
                                        <div className="posts-image">
                                          <a href="">
                                            <img
                                              src={item?.media[0]?.file}
                                              alt=""
                                            />
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex-item posts-info-wrap">
                                      <div className="tags">
                                        <div className="tags--title">
                                          Product Details
                                        </div>
                                        <span className="tag">
                                          {item?.name}
                                        </span>
                                        <span className="tag">
                                          Size: {item?.size}
                                        </span>
                                        <span className="tag">
                                          Colour: Blue
                                        </span>
                                        {item?.product_code && (
                                          <span className="tag">
                                            Item Code: {item?.product_code}
                                          </span>
                                        )}
                                        <span className="tag">
                                          Brand : Stanley
                                        </span>
                                      </div>
                                      <div className="tags">
                                        <div className="tags--title">
                                          Other Product Provided By Seller
                                        </div>
                                        <span className="tag">MOQ: 10 pcs</span>
                                        <span className="tag">
                                          HSN Code: {item?.hsn_code}
                                        </span>
                                        <span className="tag">
                                          Warranty: NO
                                        </span>
                                        <span className="tag">
                                          In stock: 500 pcs
                                        </span>
                                      </div>
                                      <div className="tags">
                                        <div className="tags--title">
                                          Price and Delivery Details
                                        </div>
                                        <span className="tag">
                                          Cash Price: 1200/-
                                        </span>
                                        <span className="tag">
                                          Delivery Outside State:{" "}
                                          {
                                            item?.delivery_details
                                              ?.delivery_within_state
                                          }
                                        </span>
                                        <span className="tag">
                                          Delivery Within State:{" "}
                                          {
                                            item?.delivery_details
                                              ?.delivery_outside_state
                                          }
                                        </span>
                                        {item?.credit_amount && (
                                          <span className="tag">
                                            Credit Payment Price:{" "}
                                            {item?.credit_amount}/-
                                          </span>
                                        )}
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
                                        <span>You and 20 Others</span>
                                      </div>
                                      <div className="comments-deals">
                                        <span>26 Comments</span>
                                        <span>7 Cards Received</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="posts-activity">
                                    <div className="posts-activity-actions">
                                      <span className="posts-activity-actions--button reaction">
                                        <span className="">
                                          <LikeIconFilled
                                            onClick={(e) => {
                                              if (e.target.style.fill === "") {
                                                e.target.style.fill = "#0a95ff";
                                                // reaction(item?.id, "products");
                                              } else {
                                                e.target.style.fill = "";
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
                                        <span className="icon">
                                          <MeetingRoomIcon />
                                        </span>
                                        <span className="icon-filled">
                                          <MeetingRoomIconFilled />
                                        </span>
                                        <span className="posts-activity-actions--text">
                                          Meeting Room
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
                                    <div className="posts-comments">
                                      <div className="comment-item">
                                        <div className="user-profile">
                                          <div className="user-profile-image">
                                            <img
                                              src={profilePic}
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
                                                  <p>
                                                    Partner at Mehta Brothers
                                                  </p>
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
                                                          Edit
                                                        </a>
                                                        <a
                                                          className="dropdown-item"
                                                          onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeletePost(
                                                              item?.id
                                                            );
                                                          }}
                                                        >
                                                          Delete
                                                        </a>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            <div className="comment-text">
                                              <p>
                                                Hello ! We have the below
                                                product available with us at the
                                                best rates and as per mentioned
                                                description. If you require this
                                                product, kindly connect with us
                                                with your requirement. Thank
                                                you.
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}

                  {/* --------------------------------- */}
                  {/* <div className="card post-buyer">
                    <div className="card-body">
                      <div className="user-profile">
                        <div className="user-profile-image">
                          <img src={profilePic} className="profile-pic" />
                        </div>
                        <div className="user-profile-content">
                          <div className="user-profile-name">
                            <h6>
                              Ravi Panchal
                              <span>(Profile ID: 302102)</span>
                            </h6>
                            <p>Partner at Mehta Brothers</p>
                            <span className="post-tag">Buyer</span>
                          </div>
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
                        Hello ! We have the below product available with us at
                        the best rates and as per mentioned description. If you
                        require this product, kindly connect with us with your
                        requirement. Thank you.
                      </p>
                      <div className="posts-product-details flex-box">
                        <div className="flex-item posts-image-wrap">
                          <div className="posts-image">
                            <Slider {...settingsPost}>
                              <a href="">
                                <img src={PostImage} alt="" />
                              </a>
                              <a href="">
                                <img src={PostImage} alt="" />
                              </a>
                            </Slider>
                          </div>
                        </div>
                        <div className="flex-item posts-info-wrap">
                          <div className="tags">
                            <div className="tags--title">Product Details</div>
                            <span className="tag">Spanner Set</span>
                            <span className="tag">6 mm to 32 mm</span>
                            <span className="tag">
                              Application: bolt tightening
                            </span>
                            <span className="tag">
                              Item code: 62-312, High chrome finish
                            </span>
                            <span className="tag">Brand : Stanley</span>
                          </div>
                          <div className="tags">
                            <div className="tags--title">
                              Other Product Provided By Seller
                            </div>
                            <span className="tag">MOQ: 10 pcs</span>
                            <span className="tag">HSN Code: 820412</span>
                            <span className="tag">Warranty: NO</span>
                            <span className="tag">In stock: 500 pcs</span>
                          </div>
                          <div className="tags">
                            <div className="tags--title">
                              Price and Delivery Details
                            </div>
                            <span className="tag">Cash Price: 1200/-</span>
                            <span className="tag">
                              Delivery other state: 7 days
                            </span>
                            <span className="tag">
                              Delivery in state: 2 days
                            </span>
                            <span className="tag">Credit price: 1230/-</span>
                            <span className="tag">Available in Ahmedabad</span>
                          </div>
                        </div>
                        <div className="posts-data">
                          <div className="posts-connections">
                            <span>
                              <LikeIcon />
                            </span>
                            <span>You and 20 Others</span>
                          </div>
                          <div className="comments-deals">
                            <span>26 Comments</span>
                            <span>7 Cards Received</span>
                          </div>
                        </div>
                      </div>

                      <div className="posts-activity">
                        
                        <div className="posts-comments">
                          <div className="comment-item">
                            <div className="user-profile">
                              <div className="user-profile-image">
                                <img src={profilePic} className="profile-pic" />
                              </div>
                              <div className="comment-content">
                                <div className="comment-meta">
                                  <div className="user-profile-content">
                                    <div className="user-profile-name">
                                      <h6>
                                        Ravi Panchal
                                        <span>(Profile ID: 302101)</span>
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
                                <div className="comment-text">
                                  <p>
                                    Hello ! We have the below product available
                                    with us at the best rates and as per
                                    mentioned description. If you require this
                                    product, kindly connect with us with your
                                    requirement. Thank you.
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card post-seller post-social">
                    <div className="card-body">
                      <div className="user-profile">
                        <div className="user-profile-image">
                          <img src={profilePic} className="profile-pic" />
                        </div>
                        <div className="user-profile-content">
                          <div className="user-profile-name">
                            <h6>
                              Ravi Panchal
                              <span>(Profile ID: 302101)</span>
                            </h6>
                            <p>Partner at Mehta Brothers</p>
                            <span className="post-tag">Seller</span>
                          </div>
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
                        We congratulate Shah Enterprise for their award for best
                        dealer in customer segment category for 2021.
                        <a href="">@Shah Enterprise</a>, Congratulations one
                        again.!
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
                              <img src={PostImage4} alt="" />
                            </a>
                          </div>
                        </div>
                        <div className="posts-data">
                          <div className="posts-connections">
                            <span>
                              <LikeIcon />
                            </span>
                            <span>You and 20 Others</span>
                          </div>
                          <div className="comments-deals">
                            <span>26 Comments</span>
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
                            <span className="icon">
                              <LikeIcon />
                            </span>
                            <span className="icon-filled">
                              <LikeIconFilled />
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
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPost;
