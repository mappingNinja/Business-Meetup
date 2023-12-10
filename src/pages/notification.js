import React, { useState } from "react";
import "../common/scss/pages/home.scss";
import "../common/scss/pages/notification.scss";
import { ReactComponent as NotificationLikeIcon } from "../assets/images/notification-like.svg";
import Header from "../common/header";
import { Link, useNavigate } from "react-router-dom";
import { get, getAuthConfig } from "../libs/http-hydrate";
import Auth from "../libs/auth";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import moment from "moment";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

function Notification() {
  const navigate = useNavigate();
  const [NotificationData, setNotificationData] = useState({});
  const currentUser = Auth.getCurrentUser();

  UseEffectOnce(() => {
    fetchDataT();
  }, []);
  async function fetchDataT() {
    const data = await get("/user/notification_listing?page=1", getAuthConfig())
      .then((datas) => {
        if (datas.status === 200) {
          setNotificationData(datas.data.data);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          Auth.logout();
          navigate("/login");
        }
      });
  }
  return (
    <>
      <Header home />

      <div className="grey-bg">
        <div className="container-fluid">
          <div className="layout-grid-box">
            <LeftSideBar />
            <div className="layout-grid">
              <div className="card notification">
                <div className="card-header">
                  <h6>Notifications</h6>
                </div>
                <div className="card-body notification-wrap">
                  {NotificationData?.items &&
                    NotificationData?.items.length > 0 &&
                    NotificationData?.items.map((item, index) => {
                      return (
                        <>
                          <div >
                            <Link
                              to={`${
                                item.type === "connection_request"
                                  ? "/connection-list"
                                  : item.type === "comment" ||
                                    item.type === "reaction"
                                  ? "/my-post"
                                  : ""
                              }`}
                              className="notification-item"
                            >
                              <div className="icon light-orange">
                                <NotificationLikeIcon />
                              </div>
                              <div className="notification-title">
                                <h6>{item?.title}</h6>
                              </div>
                              <div className="notification-right ">
                                <div className="time">
                                  {" "}
                                  {moment(item?.created_at)
                                    .utc()
                                    .format(" h:mm a -  Do MMMM YYYY")}{" "}
                                </div>
                              </div>
                            </Link>
                          </div>
                        </>
                      );
                    })}
                  {NotificationData?.items &&
                  NotificationData?.items.length <= 0 ? (
                    <>
                      <div className="notification-item">
                        <div className="text-center">
                          No Notification Found{" "}
                        </div>{" "}
                      </div>
                    </>
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
}

export default Notification;
