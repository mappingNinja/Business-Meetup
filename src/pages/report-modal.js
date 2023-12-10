import { useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as Close2Icon } from "../assets/images/close2-icon.svg";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import { get, getAuthConfig, postwithOu } from "../libs/http-hydrate";
function ReportModal({ id }) {
  const [description, setDescription] = useState("");
  // const [reportType, setReportType] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentReason, setContentReason] = useState([]);
  console.log(contentReason);
  const [reasonID, setReasonID] = useState();
  console.log(reasonID, "-111");
  const closeRef = useRef();

  const reportUser = async () => {
    setLoading(true);
    try {
      const reportUserData = new FormData();
      reportUserData.append("reason_id", reasonID);
      reportUserData.append("type", "user");
      reportUserData.append("user_id", id);
      reportUserData.append("description", description);
      await postwithOu("/general/report", getAuthConfig(), reportUserData);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
    closeRef.current.click();
  };

  const handleSelectChange = (id) => {
    setReasonID(id);
  };

  const handleClose = () => {
    closeRef.current.click();
  };

  UseEffectOnce(() => {
    const handleReasonDropdown = async () => {
      await get(
        "/general/content?search&type=user_report_reason",
        getAuthConfig()
      ).then((res) => {
        setContentReason(res.data.data);
      });
    };
    handleReasonDropdown();
  });

  return (
    <>
      <div
        className="modal fade report-modal"
        id="ReportModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ReportModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Report
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
              <h6>What do you want to do?</h6>
              {contentReason.map((reason) => (
                <div className="form-field">
                  <select
                    value={reasonID}
                    className="form-input select-issue"
                    onClick={() => handleSelectChange(reason.id)}
                  >
                    <option key={reason.id} value={reason.id}>
                      {reason.title}
                    </option>
                  </select>
                </div>
              ))}
              <div className="form-field">
                <label className="form-label">Message</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-input"
                  placeholder="Enter Your Message"
                ></textarea>
              </div>
              <div className="report-info">
                Report post, comment, or message
              </div>
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
                onClick={reportUser}
                type="button"
                className="button button-primary"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportModal;
