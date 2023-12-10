import React, { useContext, useEffect, useState } from "react";
import "../common/scss/pages/home.scss";
import "../common/scss/pages/request.scss";
import profilePic from "../assets/images/profile.png";
import CoverBg from "../assets/images/cover-bg.jpg";
import { ReactComponent as HeartFilledIcon } from "../assets/images/heart-filled.svg";
import { ReactComponent as MyTransactionIcon } from "../assets/images/my-transaction-icon.svg";
import { ReactComponent as FormIcon } from "../assets/images/form-icon.svg";
import { ReactComponent as MyNetworkIcon } from "../assets/images/my-network-icon.svg";
import { ReactComponent as PendingIcon } from "../assets/images/pending-icon.svg";
import { ReactComponent as ManageAccountIcon } from "../assets/images/manage-account-icon.svg";
import { ReactComponent as MyPostIcon } from "../assets/images/my-post-icon.svg";
import TeslaIcon from "../assets/images/tesla-icon.jpg";
import { ReactComponent as ConnectIcon } from "../assets/images/connect-icon.svg";
import { ReactComponent as SearchIcon } from '../assets/images/search-icon.svg'
import { ReactComponent as ShareIcon } from "../assets/images/share-icon.svg";
import Header from "../common/header";
import { Link, useNavigate } from 'react-router-dom';
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
function CreateTransaction() {
  
  return (
    <>
      <Header home/>

      <div className="grey-bg">
        <div className="container-fluid">
          <div className="layout-grid-box">
        <LeftSideBar />
            <div className="layout-grid">
              <div className="request-wrap">
                <h6>Create Transaction</h6>
                <div className="request-wrap-head">
                  <div className='search-box'>
                    <input type='text' className='form-input' placeholder='Search' />
                    <button className='search-button'><SearchIcon /></button>
                  </div>
                  <div className="short">
                    <select className="form-input"><option>Sort By</option><option>Recently Added</option><option>First name </option><option>Last name</option></select>
                  </div>
                </div>
                <div className="request">
                  <div className="request-list user-profile">
                    <div className="user-profile-image">
                      <img src={profilePic} className="profile-pic" />
                    </div>
                    <div className="user-profile-content">
                      <div className="user-profile-name">
                        <h6>
                        Jacob Jones<span>(Profile ID: 302101)</span>
                        </h6>
                        <p>
                          <img src={TeslaIcon} />
                          <strong>Tesla - Project Manager</strong>
                        </p>
                        <p>
                          Product Category:{" "}
                          <span>
                            Hand Tools, Power Tools, Industrial Safety Tools
                          </span>
                        </p>
                      </div>
                      <button className="button button-blue button-create">
                      Create Transaction
                      </button>
                    </div>
                  </div>
                  <div className="request-list user-profile">
                    <div className="user-profile-image">
                      <img src={profilePic} className="profile-pic" />
                    </div>
                    <div className="user-profile-content">
                      <div className="user-profile-name">
                        <h6>
                        Leslie Alexander<span>(Profile ID: 302101)</span>
                        </h6>
                        <p>
                          <img src={TeslaIcon} />
                          <strong>Tesla - Project Manager</strong>
                        </p>
                        <p>
                          Product Category:{" "}
                          <span>
                            Hand Tools, Power Tools, Industrial Safety Tools
                          </span>
                        </p>
                      </div>
                      <button className="button button-blue button-create">
                      Create Transaction
                      </button>
                    </div>
                  </div>
                  <div className="request-list user-profile">
                    <div className="user-profile-image">
                      <img src={profilePic} className="profile-pic" />
                    </div>
                    <div className="user-profile-content">
                      <div className="user-profile-name">
                        <h6>
                        Annette Black<span>(Profile ID: 302101)</span>
                        </h6>
                        <p>
                          <img src={TeslaIcon} />
                          <strong>Tesla - Project Manager</strong>
                        </p>
                        <p>
                          Product Category:{" "}
                          <span>
                            Hand Tools, Power Tools, Industrial Safety Tools
                          </span>
                        </p>
                      </div>
                      <button className="button button-blue button-create">
                      Create Transaction
                      </button>
                    </div>
                  </div>
                  <div className="request-list user-profile">
                    <div className="user-profile-image">
                      <img src={profilePic} className="profile-pic" />
                    </div>
                    <div className="user-profile-content">
                      <div className="user-profile-name">
                        <h6>
                        Kristin Watson<span>(Profile ID: 302101)</span>
                        </h6>
                        <p>
                          <img src={TeslaIcon} />
                          <strong>Tesla - Project Manager</strong>
                        </p>
                        <p>
                          Product Category:{" "}
                          <span>
                            Hand Tools, Power Tools, Industrial Safety Tools
                          </span>
                        </p>
                      </div>
                      <button className="button button-blue button-create">
                      Create Transaction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTransaction;
