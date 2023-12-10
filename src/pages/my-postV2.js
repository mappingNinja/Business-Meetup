import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../common/scss/pages/home.scss";
import "../common/scss/pages/request.scss";
import profilePic from "../assets/images/profile.png";
import CoverBg from "../assets/images/cover-bg.jpg";
import PostImage from "../assets/images/post-image.jpg";
import PostImage2 from "../assets/images/social1.jpg";
import PostImage3 from "../assets/images/social2.jpg";
import PostImage4 from "../assets/images/social3.jpg";
import { ReactComponent as CaretDownIcon } from "../assets/images/caret-down.svg";
import { ReactComponent as HeartFilledIcon } from "../assets/images/heart-filled.svg";
import { ReactComponent as MyTransactionIcon } from "../assets/images/my-transaction-icon.svg";
import { ReactComponent as FormIcon } from "../assets/images/form-icon.svg";
import { ReactComponent as MyNetworkIcon } from "../assets/images/my-network-icon.svg";
import { ReactComponent as PendingIcon } from "../assets/images/pending-icon.svg";
import { ReactComponent as ManageAccountIcon } from "../assets/images/manage-account-icon.svg";
import { ReactComponent as MyPostIcon } from "../assets/images/my-post-icon.svg";
import TeslaIcon from "../assets/images/tesla-icon.jpg";
import { ReactComponent as ConnectIcon } from "../assets/images/connect-icon.svg";
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
import { ReactComponent as SocialReactIcon } from "../assets/images/social-react.svg";
import { ReactComponent as CardIcon } from "../assets/images/card-icon.svg";
import { ReactComponent as MoreIcon } from "../assets/images/more-icon.svg";
import { ReactComponent as AttachmentIcon } from "../assets/images/attachment.svg";
import Header from "../common/header";
import { Link, useNavigate } from "react-router-dom";
function MyPost() {
  const settingsPost = {
    arrows: true,
    dots: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Header home />

      <div className="grey-bg">
        <div className="container-fluid">
          <div className="layout-grid-box">
            <div className="layout-grid layout-grid--left">
              <div className="card card-profile">
                <div className="card-inner">
                  <div className="card-body">
                    <div className="card-profile-image">
                      <div className="profile-bg">
                        <img src={CoverBg} className="profile-pic" />
                      </div>
                      <div className="profile-main">
                        <img src={profilePic} className="profile-pic" />
                      </div>
                    </div>
                    <div className="profile-name">
                      <h6>Chirag Patel</h6>
                      <p className="profile-bio">
                        “Hi! I’m Chris Moran – I’m the founder of Instinctual
                        Balance, and I absolutely love what I do.
                      </p>
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
            </div>
            <div className="layout-grid">
              <div className="posts">
                <div className="posts-header">
                  <h6>My Posts</h6>
                  <div className="tab-group">
                    <div className="tabs tabs--solid">
                      <ul>
                        <li className="active">
                          <Link to={""}>All</Link>
                        </li>
                        <li>
                          <Link to={""}>Post to Sell</Link>
                        </li>
                        <li>
                          <Link to={""}>Post to Buy</Link>
                        </li>
                        <li>
                          <Link to={""}>Post to Social</Link>
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
                  <div className="card post-seller">
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
                      <div className="posts-product-details flex-box">
                        <div className="flex-item posts-image-wrap">
                          <div className="posts-image">
                            <a href="">
                              <img src={PostImage} alt="" />
                            </a>
                          </div>
                        </div>
                        <div className="flex-item posts-info-wrap">
                          <div className="tags">
                            <div className="tags--title">Product Details</div>
                            <span className="tag">Size:</span>
                            <span className="tag">Colour: Blue</span>
                            <span className="tag">Material:</span>
                            <span className="tag">Brand: Stanley</span>
                            <span className="tag">Item Code:</span>
                            <span className="tag">Shape:</span>
                            <span className="tag">Storage:</span>
                          </div>
                          <div className="tags">
                            <div className="tags--title">Pricing and Tax</div>
                            <span className="tag">
                              Advance Payment Price: 1100/-
                            </span>
                            <span className="tag">
                              Credit Payment Price: 3200/-
                            </span>
                            <span className="attachment">
                              <AttachmentIcon />
                            </span>
                            <span className="tag">HSN Code:</span>
                            <span className="tag">GST: 18%</span>
                          </div>
                          <div className="tags">
                            <div className="tags--title">Other Details</div>
                            <span className="tag">MOQ: 1Pcs</span>
                            <span className="tag">Quality Standard:</span>
                            <span className="tag">
                              Delivery Within State: 5days
                            </span>
                            <span className="tag">
                              Delivery Outside State: 7days
                            </span>
                          </div>
                          <ul>
                            <li>
                              <AttachmentIcon /> Product Catalogue
                            </li>
                            <li>Freight Charges 2%</li>
                          </ul>
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
                                <img src={profilePic} className="profile-pic" />
                              </div>
                              <div className="comment-form">
                                <div className="form-field">
                                  <input
                                    type="text"
                                    name="cname"
                                    id="cname"
                                    className="form-input"
                                    placeholder="Add Comment from below options"
                                    readOnly
                                  />
                                  <button className="button button-primary">
                                    Post
                                  </button>
                                </div>
                                <div className="tags">
                                  <span className="tag">
                                    Interested, kindly connect !
                                  </span>
                                  <span className="tag">
                                    Please provide product catalogue on email
                                    id:{" "}
                                  </span>
                                  <span className="tag">
                                    Please provide product catalogue on mobile
                                    number:{" "}
                                  </span>
                                  <span className="tag">
                                    Please send us price list on email id:
                                  </span>
                                  <span className="tag">
                                    Pls send us price list on mobile number:{" "}
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
                  <div className="card post-buyer">
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
                        <div className="posts-activity-actions">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-grid layout-grid--right">
              <div className="card">
                <div className="card-inner">
                  <div className="card-header">
                    <h6>Suggested Seller</h6>
                    <a href="">View All</a>
                  </div>
                  <div className="card-body pt-0">
                    <div className="card-lists">
                      <div className="card-lists-item user-profile">
                        <div className="user-profile-image">
                          <img src={profilePic} className="profile-pic" />
                        </div>
                        <div className="user-profile-content">
                          <div className="user-profile-name">
                            <h6>Ravi Panchal</h6>
                            <p>
                              <img src={TeslaIcon} />
                              Tesla
                            </p>
                          </div>
                          <button className="button button-primary button-connect">
                            <ConnectIcon />
                            Connect
                          </button>
                        </div>
                      </div>
                      <div className="card-lists-item user-profile">
                        <div className="user-profile-image">
                          <img src={profilePic} className="profile-pic" />
                        </div>
                        <div className="user-profile-content">
                          <div className="user-profile-name">
                            <h6>Harry Mark</h6>
                            <p>
                              <img src={TeslaIcon} />
                              Tesla
                            </p>
                          </div>
                          <button className="button button-primary button-connect">
                            <ConnectIcon />
                            Connect
                          </button>
                        </div>
                      </div>
                      <div className="card-lists-item user-profile">
                        <div className="user-profile-image">
                          <img src={profilePic} className="profile-pic" />
                        </div>
                        <div className="user-profile-content">
                          <div className="user-profile-name">
                            <h6>Ankit Patel</h6>
                            <p>
                              <img src={TeslaIcon} />
                              Tesla
                            </p>
                          </div>
                          <button className="button button-primary button-connect">
                            <ConnectIcon />
                            Connect
                          </button>
                        </div>
                      </div>
                      <div className="card-lists-item user-profile">
                        <div className="user-profile-image">
                          <img src={profilePic} className="profile-pic" />
                        </div>
                        <div className="user-profile-content">
                          <div className="user-profile-name">
                            <h6>Maulik Shah</h6>
                            <p>
                              <img src={TeslaIcon} />
                              Tesla
                            </p>
                          </div>
                          <button className="button button-primary button-connect">
                            <ConnectIcon />
                            Connect
                          </button>
                        </div>
                      </div>
                      <div className="card-lists-item user-profile">
                        <div className="user-profile-image">
                          <img src={profilePic} className="profile-pic" />
                        </div>
                        <div className="user-profile-content">
                          <div className="user-profile-name">
                            <h6>Raj Patel</h6>
                            <p>
                              <img src={TeslaIcon} />
                              Tesla
                            </p>
                          </div>
                          <button className="button button-primary button-connect">
                            <ConnectIcon />
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPost;
