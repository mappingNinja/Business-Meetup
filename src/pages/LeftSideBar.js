import { useState } from "react";
import { Link } from "react-router-dom";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import { get, getAuthConfig } from "../libs/http-hydrate";
import { ReactComponent as HeartFilledIcon } from "../assets/images/heart-filled.svg";
import { ReactComponent as MyTransactionIcon } from "../assets/images/my-transaction-icon.svg";
import { ReactComponent as FormIcon } from "../assets/images/form-icon.svg";
import { ReactComponent as MyNetworkIcon } from "../assets/images/my-network-icon.svg";
import { ReactComponent as PendingIcon } from "../assets/images/pending-icon.svg";
import { ReactComponent as ProtfolioIcon } from "../assets/images/protfolio-icon.svg";
import { ReactComponent as MyPostIcon } from "../assets/images/my-post-icon.svg";
import Auth from "../libs/auth";

function LeftSideBar() {
  const [data, setData] = useState({
    dataa: "",
  });  
  const user = Auth.getCurrentUser();


  UseEffectOnce(() => {
    fetchData();
  });
  async function fetchData() {
    const data = await get("/user/profile/basic_details", getAuthConfig());
    if (data.status === 200) {
      setData({ ...data, dataa: data.data });
    }
  }
  return (
    <>
      <div className="layout-grid layout-grid--left">
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
                      Pending Requests <strong>{localStorage.getItem("PENDREQ")  ?  "("+ localStorage.getItem("PENDREQ")  + ")" : ""}</strong>
                    </Link>
                  </li>

                  {user?.is_buyer === 1 ? "" :  <li>
                    <Link to={"/product-portfolio-initial"}>
                      <ProtfolioIcon /> 
                      Product Portfolio
                    </Link>
                  </li> }
                 
                </ul>
                <ul>
                  <li>
                    <Link to={"/my-post"}>
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
    </>
  );
}

export default LeftSideBar;
