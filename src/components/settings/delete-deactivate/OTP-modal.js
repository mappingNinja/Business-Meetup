import { post } from "jquery";
import React, { useEffect, useState } from "react";
import { get, getAuthConfig } from "../../../libs/http-hydrate";
import OTPInputs from "../../OTPInputs";
import axios from "axios";
import Auth from "../../../libs/auth";
import { useNavigate } from "react-router-dom";
import FieldValidationError from "../../error-messages/field-validation-error";
import { ReactComponent as Close2Icon } from '../../../assets/images/close2-icon.svg'

const initialState = {
  callError: false,
  clickEvent: false,
};
export default function OTPModal(props) {
  const { show, closeModal, type, parentState } = props;
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [state, setState] = useState(initialState);
  const [verification_wrong, setError] = useState(false);
  const types = {
    DEACTIVATE: "temp_deactivate",
    DELETE: "permanent_deactivate",
  };
  const navigate = useNavigate();
  const user = Auth.getCurrentUser();
  const [dataDelete, setDataDelete] = useState({});
  console.log(verification_wrong);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const setCallError = (event, value, message) => {
    setState((prev) => {
      return {
        ...prev,
        callError: value,
      };
    });
  };

  const setClickEvent = (event, value) => {
    setState((prev) => {
      return {
        ...prev,
        clickEvent: value,
      };
    });
  };

  const validateInput = () => {
    let validation = true;
    verificationCode.forEach((e) => {
      if (e === "") validation = false;
    });
    return validation;
  };

  async function testing() {
    if (!(verificationCode.join("") === "123456")) {
      setError(true);
      return false;
    }

    type.OTPVerified = true;

    const verifyCode = verificationCode.join("");
    const type_form = type.type === "delete" ? types.DELETE : types.DEACTIVATE;

    const formData = new FormData();
    formData.append("verification_code", verifyCode);
    formData.append("type", type_form);

    const response = await axios
      .post(
        "https://api.busimeet.com/api/V1/user/setting/deactivate_account",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        if (res.data.status === 200 && type.type === "delete") {
          Auth.logout();
          navigate("/");
        }
        if (res.data.status === 200) {
          setCallError(false);
          closeModal();
        } else {
          setError(true);
          // setCallError('',true)
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(true);
      });
  }
  // const handleSubmit = async () => {
  //   // alert(parentState)
  //   type.OTPVerified = true
  //   console.log('code is: ', verificationCode.join(''))
  //   if (validateInput()) {
  //     alert("inside if")
  //     // setClickEvent('', true)

  //     const verifyCode =  verificationCode.join('');
  //     const type_form = type.type === 'delete' ? types.DELETE : types.DEACTIVATE ;
  //     const formData = new FormData()
  //     formData.append('verification_code', verifyCode)
  //     formData.append('type', type_form);

  //     try {
  //       alert("inside Tru") ;
  //       console.log(formData);

  //       const result = await post('/user/setting/deactivate_account',formData,getAuthConfig())

  //       console.log(result)
  //       if (result.status === 200) {
  //         alert("testing")
  //         setCallError(false)
  //       } else {
  //         setCallError('', true)
  //       }
  //     } catch (error) {
  //       setCallError('', true)
  //     }
  //   }
  // }

  console.log(parentState);
  if (!show) return null;
  return (
    <div
      className="modal fade delete-modal otp-modal show"
      id="deleteModal"
      tabIndex="-1"
      style={{ display: "block", paddingRight: "15px" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ marginTop: "180px" }}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {type.type === "delete"
                ? "Delete Your Account"
                : "Deactive Your Account"}
            </h5>
            <p>We’re sorry to see you go.</p>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" onClick={() => closeModal()}>
              <Close2Icon />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="alert alert--highlight">
              <p>
                Also you can still recover your account by sending us email on{" "}
                <a href="mailto:busimeetsupport@gmail.com">
                  busimeetsupport@gmail.com
                </a>{" "}
                after 30 days all data will be permanently removed from server.
              </p>
            </div>
            <OTPInputs
              verificationCode={verificationCode}
              setCallError={setCallError}
              setClickEvent={setClickEvent}
              setVerificationCode={setVerificationCode}
            />

            {verification_wrong === true ? (
              <FieldValidationError message="Please Provide Valid verification Code " />
            ) : (
              ""
            )}
          </div>
          <div className="modal-footer">
            
            <button
              type="submit"
              className={`button ${
                state.clickEvent
                  ? state.callError
                    ? "button-red"
                    : "button-green"
                  : "button-primary"
              }`}
              onClick={() => testing()}
            >
              {state.clickEvent
                ? state.callError
                  ? "Invalid Code"
                  : "Account Deleted"
                : type.type === "delete"
                ? "Delete Your Account"
                : "Deactivate"}
            </button>
            <button
              type="button"
              className="button button-secondary"
              data-dismiss="modal"
              onClick={() => {
                setVerificationCode("");
                testdsds();
                function testdsds() {
                  setError(false);
                }

                closeModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
