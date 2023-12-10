import { useContext, useState, useEffect, useRef } from "react";
import { ReactComponent as Close2Icon } from "../assets/images/close2-icon.svg";
import FieldValidationError from "../components/error-messages/field-validation-error";
import { getAuthConfig, postwithOu } from "../libs/http-hydrate";
import { useLocation, useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
function MinimumOrderModal(props, min_order_value) {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef();
  const [minimum_Order_Value, setminimum_Order_Value] = useState({
    min_order_value: "",
  });
  const [minimum_Order_Valueer, setminimum_Order_Valueer] = useState({
    min_order_value: false,
  });
  const [minimum_Order_ValueLoad, setminimum_Order_ValueLoad] = useState({
    min_order_value: false,
  });
  useEffect(() => {
    if (localStorage.getItem("min_order_value")) {
      setminimum_Order_Value((p) => ({
        ...minimum_Order_Value,
        min_order_value: localStorage.getItem("min_order_value"),
      }));
    } else {
      setminimum_Order_Value((p) => ({
        ...minimum_Order_Value,
        min_order_value: 0,
      }));
    }

  },[localStorage.getItem('min_order_value')])
  async function editPortfolio(e) {
    e.preventDefault();
    if (minimum_Order_Value?.min_order_value === "") {
      setminimum_Order_ValueLoad({
        ...minimum_Order_ValueLoad,
        min_order_value: false,
      });
      setminimum_Order_Valueer({
        ...minimum_Order_Valueer,
        min_order_value: true,
      });
      return false;
    }
    const url = "/product/portfolio";
    const res = await postwithOu(url, getAuthConfig(), minimum_Order_Value);
    if (res?.data?.status === 200) {
      setminimum_Order_ValueLoad({
        ...minimum_Order_ValueLoad,
        min_order_value: false,
      });
      ref.current.click();

      // document.getElementById("MinimumOrderModal").style.display = "none";
      // document.body.classList.remove('modal-open');
      // document.getElementsByClassName('show').classList.remove('modal-backdrop')
      props.UpdateTrue();
    } else if (res?.data?.status === 401) {
      setminimum_Order_ValueLoad({
        ...minimum_Order_ValueLoad,
        min_order_value: false,
      });
      navigate("/login");
    } else {
      setminimum_Order_ValueLoad({
        ...minimum_Order_ValueLoad,
        min_order_value: false,
      });
      alert("Something went wrong please try again later");
    }
  }
  return (
    <>
      <div
        className="modal fade modal-small"
        id="MinimumOrderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="MinimumOrderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Minimum Order Value
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={ref}
              >
                <span aria-hidden="true">
                  <Close2Icon />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Enter Minimum Amount</label>
                <input
                  type="number"
                  name="minOrder"
                  className="form-input"
                  placeholder="Enter Amount"
                  value={minimum_Order_Value?.min_order_value}
                  onChange={(e) => {
                    setminimum_Order_Value({
                      ...minimum_Order_Value,
                      min_order_value: e.target.value,
                    });
                    setminimum_Order_Valueer({
                      ...minimum_Order_Valueer,
                      min_order_value: false,
                    });
                  }}
                />
                {minimum_Order_Valueer?.min_order_value === true ? (
                  <FieldValidationError message="Please Enter Valid Minimum order value " />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="button button-primary"
                onClick={(e) => {
                  setminimum_Order_ValueLoad({
                    ...minimum_Order_ValueLoad,
                    min_order_value: true,
                  });
                  editPortfolio(e);
                }}
              >
                {minimum_Order_ValueLoad?.min_order_value === true ? (
                  <PuffLoader loading={true} size={15} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MinimumOrderModal;
