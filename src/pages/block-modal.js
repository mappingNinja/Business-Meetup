import { useRef, useState } from "react";
import { ReactComponent as Close2Icon } from "../assets/images/close2-icon.svg";
import { get, getAuthConfig } from "../libs/http-hydrate";
function BlockModal({ id }) {
  const closeRef = useRef();
  const [loading, setLoading] = useState(false);
  const blockUser = async () => {
    setLoading(true);
    await get(`/user/block/${id}`, getAuthConfig())
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
      closeRef.current.click();
  };

  const handleClose = () => {
    closeRef.current.click();
  };

  return (
    <>
      <div
        className="modal fade block-modal"
        id="BlockModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="BlockModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Block
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              >
                <span aria-hidden="true">
                  <Close2Icon />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <h6>Are you sure you want to block Dhiraj Sureshkumar?</h6>
              <p>
                You will no longer be connected (if you were before), or have
                endorsements and recommendations from this person. You will also
                no longer see any suggestions to interact with each other.
              </p>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleClose}
                type="button"
                className="button button-secondary"
              >
                Go Back
              </button>
              <button
                disabled={loading ? true : false}
                onClick={blockUser}
                type="button"
                className="button button-primary"
              >
                Block
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlockModal;
