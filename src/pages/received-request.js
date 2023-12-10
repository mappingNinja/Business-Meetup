import React, { useState, useEffect } from "react";
import "../common/scss/pages/home.scss";
import "../common/scss/pages/request.scss";
import TeslaIcon from "../assets/images/tesla-icon.jpg";
// import { ReactComponent as ShareIcon } from "../assets/images/share-icon.svg";
import Header from "../common/header";
import { Link } from "react-router-dom";
import { get, getAuthConfig, post, postwithOu } from "../libs/http-hydrate";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const ReceivedRequest = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const sentUserRequestList = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await get(
  //         `/connection/listing?type=received&search=&sort=${sortedValue}`,
  //         getAuthConfig()
  //       );
  //       setLoading(false);

  //       if (res.status === 200) {
  //         setUsers(res.data.data.connections);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   setLoading(false);

  //   sentUserRequestList();
  // }, []);
  // const [followUser, setFollowUser] = useState(false);
  // console.log("followUser", followUser)

  // const connectionUserList = ();
  const [Filter, setFilter] = useState("");

  const handleAccceptRequest = async (id) => {
    try {
      // const follow = followUser ? true : false;
      const requestData = new FormData();
      requestData.append("user_id", id);
      requestData.append("action", "accepted");
      await postwithOu(
        "/connection/action_on_request",
        getAuthConfig(),
        requestData
      );
      // if (res.status === 200) {
      //   setFollowUser(follow);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeclineRequest = async (id) => {
    try {
      const requestData = new FormData();
      requestData.append("user_id", id);
      requestData.append("action", "rejected");
      await postwithOu(
        "/connection/action_on_request",
        getAuthConfig(),
        requestData
      ).then((res) => {
        console.log(res.type);
      });
    } catch (error) {
      console.log(error);
    }
  };

  UseEffectOnce(() => {
    sentUserRequestList();
  }, []);
  const sentUserRequestList = async (dat) => {
    try {
      let url = "/connection/listing?type=received&search=&sort=newest";
      if (dat) {
        url = `/connection/listing?type=received&search=&sort=${dat}`;
      }
      const res = await get(url, getAuthConfig());
      if (res.status === 200) {
        setUsers(res.data.data);
      }
    } catch (error) {}
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
                      <li className="active">
                        <Link to={"/received-request"}>Received Requests</Link>
                      </li>
                      <li>
                        <Link to={"/sent-request"}>Sent Requests</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="short">
                    <select
                      className="form-input"
                      onChange={(e) => {
                        setFilter(e.target.value);

                        if (e.target.value != "") {
                          sentUserRequestList(e.target.value);
                        }
                      }}
                    >
                      <option value={""}>Sort By</option>
                      <option value={"newest"}>Newest</option>
                      <option value={"oldest"}>Oldest</option>
                    </select>
                  </div>
                </div>
                <div className="request">
                  {users?.connections &&
                    users?.connections.length > 0 &&
                    users?.connections.map((item, index) => {
                      return (
                        <>
                          <div className="request-list user-profile">
                            <div className="user-profile-image">
                              <img
                                alt=""
                                src={item?.profile_image}
                                className="profile-pic"
                              />
                            </div>
                            <div className="user-profile-content">
                              <div className="user-profile-name">
                                <h6>
                                  {item?.name}
                                  <span>(Profile ID: {item?.id})</span>
                                </h6>
                                <p>
                                  <img
                                    alt=""
                                    src={item?.company_details?.logo}
                                  />
                                  <strong>
                                    {item?.i_am} - {item?.company_details?.name}
                                  </strong>
                                </p>
                                <p>
                                  Product Category:
                                  <span>
                                    {item?.categories &&
                                      item?.categories.length > 0 &&
                                      item?.categories.map((it, ind) => {
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
                              <button
                                onClick={() => handleAccceptRequest(item?.id)}
                                className="button button-green button-accept"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleDeclineRequest(item?.id)}
                                className="button button-red button-reject"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })}

                  {users?.connections && users?.connections.length <= 0 ? (
                    <div className="request-list user-profile">
                      No Request Found
                    </div>
                  ) : (
                    ""
                  )}
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

export default ReceivedRequest;
