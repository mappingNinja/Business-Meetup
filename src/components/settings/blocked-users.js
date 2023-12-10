import "../../common/scss/pages/settings.scss";
import profilePic from "../../assets/images/profile.png";
import { get, getAuthConfig } from "../../libs/http-hydrate";
import { UseEffectOnce } from "../../Hook/UseEffectOnce";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import swal from "sweetalert";
import { useEffect } from "react";

function BockedUsers() {
  const [BlockedUser, setBlockedUser] = useState({});
  const [Loading, setLoading] = useState(false);
  const [List, setList] = useState({
    user: []
  });
  const [page, setPage] = useState(0);
  const handleUnblockUser = async (id) => {
    try {
      const requestData = new FormData();
      requestData.append("user_id", 2);
      await get(`/user/block/${id}`, getAuthConfig(), requestData).then((e) => {
        BlockUserList(1);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 0) {
    } else {
      BlockUserList();
    }
  }, [page]);

  UseEffectOnce(() => {
    BlockUserList(1);
  }, []);
  async function BlockUserList() {
    setLoading(true);
    get(`/user/block_list?page=${page + 1}`, getAuthConfig())
      .then((response) => {
        setList((p) => ({
          ...p,
          user: List.user.concat(response.data.data.items)
        }));

        setBlockedUser(response.data.data);
        setLoading(false);
      })
      .catch((e) => {});
  }
  console.log(BlockedUser);
  return (
    <>
      <div className="blockeduser-list">
        <div className="section-title">
          <h6>Blocked user list</h6>
        </div>

        {Loading ? (
          <PuffLoader loading={true} size={15} />
        ) : (
          <div className="card-lists">
            {List?.user?.length === 0 ? "No Blocked User" : ""}
            {List?.user?.length > 0 &&
              List?.user.map((item, index) => {
                return (
                  <>
                    <div className="card-lists-item user-profile">
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
                            {item?.company_details?.designation != null
                              ? item?.company_details?.designation + "at"
                              : ""}{" "}
                            {item?.company_details?.name}{" "}
                          </p>
                          <p>
                            Product Category:{" "}
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
                          className="button button-primary button-connect"
                          onClick={(e) => {
                            e.preventDefault();

                            swal({
                              title: "Are you sure?",
                              text: "Are you sure you want to unblock this user ?",
                              icon: "warning",
                              dangerMode: true,
                              buttons: ["Cancel", "Ok"]
                            }).then((willDelete) => {
                              if (willDelete) {
                                setLoading(true);

                                handleUnblockUser(item?.id);
                              } else {
                              }
                            });
                          }}
                        >
                          Unblock
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        )}

        {BlockedUser?.has_more === true ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                page = page + 1;
              }}
            >
              See more
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default BockedUsers;
