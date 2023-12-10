import React, { useState, useEffect, useRef } from "react";
import "../../common/scss/pages/steps.scss";
import "../../common/scss/pages/signup.scss";
import { ReactComponent as BuyerIcon } from "../../assets/images/buyer-icon.svg";
import { ReactComponent as SellerIcon } from "../../assets/images/seller-icon.svg";
import { ReactComponent as InfoIcon } from "../../assets/images/info.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/close-icon.svg";
import { ReactComponent as TickIcon } from "../../assets/images/tick-icon.svg";
import eye from "../../assets/images/eye.svg";
import eyeOff from "../../assets/images/eye-off-line.svg";
import imgPlaceholder from "../../assets/images/img-placeholder.svg";
import profilePlaceholder from "../../assets/images/profile-placeholder.svg";
import companyPlaceholder from "../../assets/images/company-placeholder.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import validator from "validator";
import { get, post } from "../../libs/http-hydrate";
import FieldValidationError from "../error-messages/field-validation-error";
import { PASSWORD_RULES } from "../../constants/password-rules";
import { TYPE, I_AM, WE_ARE } from "../../constants/signup-constants";
import PuffLoader from "react-spinners/PuffLoader";
import ReactSelect, { components } from "react-select";


export default function StepOne(props) {
  const { isLength, isMobilePhone, isStrongPassword, isEmail } = validator;
  const {
    fields,
    setFields,
    steps,
    nextStep,
    setFieldValidation,
    setFieldValue,
  } = props;

  console.log('field is  : ', fields)
  const [designations, setDesignations] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [OTPRequest, setOTPRequest] = useState({
    sent: steps.one,
    error: false,
    message: "",
  });
  const [OTPValidationRequest, setOTPValidationRequest] = useState({
    sent: steps.one,
    error: false,
    message: "",
  });
  const imageUploadRef = [useRef(), useRef()];
  const [authorizeLogo, setAuthorizeLogo] = useState(true);
  const [availableIndustry, setAvailableIndustry] = useState([]);
  const [optionSelected, setOptionSelected] = useState();
  const [industryOption, setIndustryOption] = useState([]);
  const [industryError, setindustryError] = useState(false);
  const [profileImagePreview, setProfileImagePreview] =
    useState(profilePlaceholder);
  const [companyImagePreview, setCompanyImagePreview] =
    useState(companyPlaceholder);
  const [LoadingButton, setLoadingButton] = useState(false);
  useEffect(() => {
    get("/get_designation_list").then((res) => {
      if (res.status === 200) {
        setDesignations((prev) => {
          return [...prev, ...res.data.data];
        });
      }
    });
    fields.i_am.value = I_AM.INDIVIDUAL;
    fields.profile_image.value &&
      setProfileImagePreview(URL.createObjectURL(fields.profile_image.value));
    fields.company_logo.value &&
      setCompanyImagePreview(URL.createObjectURL(fields.company_logo.value));
  }, []);

  const togglePasswordView = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleDesignationChange = (e) => {
    e.preventDefault();
    setFields((prev) => {
      return {
        ...prev,
        designation: { value: e.target.value, validation: true },
      };
    });
  };

  const sendOTP = async () => {
    const setErrorState = (response) => {
      if (response.status === 400) {
        console.log(response.data.message);
        setOTPRequest((prev) => {
          return {
            ...prev,
            sent: false,
            error: true,
            message: response.data.message,
          };
        });
        setLoadingButton(false);
      } else {
        setOTPRequest((prev) => {
          return {
            ...prev,
            sent: false,
            error: true,
            message: "",
          };
        });
        setLoadingButton(false);
      }
    };
    const formdata = new FormData();
    formdata.append("need_verification_code", 1);
    formdata.append("mobile_number", fields.mobile_number.value);

    if (
      fields.mobile_number.value &&
      isMobilePhone(fields.mobile_number.value, "en-IN")
    ) {
      try {
        const response = await post("/availability_checker", formdata);
        if (response.status === 200) {
          setOTPRequest((prev) => {
            return {
              ...prev,
              sent: true,
              error: false,
              message: "",
            };
          });
          setLoadingButton(false);
        } else {
          setErrorState(response);
          setLoadingButton(false);
        }
      } catch (error) {
        setErrorState(error.response);
        setLoadingButton(false);
      }
    } else {
      setFieldValidation(null, "mobile-number", false);
      setLoadingButton(false);
    }
  };

  const verifyOTP = async () => {
    const setErrorState = (response) => {
      if (response.status && response.status === 400) {
        setOTPValidationRequest((prev) => {
          return {
            ...prev,
            sent: false,
            error: true,
            message: response.data.message,
          };
        });
      } else {
        setOTPValidationRequest((prev) => {
          return {
            ...prev,
            sent: false,
            error: true,
            message: response.message,
          };
        });
      }
      setFieldValidation(null, "OTP", false);
    };
    if (fields.OTP.value && OTPRequest.sent) {
      try {
        const formdata = new FormData();

        formdata.append("verification_code", fields.OTP.value);
        const result = await post("/validate_verification_code", formdata);
        if (result.status === 200) {
          setOTPValidationRequest((prev) => {
            return {
              ...prev,
              sent: true,
              error: false,
              message: "",
            };
          });
          setFieldValidation(null, "OTP", true);
        } else setErrorState();
      } catch (error) {
        setErrorState(error.response);
      }
    } else {
      !OTPRequest.sent &&
        setErrorState({
          message: "Please Enter a valid mobile number and send OTP.",
        });
      !fields.OTP.value && setErrorState({ message: "Please enter OTP" });
    }
  };

  useEffect(() => {
    post(
      "/general/category_listing",
      { type: "industry" },
      // { headers: { Authorization: `Bearer ${user.token}` } }
    ).then((response) => {
      setAvailableIndustry(response.data.data);
    });
  }, []);

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const transformedIndustryArray = availableIndustry.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const handleIndustryChange = (selected) => {
    setOptionSelected(selected);
    const newArray = [];
    selected.forEach((select) => {
      if (!newArray.includes(select.value)) {
        newArray.push(select.value);
      }
    });
    setIndustryOption(newArray);


    setFields((prev) => {
      return {
        ...prev,
        industry: { value: selected, validation: false },
      };
    });
  };
  console.log("setOptionSelected(newArray)", optionSelected)

  return (
    <div className="steps__content">
      <div className="steps__indicator">Step 1: Basic Information!</div>
      {/*<div className='steps__title'>Select User Type &amp;  Basic Information !</div>*/}

      <form>
        <div className="personal-info">
          <div className="grid">
            <p className="steps__title">Please select your role</p>
            <div
              className="user-type"
              onBlur={(e) => {
                if (!fields.type.value) {
                  setFieldValidation(e, "type", false);
                }
              }}
            >
              <div className="form-field">
                <input
                  type="radio"
                  name="userType"
                  id="userBuyer"
                  defaultChecked={fields.type.value === TYPE.BUYER}
                  onChange={(e) => {
                    setFieldValue(e, "type", TYPE.BUYER);
                    setFieldValue(e, "we_are", "");
                  }}
                  onClick={() => {
                    fields.we_are.value = null;
                  }}
                />
                <label htmlFor="userBuyer">
                  <span className="img-box">
                    <BuyerIcon />
                  </span>
                  Buyer
                </label>
              </div>
              <div className="form-field">
                <input
                  type="radio"
                  name="userType"
                  id="userSeller"
                  defaultChecked={fields.type.value === TYPE.SELLER}
                  onClick={(e) => {
                    setFieldValue(e, "type", TYPE.SELLER);
                    fields.we_are.value = WE_ARE.WHOLESALER;
                  }}
                />
                <label htmlFor="userSeller">
                  <span className="img-box">
                    <SellerIcon />
                  </span>
                  Seller
                </label>
              </div>
              {!fields.type.validation && (
                <FieldValidationError name="user type" />
              )}
            </div>

            {fields.type.value === TYPE.SELLER && (
              <div className="field-set signup-radio">
                <label>
                  We are <span className="mendatory">*</span>
                </label>
                <div
                  className="form-group"
                // onBlur={e => {
                //   if (!fields.we_are.value) {
                //     setFieldValidation(e, 'we_are', false)
                //   }
                // }}
                >
                  <div className="form-field">
                    <input
                      type="radio"
                      name="we_are"
                      id="Wholesaler"
                      defaultChecked={fields.we_are.value === WE_ARE.WHOLESALER}
                      onClick={(e) => {
                        setFieldValue(e, "we_are", WE_ARE.WHOLESALER);
                      }}
                      onLoad={(e) =>
                        setFieldValue(e, "we_are", WE_ARE.WHOLESALER)
                      }
                    />
                    <label htmlFor="Wholesaler">Wholesaler</label>
                  </div>
                  <div className="form-field">
                    <input
                      type="radio"
                      name="we_are"
                      id="Manufacture"
                      defaultChecked={
                        fields.we_are.value === WE_ARE.MANUFACTURER
                      }
                      onClick={(e) =>
                        setFieldValue(e, "we_are", WE_ARE.MANUFACTURER)
                      }
                    />
                    <label htmlFor="Manufacture">Manufacturer</label>
                  </div>
                  <div className="form-field">
                    <input
                      type="radio"
                      name="we_are"
                      id="Retailer"
                      defaultChecked={fields.we_are.value === WE_ARE.RETAILER}
                      onClick={(e) =>
                        setFieldValue(e, "we_are", WE_ARE.RETAILER)
                      }
                    />
                    <label htmlFor="Retailer">Retailer</label>
                  </div>
                  <div className="form-field">
                    <input
                      type="radio"
                      name="we_are"
                      id="Dealer"
                      defaultChecked={fields.we_are.value === WE_ARE.DEALER}
                      onClick={(e) => setFieldValue(e, "we_are", WE_ARE.DEALER)}
                    />
                    <label htmlFor="Dealer">Dealer</label>
                  </div>
                  <div className="form-field">
                    <input
                      type="radio"
                      name="we_are"
                      id="Distributor"
                      defaultChecked={
                        fields.we_are.value === WE_ARE.DISTRIBUTOR
                      }
                      onClick={(e) =>
                        setFieldValue(e, "we_are", WE_ARE.DISTRIBUTOR)
                      }
                    />
                    <label htmlFor="Distributor">Distributor</label>
                  </div>
                </div>
                {!fields.we_are.validation && (
                  <FieldValidationError name="work area" />
                )}
              </div>
            )}

            <div className="field-set signup-radio">
              <label>
                I am <span className="mendatory">*</span>
              </label>
              <div
                className="form-group"
                onBlur={(e) => {
                  if (!fields.i_am.value) {
                    setFieldValidation(e, "i_am", false);
                  }
                }}
              >
                <div className="form-field">
                  <input
                    type="radio"
                    name="i_am"
                    id="individual"
                    defaultChecked={true}
                    onClick={(e) => setFieldValue(e, "i_am", I_AM.INDIVIDUAL)}
                  />
                  <label htmlFor="individual">Individual</label>
                </div>
                <div className="form-field">
                  <input
                    type="radio"
                    name="i_am"
                    id="owner"
                    defaultChecked={fields.i_am.value === I_AM.OWNER}
                    onClick={(e) => setFieldValue(e, "i_am", I_AM.OWNER)}
                  />
                  <label htmlFor="owner">Owner</label>
                </div>
                <div className="form-field">
                  <input
                    type="radio"
                    name="i_am"
                    id="company_employee"
                    defaultChecked={fields.i_am.value === I_AM.EMPLOYEE}
                    onClick={(e) => setFieldValue(e, "i_am", I_AM.EMPLOYEE)}
                  />
                  <label htmlFor="company_employee">Company Employee</label>
                </div>
                <div className="form-field">
                  <input
                    type="radio"
                    name="i_am"
                    id="partner"
                    defaultChecked={fields.i_am.value === I_AM.PARTNER}
                    onClick={(e) => setFieldValue(e, "i_am", I_AM.PARTNER)}
                  />
                  <label htmlFor="partner">Partner</label>
                </div>
              </div>
              {!fields.i_am.validation && (
                <FieldValidationError name="occupation" />
              )}
            </div>
            <p className="steps__title">
              Please enter the basic details for us to introduce you to your
              business network.
            </p>
            {fields.i_am.value === I_AM.EMPLOYEE && (
              <div
                className="form-field"
                onBlur={(e) => {
                  if (!fields.designation.value) {
                    setFieldValidation(e, "designation", false);
                  }
                }}
              >
                <label className="form-label">
                  Designation <span className="mendatory">*</span>
                </label>
                <select
                  className="form-input"
                  onChange={handleDesignationChange}
                  value={fields.designation.value}
                >
                  <option value="" key="first">
                    {" "}
                    ---DESIGNATION---{" "}
                  </option>
                  {designations.map((d, i) => {
                    return (
                      <option value={d} key={i}>
                        {d}
                      </option>
                    );
                  })}
                </select>
                {!fields.designation.validation && (
                  <FieldValidationError name="designation" />
                )}
              </div>
            )}
            <div className="form-field">
              <label className="form-label">
                Name <span className="mendatory">*</span>
              </label>
              <input
                type="text"
                name="uname"
                id="uname"
                className="form-input"
                placeholder="Enter your name"
                required
                value={fields.name.value}
                onChange={(e) => setFieldValue(e, "name")}
                onBlur={(e) =>
                  setFieldValidation(
                    e,
                    "name",
                    isLength(e.target.value, { max: 255 })
                  )
                }
              />
              {!fields.name.validation && <FieldValidationError name="name" />}
            </div>
            <div className="form-field">
              <label className="form-label">
                Email <span className="mendatory">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                required
                value={fields.email.value}
                onChange={(e) => {
                  setFieldValue(e, "email");
                }}
                onBlur={(e) => {
                  if (!e.target.value == "") {
                    setFieldValidation(e, "email", isEmail(e.target.value));
                    if (isEmail(e.target.value)) {
                      const formdata = new FormData();
                      formdata.append("email", e.target.value);
                      post("/availability_checker", formdata)
                        .then((res) => {
                          if (res.status !== 200) {
                            setFieldValidation(e, "email", false);
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          setFieldValidation(e, "email", false);
                        });
                    }
                  }
                }}
              />
              {!fields.email.validation && (
                <FieldValidationError message="Invalid Email or Email already taken" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label">
                Mobile Number <span className="mendatory">*</span>
                <span className="tooltip-icon">
                  <OverlayTrigger
                    key="mobile-tip"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-mobile-tip">
                        Enter your 10 digit mobile number, We will send OTP
                      </Tooltip>
                    }
                  >
                    <InfoIcon />
                  </OverlayTrigger>
                </span>
              </label>
              <input
                type="tel"
                name="mobile "
                className="form-input "
                placeholder="Enter your mobile number "
                required
                value={fields.mobile_number.value}
                onChange={(e) => {
                  setFieldValue(e, "mobile_number");
                  setFieldValue({ target: { value: "" } }, "OTP");
                  setOTPRequest({
                    sent: false,
                    error: false,
                    message: "",
                  });
                  setOTPValidationRequest({
                    sent: false,
                    error: false,
                    message: "",
                  });
                }}
                onBlur={(e) => {
                  if (!e.target.value == "") {
                    setFieldValidation(
                      e,
                      "mobile_number",
                      isMobilePhone(e.target.value, "en-IN")
                    );
                  }
                }}
              />
              <button
                type="button"
                className={`button ${OTPRequest.sent
                    ? "button-green"
                    : OTPRequest.error
                      ? "button-red"
                      : "button-primary"
                  } button-otp`}
                onClick={() => {
                  setLoadingButton(true);
                  sendOTP();
                }}
              >
                {OTPRequest.sent ? (
                  <TickIcon />
                ) : OTPRequest.sendError ? (
                  "OTP Error"
                ) : LoadingButton === true ? (
                  <PuffLoader loading={true} size={15} />
                ) : (
                  "Send OTP"
                )}
              </button>
              {!fields.mobile_number.validation && (
                <FieldValidationError name="mobile number" />
              )}
              {!OTPRequest.sent && OTPRequest.error && (
                <FieldValidationError name="" message={OTPRequest.message} />
              )}
            </div>
            <div className="form-field">
              <label className="form-label">
                Enter OTP <span>(We have sent otp on above number)</span>
              </label>
              <input
                type="text"
                name="otp"
                value={fields.OTP.value}
                className="form-input"
                required
                onChange={(e) => {
                  setFieldValue(e, "OTP");
                  setOTPValidationRequest({
                    sent: false,
                    error: false,
                    message: "",
                  });
                }}
                onBlur={verifyOTP}
              />
              {/* <button type='button' className={`button ${OTPValidationRequest.sent ? (fields.OTP.validation ? 'button-green' : 'button-red') : 'button-primary'} button-otp`} onClick={verifyOTP}>
                {OTPValidationRequest.sent ? (fields.OTP.validation ? 'OTP Verified!' : 'Wrong OTP, Try again!') : 'Verify OTP'}
              </button> */}
              {!OTPValidationRequest.sent && OTPValidationRequest.error ? (
                <FieldValidationError message={OTPValidationRequest.message} />
              ) : (
                !fields.OTP.validation && <FieldValidationError name="OTP" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label">
                Enter Password <span className="mendatory">*</span>
                <span className="tooltip-icon">
                  <OverlayTrigger
                    key="password-tip"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-password-tip">
                        Password should be minimum 8 characters long, with
                        at-least one lowercase, uppercase, number and a
                        symbol(like # or _).
                      </Tooltip>
                    }
                  >
                    <InfoIcon />
                  </OverlayTrigger>
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="pass"
                className="form-input"
                placeholder="Enter your password"
                required
                value={fields.password.value}
                onChange={(e) => setFieldValue(e, "password")}
                onBlur={(e) => {
                  if (!e.target.value == "") {
                    setFieldValidation(
                      e,
                      "password",
                      isStrongPassword(e.target.value, PASSWORD_RULES)
                    );
                  }
                }}
              />
              <button className="toggle-password" onClick={togglePasswordView}>
                <img src={showPassword ? eyeOff : eye} alt="show password" />
              </button>
              {!fields.password.validation && (
                <FieldValidationError message="Password should be minimum 8 characters long, with at-least one lowercase, uppercase, number and a symbol(like # or _)." />
              )}
            </div>
            <div className="form-field">
              <label className="form-label">
                Your Preferred Industry

                {fields.type.value === "seller" ? <span className="mendatory"> *</span> : ""}

              </label>

              <ReactSelect
                options={transformedIndustryArray}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                }}
                onChange={(selected) => handleIndustryChange(selected)}
                allowSelectAll={true}
                value={fields.industry.value}
              />

              {industryError && (
                <FieldValidationError message="Please select your prefered industry" />
              )}
            </div>
            <div className="form-button">
              <button
                className="button button-hasIcon button-primary"
                onClick={(e) => {
                  e.preventDefault()
                  if (fields.OTP.validation && fields.email.validation) {

                    if (fields.type.value === "seller" && !industryOption.length > 0) {
                      setindustryError(true)
                      return false;
                    }
                    nextStep(
                      e,
                      OTPRequest.sent && OTPValidationRequest.sent,
                      authorizeLogo
                    );
                  }
                }}
                type="submit"
              >
                Next
              </button>
            </div>
          </div>
          <div className="grid">
            <div className="form-field">
              <label className="form-label">
                Upload Profile Picture <span>(300x300)</span>
                <p>
                  Picture says a lot, please upload your business profile
                  picture.{" "}
                </p>
              </label>
              <div className="file-upload">
                <div className="preview">
                  <img src={profileImagePreview} alt="profile" />
                  {fields.profile_image.value && (
                    <a
                      className="close"
                      onClick={(e) => {
                        e.preventDefault();
                        setFields((prev) => {
                          return {
                            ...prev,
                            profile_image: {
                              value: undefined,
                              validation: true,
                            },
                          };
                        });
                        setProfileImagePreview(profilePlaceholder);
                      }}
                    >
                      <CloseIcon />
                    </a>
                  )}
                </div>
                <div className="upload-wrap">
                  <div className="upload-file">
                    <input
                      type="file"
                      ref={imageUploadRef[0]}
                      id="profile_pic"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFields((prev) => {
                          return {
                            ...prev,
                            profile_image: {
                              value: file,
                              validation: true,
                            },
                          };
                        });
                        setProfileImagePreview(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                    <label htmlFor="profile_pic">
                      <img src={imgPlaceholder} />
                      <span>
                        Drag n Drop here Or{" "}
                        <span className="color-primary">Browse</span>
                      </span>
                    </label>
                  </div>
                  <button
                    className="button button-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      imageUploadRef[0].current.click();
                    }}
                  >
                    Upload Now
                  </button>
                </div>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">
                Upload Company Logo <span>(512x512)</span>
                <p>
                  Please upload your company logo, it will improve your
                  visibility.{" "}
                </p>
              </label>
              <div className="file-upload">
                <div className="preview">
                  <img src={companyImagePreview} alt="company logo" />
                  {fields.company_logo.value && (
                    <a
                      className="close"
                      onClick={(e) => {
                        e.preventDefault();
                        setFields((prev) => {
                          return {
                            ...prev,
                            company_logo: {
                              value: undefined,
                              validation: true,
                            },
                          };
                        });
                        setCompanyImagePreview(companyPlaceholder);
                      }}
                    >
                      <CloseIcon />
                    </a>
                  )}
                </div>

                <div className="upload-wrap">
                  <div className="upload-file">
                    <input
                      type="file"
                      ref={imageUploadRef[1]}
                      id="company_logo"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFields((prev) => {
                          return {
                            ...prev,
                            company_logo: {
                              value: file,
                              validation: true,
                            },
                          };
                        });
                        setCompanyImagePreview(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                    <label htmlFor="company_logo">
                      <img src={imgPlaceholder} />
                      <span>
                        Drag n Drop here Or{" "}
                        <span className="color-primary">Browse</span>
                      </span>
                    </label>
                  </div>
                  <button
                    className="button button-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      imageUploadRef[1].current.click();
                    }}
                  >
                    Upload Now
                  </button>
                </div>
              </div>
            </div>
            <div className="form-field">
              <input
                type="checkbox"
                id="authorize_to_logo"
                checked={authorizeLogo}
                onClick={(e) =>
                  setAuthorizeLogo((prev) => {
                    return !prev;
                  })
                }
              />
              <label htmlFor="authorize_to_logo">
                By authorize to upload company logo.
              </label>
              {!authorizeLogo && (
                <FieldValidationError message="Please authorize the use of logo" />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
