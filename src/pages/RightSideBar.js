import { useEffect, useState } from "react";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import { get, getAuthConfig, postwithOu } from "../libs/http-hydrate";

import swal from "sweetalert";
import { ReactComponent as ConnectIcon } from "../assets/images/connect-icon.svg";
import { ReactComponent as CaretDownIcon } from "../assets/images/caret-down.svg";
import TeslaIcon from "../assets/images/tesla-icon.jpg";
import { Link } from "react-router-dom";
import Auth from "../libs/auth";

function RightSideBar() {
  const [suggest, setSuggest] = useState({
    items: [],
    has_more: false,
  });
  const user = Auth.getCurrentUser();

  const [suggested_usersPage, setsuggested_usersPage] = useState(0);
  UseEffectOnce(() => {
    suggest_usersPages();
  });
  useEffect(() => {
    if (suggested_usersPage === 0) {
    } else {
      suggest_usersPages();
    }
  }, [suggested_usersPage]);

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
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          swal("Warning", "Request Already sent to this user ", "warning");
        }
      });
  }
  return (
    <>
      <div className="layout-grid layout-grid--right">
        <div className="card">
          <div className="card-inner">
            <div className="card-header">
              <h6>Suggested Users</h6>
              {suggest.has_more === true ? (
                <span
                  className="p-0 m-0 seemore-link"
                  onClick={(e) => {
                    e.preventDefault();
                    let p = suggested_usersPage + 1;
                    setsuggested_usersPage(p);
                  }}
                >
                  See More <CaretDownIcon />
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="card-body pt-0">
              <div className="card-lists">
                {suggest?.items &&
                  suggest?.items.length > 0 &&
                  suggest?.items.map((item, index) => {
                    return (
                      <>

                        <div className="card-lists-item user-profile">

                          <div className="user-profile-image">
                          <Link to={`/edit-profile-seller/${item?.slug}`}>

                            <img
                              src={item?.profile_image}
                              className="profile-pic"
                            />
                          </Link>
                          </div>
                          <div className="user-profile-content">
                          <Link to={`/edit-profile-seller/${item?.slug}`}>

                            <div className="user-profile-name">
                              <h6>{item?.name} </h6>
                              <p>
                                <img src={item?.company_details?.logo} />
                                {item?.company_details?.name}
                              </p>
                            </div>
                            </Link>
                            <button
                              className="button button-primary button-connect"
                              onClick={(e) => {
                                e.preventDefault();
                                if(user?.verified_at === null){
                                  swal("error","Pleasde verify your profile","error");

                                }
                                else{
                                  sentConnectionRequest(item?.id);

                                }
                              }}
                            >
                              <ConnectIcon />
                              Connect
                            </button>
                           
                          </div>
                         
                        </div>
                     
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RightSideBar;
