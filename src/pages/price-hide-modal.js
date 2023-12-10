import { useContext, useState, useEffect } from "react";
import { ReactComponent as Close2Icon } from "../assets/images/close2-icon.svg";
import { ReactComponent as SearchIcon } from "../assets/images/search-icon.svg";
import { ReactComponent as CheckMark } from "../assets/images/check-mark.svg";
import ProfilePic from "../assets/images/profile.png";
import { getAuthConfig, postwithOu, get, post } from "../libs/http-hydrate";
import { UseEffectOnce } from "../Hook/UseEffectOnce";

function PriceHideModal() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const hideUserRequestList = async () => {
    setLoading(true);
    try {
      const res = await get(
        `/connection/listing?type=for_product`,
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

  const handleSubmit = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    await post("/product/resticate_user", formData, getAuthConfig())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  UseEffectOnce(() => {
    hideUserRequestList();
  }, []);
  return (
    <>
      <div
        className="modal fade price-hide-modal"
        id="PriceHideModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="PriceHideModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Price Hide From
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <Close2Icon />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="price-hide-form">
                <form>
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Search through Profile ID or Name"
                    />
                    <button className="search-button">
                      <SearchIcon />
                    </button>
                  </div>
                </form>
                <div className="user-list">
                  {loading ? (
                    <>Loading</>
                  ) : (
                    <>
                      {users.map((user) => {
                        return (
                          <div className="user-item" key={user.id}>
                            <input
                              type="checkbox"
                              name="user_list"
                              id={user.id}
                              onChange={() => {
                                handleSubmit(user.id);
                              }}
                              // value={checked}
                            />
                            <label htmlFor={user.id}>
                              <div className="profile-image">
                                <img
                                  src={user.profile_image}
                                  alt="profileImg"
                                />
                              </div>
                              <div className="profile-content">
                                <h6>{user.name}</h6>
                                <p>(Profile ID: {user.id})</p>
                              </div>
                              <span className="checkmark">
                                <CheckMark />
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="button button-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PriceHideModal;
