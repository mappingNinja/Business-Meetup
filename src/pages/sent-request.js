import React, { useEffect, useState } from "react";
import "../common/scss/pages/home.scss";
import "../common/scss/pages/request.scss";
import TeslaIcon from "../assets/images/tesla-icon.jpg";
// import { ReactComponent as ShareIcon } from "../assets/images/share-icon.svg";
import Header from "../common/header";
import { Link } from "react-router-dom";
import { getAuthConfig, postwithOu, get } from "../libs/http-hydrate";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
const SentRequest = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortedValue, setSortedValue] = useState("");
  console.log("sortedValue", sortedValue);

  const handleSelectChange = (event) => {
    setSortedValue(event.target.value);
  };

  const sentUserRequestList = async () => {
    setLoading(true);
    try {
      const res = await get(
        `/connection/listing?type=sent&search=&sort=${sortedValue}`,
        getAuthConfig()
      );
      setLoading(false);
      if (res.status === 200) {
        setUsers(res.data.data.connections);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  UseEffectOnce(() => {
    sentUserRequestList();
  }, [sortedValue]);

  const handleWithdrawRequest = async (id) => {
    try {
      const requestData = new FormData();
      requestData.append("user_id", id);
      await postwithOu("/connection/delete", getAuthConfig(), requestData);
      sentUserRequestList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header home />

      <div className="grey-bg">
        <div className="container-fluid">
          <div className="layout-grid-box">
            <LeftSideBar />
            <div className="layout-grid">
              <div className="request-wrap">
                <h6>Requests</h6>
                <div className="request-wrap-head">
                  <div className="tabs tabs--solid">
                    <ul>
                      <li>
                        <Link to={"/received-request"}>Received Requests</Link>
                      </li>
                      <li className="active">
                        <Link to={"/sent-request"}>Sent Requests</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="short">
                    <select
                      value={sortedValue}
                      onChange={handleSelectChange}
                      className="form-input"
                    >
                      <option value="">Sort By</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </div>
                {loading ? (
                  <>loading</>
                ) : (
                  <div className="request">
                    {!users.length ? (
                      <>
                        <div className="no-users-wrapper">
                          <h6
                            style={{
                              justifyContent: "center",
                              textAlign: "center"
                            }}
                          >
                            There are no pending requests
                          </h6>
                        </div>
                      </>
                    ) : (
                      users.map((user) => {
                        return (
                          <div
                            className="request-list user-profile"
                            key={user.id}
                          >
                            <Link to={`/edit-profile-seller/${user?.slug}`}>
                              <div className="user-profile-image">
                                <img
                                  alt=""
                                  src={user.profile_image}
                                  className="profile-pic"
                                />
                              </div>
                            </Link>
                            <div className="user-profile-content">
                              <Link to={`/edit-profile-seller/${user?.slug}`}>
                                <div className="user-profile-name">
                                  <h6>
                                    {user.name}
                                    <span>(Profile ID: {user.id})</span>
                                  </h6>
                                  <p>
                                    <img
                                      alt=""
                                      src={user?.company_details?.logo}
                                    />
                                    <strong>
                                      {user?.i_am} -{" "}
                                      {user?.company_details?.name}
                                    </strong>
                                  </p>
                                  <p>
                                    Product Category:
                                    <span>
                                      {user?.categories &&
                                        user?.categories.length > 0 &&
                                        user?.categories.map((it, ind) => {
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
                              </Link>
                              <button
                                onClick={() => handleWithdrawRequest(user.id)}
                                className="button button-red button-disabled"
                              >
                                Withdraw
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                    {/* <div className="request-list user-profile">
                    <div className="user-profile-image">
                      <img alt="" src={profilePic} className="profile-pic" />
                    </div>
                    <div className="user-profile-content">
                      <div className="user-profile-name">
                        <h6>
                          Leslie Alexander<span>(Profile ID: 302101)</span>
                        </h6>
                        <p>
                          <img alt="" src={TeslaIcon} />
                          <strong>Tesla - Project Manager</strong>
                        </p>
                        <p>
                          Product Category:{" "}
                          <span>
                            Hand Tools, Power Tools, Industrial Safety Tools
                          </span>
                        </p>
                      </div>
                      <button className="button button-red button-disabled">
                        Withdraw
                      </button>
                    </div>
                  </div>
                  <div className="request-list user-profile">
                    <div className="user-profile-image">
                      <img alt="" src={profilePic} className="profile-pic" />
                    </div>
                    <div className="user-profile-content">
                      <div className="user-profile-name">
                        <h6>
                          Annette Black<span>(Profile ID: 302101)</span>
                        </h6>
                        <p>
                          <img alt="" src={TeslaIcon} />
                          <strong>Tesla - Project Manager</strong>
                        </p>
                        <p>
                          Product Category:{" "}
                          <span>
                            Hand Tools, Power Tools, Industrial Safety Tools
                          </span>
                        </p>
                      </div>
                      <button className="button button-red button-disabled">
                        Withdraw
                      </button>
                    </div>
                  </div>
                  <div className="request-list user-profile">
                    <div className="user-profile-image">
                      <img alt="" src={profilePic} className="profile-pic" />
                    </div>
                    <div className="user-profile-content">
                      <div className="user-profile-name">
                        <h6>
                          Kristin Watson<span>(Profile ID: 302101)</span>
                        </h6>
                        <p>
                          <img alt="" src={TeslaIcon} />
                          <strong>Tesla - Project Manager</strong>
                        </p>
                        <p>
                          Product Category:{" "}
                          <span>
                            Hand Tools, Power Tools, Industrial Safety Tools
                          </span>
                        </p>
                      </div>
                      <button className="button button-red button-disabled">
                        Withdraw
                      </button>
                    </div>
                  </div> */}
                  </div>
                )}
              </div>
            </div>
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default SentRequest;
