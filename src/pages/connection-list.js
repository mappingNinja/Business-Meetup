import React, { useState, useEffect } from "react";
import "../common/scss/pages/home.scss";
import "../common/scss/pages/request.scss";
import TeslaIcon from "../assets/images/tesla-icon.jpg";
import { ReactComponent as SearchIcon } from "../assets/images/search-icon.svg";
import { ReactComponent as NoDataIcon } from "../assets/images/no-data.svg";
import Header from "../common/header";
import { Link, useNavigate } from "react-router-dom";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import { get, getAuthConfig, post, postwithOu } from "../libs/http-hydrate";
import Auth from "../libs/auth";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import swal from "sweetalert";

function ConnectionList() {
  const [users, setUsers] = useState([]);
  const [connectionCount, setConnectionCount] = useState();
  console.log("connectionCount", connectionCount)
  const navigate = useNavigate();
  const currentUser = Auth.getCurrentUser();
  const [Filter, setFilter] = useState({
    search: "",
    filterValue: ""
  });
  UseEffectOnce(() => {
    const fetchFriends = async () => {
      await get("/connection/listing?type=friends", getAuthConfig())
        .then((res) => {
          setUsers(res.data.data.connections);
        setConnectionCount(res.data.data.total_connections);

        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchFriends();
  });
  useEffect(() => {
    if (Filter?.filterValue === "") {
    } else {
      filterdata();
    }
  }, [Filter?.filterValue]);


  const RemoveConnection = async (id) => {
    const formdata = new FormData();
    formdata.append("user_id", id);
    await postwithOu("/connection/delete", getAuthConfig(), formdata)
      .then((datas) => {
        if (datas.status === 200) {
          // setUsers(datas.data.data);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          Auth.logout();
          navigate("/login");
        }
      });
  };

  const filterdata = async () => {
    let url;
    if (Filter.search != "") {
      url = `/connection/listing?type=friends&sort=${Filter?.filterValue}&search=${Filter?.search}`;
    } else {
      url = `/connection/listing?type=friends&sort=${Filter?.filterValue}`;
    }
    await get(url, getAuthConfig())
      .then((res) => {
        setUsers(res.data.data.connections);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterdataSearch = async () => {
    let url;
    if (Filter.filterValue != "") {
      url = `/connection/listing?type=friends&sort=${Filter?.filterValue}&search=${Filter?.search}`;
    } else {
      url = `/connection/listing?type=friends&search=${Filter?.search}`;
    }
    await get(url, getAuthConfig())
      .then((res) => {
        setUsers(res.data.data.connections);
        setConnectionCount(res.data.data.total_connections);
      })
      .catch((err) => {
        console.log(err);
      });
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
                <h6>
                  Connections List -{" "}
                  <span className="color-primary">{connectionCount}</span>
                </h6>
                <div className="request-wrap-head">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Search"
                      value={Filter?.search}
                      onChange={(e) => {
                        setFilter((p) => ({ ...p, search: e.target.value }));
                        if (Filter?.search != "") {
                          filterdataSearch();
                        }
                      }}
                    />
                    <button
                      className="search-button"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   if (Filter?.search != "") {
                      //     filterdataSearch();
                      //   }
                      // }}
                    >
                      <SearchIcon />
                    </button>
                  </div>
                  <div className="short">
                    <select
                      className="form-input"
                      onChange={(e) => {
                        setFilter((p) => ({
                          ...p,
                          filterValue: e.target.value
                        }));
                      }}
                    >
                      <option value={""}>Sort By</option>
                      <option value={"newest"}>Newest </option>
                      <option value={"oldest"}>Oldest</option>
                    </select>
                  </div>
                </div>
                <div className="request">
                  {users.map((user) => (
                    <div className="request-list user-profile" key={user.id}>
                      <div className="user-profile-image">
                        <img
                          src={user.profile_image}
                          className="profile-pic"
                          alt="profile-pic"
                        />
                      </div>
                      <div className="user-profile-content">
                        <div className="user-profile-name">
                          <h6>
                            {user.name}
                            <span>(Profile ID: {user.id})</span>
                          </h6>
                          <p>
                            <img src={TeslaIcon} alt="icon" />
                            <strong>Tesla - Project Manager</strong>
                          </p>
                          <p>
                            Product Category:{" "}
                            <span>
                              Hand Tools, Power Tools, Industrial Safety Tools
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            swal({
                              title: "Are you sure?",
                              text: "Are you sure you want to Remove connection with this user ?",
                              icon: "warning",
                              dangerMode: true,
                              buttons: ["Cancel", "Ok"]
                            }).then((willDelete) => {
                              if (willDelete) {
                                RemoveConnection(user.id);
                              } else {
                              }
                            });
                          }}
                          className="button button-red button-remove"
                        >
                          Remove Connections
                        </button>
                      </div>
                    </div>
                  ))}
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

export default ConnectionList;
