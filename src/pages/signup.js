import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../common/scss/pages/steps.scss";
import "../common/scss/pages/signup.scss";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Header from "../common/header";
import validator from "validator";
import { get, post } from "../libs/http-hydrate";
import { ReactComponent as CloseCircleLineIcon } from "../assets/images/close-circle-line.svg";
import { ReactComponent as InfoIcon } from "../assets/images/info.svg";
import { ReactComponent as CloseIcon } from "../assets/images/close-icon.svg";
import { ReactComponent as TickIcon } from "../assets/images/tick-icon.svg";
import StepOne from "../components/signup/step-one";
import { I_AM, TYPE } from "../constants/signup-constants";
import FieldValidationError from "../components/error-messages/field-validation-error";
import { AuthContext } from "../context/Auth.context";
import Auth from "../libs/auth";
import * as _ from "lodash";
import Select from "react-select";

/**
 * TODO::::
 * Image File resolution validation
 * Image crop module
 */

/* eslint-disable camelcase */

const initialState = {
  type: { value: TYPE.BUYER, validation: true },
  i_am: { value: "", validation: true },
  we_are: { value: "", validation: true },
  designation: { value: "", validation: true },
  name: { value: "", validation: true },
  email: { value: "", validation: true },
  mobile_number: { value: "", validation: true },
  industry: { value: [] },
  OTP: { value: "", validation: true },
  profile_image: { value: "", validation: true },
  company_logo: { value: "", validation: true },
  password: { value: "", validation: true },
  gst_number: { value: "", validation: true },
  pan_number: { value: "", validation: true },
  company_name: { value: "", validation: true },
  country_code: { value: "", validation: true }, //  country field
  region_id: { value: "", validation: true }, // state field
  pin_code: { value: "", validation: true },
  address: { value: "", validation: true },
  city: { value: "", validation: true },
};

function Signup() {
  const { isLength, isAlphanumeric, isPostalCode } = validator;
  const [steps, setSteps] = useState({ one: false, two: false, pageOne: true });
  const [fields, setFields] = useState(initialState);
  const [regions, setRegions] = useState({ countries: [], states: [] });

  console.log(fields);
  const [GSTrequest, setGSTrequest] = useState({
    clickEvent: false,
    sent: false,
    error: false,
    data: "",
    message: "",
  });
  const GSTregx = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const [formSubmission, setFormSubmission] = useState({
    status: false,
    value: "Submit",
    error: false,
    message: "",
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    const user = Auth.getCurrentUser();
    if (user && user.token) {
      navigate("/");
    }
    get("/general/region_listing").then((res) => {
      if (res.status === 200) {
        setRegions((prev) => {
          return { ...prev, countries: res.data.data };
        });
      }
    });
  }, []);

  const checkFieldsForSubmit = () => {
    const {
      company_name,
      region_id,
      pin_code,
      address,
      country_code,
      pan_number,
      gst_number,
      city,
    } = fields;
    if (
      !steps.pageOne &&
      (fields.type.value  ===  "buyer" ? true :  company_name.value &&
      company_name.validation)&&
   
      country_code.value &&
      country_code.validation &&
      region_id.value &&
      region_id.validation &&
      pin_code.value &&
      pin_code.validation &&
      address.value &&
      address.validation &&
      city.value && 
      city.validation &&
      (pan_number.value ? pan_number.validation : true) &&
      (gst_number.value ? GSTrequest.clickEvent : true)
    ) {
      return true;
    } else {
      console.log(fields, "validation failed for submit");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showEmptyFieldError(2);
    if (checkFieldsForSubmit()) {
      const formdata = new FormData();
      const {
        type,
        i_am,
        we_are,
        profile_image,
        company_logo,
        email,
        password,
        pan_number,
        gst_number,
        company_name,
        designation,
        region_id,
        pin_code,
        address,
        mobile_number,
        country_code,
        name,
        industry,
        city,
      } = fields;

      var arrw = [];
      formdata.append("type", type.value);
      formdata.append("i_am", i_am.value);
      formdata.append("email", email.value);
      formdata.append("password", password.value);
      formdata.append("company_name", company_name.value);
      formdata.append("region_id", region_id.value);
      formdata.append("pin_code", pin_code.value);
      formdata.append("address", address.value);
      formdata.append("mobile_number", mobile_number.value);
      formdata.append("country_code", country_code.value);
      formdata.append("name", name.value);
      formdata.append("city", city.value);

      fields.pan_number.value &&
        formdata.append("pan_number", pan_number.value);
      if (fields.industry.value) {
        industry.value.map((item, indx) => {
          formdata.append(`industry[${indx}]`, item.value);
        });
      }
      fields.gst_number.value &&
        formdata.append("gst_number", gst_number.value);
      fields.profile_image.value &&
        formdata.append("profile_image", profile_image.value);
      fields.company_logo.value &&
        formdata.append("company_logo", company_logo.value);
      fields.designation.value &&
        formdata.append("designation", designation.value);
      fields.type.value === TYPE.SELLER &&
        formdata.append("we_are", we_are.value);
      console.log(formdata);
      const flag = true;
      if (flag) {
        try {
          const response = await post("/register", formdata);
          if (response.status === 200) {
            setFormSubmission({
              status: true,
              value: "Submitted!! ",
              error: false,
              message: "",
            });
            setIsLoggedIn(true);
            localStorage.setItem("user", JSON.stringify(response.data.data));
            navigate("/thank-you");
          } else {
            console.log(response.data);
            setFormSubmission({
              status: false,
              value: "Submit",
              error: true,
              message: response.data.message,
            });
          }
        } catch (error) {
          console.log(error.response.data);
          setFormSubmission({
            status: false,
            value: "Submit",
            error: true,
            message: error.response.data.message,
          });
        }
      }
    } else {
      setFormSubmission({
        status: false,
        value: "Submit",
        error: true,
        message: "Please enter correct and required values in the fields.",
      });
    }
  };

  const handleCountryOptions = async (e) => {
    e.preventDefault();
    setFieldValue(e, "country_code");
    await getRegions(e.target.value);
  };

  const getRegions = async (rid) => {
    const response = await get(`/general/region_listing?region_id=${rid}`);
    if (response.status === 200) {
      console.log("state regions are: ", response.data.data);
      setRegions((prev) => {
        return {
          ...prev,
          states: response.data.data,
        };
      });
    }
  };

  const handleStateOptions = (e) => {
    e.preventDefault();
    setFieldValue(e, "region_id");
  };
  const handleCityOptions = (e) => {
    e.preventDefault();
    setFieldValue(e, "city");
  };

  const showEmptyFieldError = (step) => {
    let emptyFields = [];
    const stepOneFields = [
      "type",
      "i_am",
      "name",
      "email",
      "password",
      "mobile_number",
      "OTP",
      "designation",
      "we_are",
      "industry",
    ];
    const {
      type,
      i_am,
      we_are,
      name,
      email,
      password,
      mobile_number,
      OTP,
      designation,
      country_code,
      region_id,
      address,
      pin_code,
      company_name,
      gst_number,
      pan_number,
      city,
    } = fields;
    if (step === 1) {
      emptyFields = [];
      if (!type.value) emptyFields.push("type");
      if (!i_am.value) emptyFields.push("i_am");
      if (!name.value) emptyFields.push("name");
      if (!email.value) emptyFields.push("email");
      if (!password.value) emptyFields.push("password");
      if (!mobile_number.value) emptyFields.push("mobile_number");
      if (!OTP.value) emptyFields.push("OTP");
      if (i_am.value === I_AM.EMPLOYEE && !designation.value)
        emptyFields.push("designation");
      if (fields.type.value === TYPE.SELLER && !we_are.value)
        emptyFields.push("we_are");

      const nonEmptyStepOneFields = _.difference(stepOneFields, emptyFields);
      emptyFields.forEach((e) => setFieldValidation(null, e, false));
      nonEmptyStepOneFields.forEach((e) => setFieldValidation(null, e, true));
    }

    if (step === 2) {
      emptyFields = [];
      const stepTwoFields = [
        "company_name",
        "country_code",
        "region_id",
        "pin_code",
        "address",
        "pan_number",
        "gst_number",
        "city",
      ];
      if(fields.type.value  !=  "buyer"){
        // fields.i_am.value !== I_AM.INDIVIDUAL &&
        if ( !company_name.value)
           emptyFields.push("company_name");
      }
      if (!country_code.value) emptyFields.push("country_code");
      if (!region_id.value) emptyFields.push("region_id");
      if (!pin_code.value) emptyFields.push("pin_code");
      if (!address.value) emptyFields.push("address");
      if (!city.value) emptyFields.push("city");

      //  gst an pan are not required so if user has started putting it in, we'll remove the error.
      if (!pan_number.value) setFieldValidation(null, "pan_number", true);
      if (!gst_number.value) setFieldValidation(null, "gst_number", true);

      //if GST is entered and valid but not clicked on Verify.
      if (gst_number.value && !GSTrequest.clickEvent)
        setFieldValidation(null, "gst_number", false);

      const nonEmptyStepTwoFields = _.difference(stepTwoFields, emptyFields);
      emptyFields.forEach((e) => setFieldValidation(null, e, false));
      nonEmptyStepTwoFields.forEach((e) => setFieldValidation(null, e, true));
    }
  };

  const nextStep = async (e, extraRules = true, authorizeLogo = true) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    const {
      type,
      i_am,
      name,
      email,
      password,
      mobile_number,
      OTP,
      we_are,
      industry,
    } = fields;
    showEmptyFieldError(1);

    if (
      type.value &&
      type.validation &&
      i_am.value &&
      i_am.validation &&
      (fields.i_am.value === I_AM.EMPLOYEE ? fields.designation.value : true) &&
      (fields.type.value === TYPE.SELLER ? we_are.value : true) &&
      name.value &&
      name.validation &&
      email.value &&
      email.validation &&
      password.value &&
      password.validation &&
      mobile_number.value &&
      mobile_number.validation &&
      OTP.value &&
      OTP.validation &&
      extraRules &&
      authorizeLogo
    ) {
      setSteps({ ...steps, one: true, pageOne: !steps.pageOne });
    } else {
      if (!extraRules) {
        setFieldValidation(null, "OTP", false);
      }
      console.log(fields, "validation failed");
    }
  };

  const setFieldValue = (e, fname, fvalue = null, subValue = null) => {
    let value = e.target.value;
    if (subValue) {
      console.log(fields[fname].value[subValue]);
      setFields((prev) => {
        return {
          ...prev,
          [fname]: {
            ...prev[fname],
            value: {
              ...prev[fname].value,
              [subValue]: !prev[fname].value[subValue],
            },
          },
        };
      });
    } else {
      if (fvalue) {
        value = fvalue;
      }
      setFields((prev) => {
        return {
          ...prev,
          [fname]: {
            ...prev[fname],
            value,
            validation: true,
          },
        };
      });
    }
  };

  const setFieldValidation = (e, fname, validationResult) => {
    setFields((prev) => {
      return {
        ...prev,
        [fname]: {
          ...prev[fname],
          validation: validationResult,
        },
      };
    });
  };
  const [cityList, setCityList] = useState([]);
  const [FilterAvail, setFilterAvail] = useState({
    state_Id: "",
    city_Id: "",
    industry_Id: "",
    category_id: "",
    subcategory_id: "",
  });

  const onVerifyGST = async (e) => {
    e.preventDefault();
    if (GSTregx.test(fields.gst_number.value)) {
      setFieldValidation(null, "gst_number", true);
      const formdata = new FormData();
      try {
        formdata.append("gst_number", fields.gst_number.value);
        const response = await post("/general/get_gst_details", formdata);
        const { gst_details, pan_number, region, address } = response.data.data;
        setFieldValue({ target: { value: pan_number } }, "pan_number");
        setFieldValue({ target: { value: address } }, "address");
        setFieldValue(
          { target: { value: region?.parent?.parent?.id } },
          "country_code"
        );
        await getRegions(region?.parent?.parent?.id);
        setFieldValue({ target: { value: region?.parent?.id } }, "region_id");
        gst_details.pradr &&
          gst_details.pradr.addr &&
          setFieldValue(
            { target: { value: gst_details.pradr.addr.pncd } },
            "pin_code"
          );
        setFieldValue(
          { target: { value: gst_details.tradeNam } },
          "company_name"
        );
        setGSTrequest((prev) => {
          return {
            ...prev,
            clickEvent: true,
            data: JSON.stringify(response.data.data),
            sent: true,
            error: false,
          };
        });
      } catch (error) {
        console.log("ERROR while getting GST data", error);
        setGSTrequest((prev) => {
          return {
            ...prev,
            clickEvent: true,
            sent: false,
            error: true,
            message: error.response.data.message,
          };
        });
      }
    }
  };

  const isGSTDataLoaded =
    GSTrequest.sent && GSTrequest.clickEvent && !GSTrequest.error;

  /* eslint-disable camelcase */

  function City() {
    get(`/general/region_listing?region_id=${fields?.region_id?.value}`)
      .then((response) => {
        setCityList(response.data.data);
      })
      .catch((e) => {});
  }

  console.log(fields);
  return (
    <>
      <Header signup />
      <div className="signup-page">
        <div className="container-fluid">
          <div className="steps">
            <div className="steps__progressbar">
              <ul>
                <li className={steps.pageOne ? "active" : ""}>
                  <a href="" onClick={(e) => nextStep(e)}>
                    1
                  </a>
                </li>
                <li className={steps.pageOne ? "" : "active"}>
                  <a href="" onClick={(e) => nextStep(e)}>
                    2
                  </a>
                </li>
              </ul>
            </div>
            {steps.pageOne && (
              <StepOne
                fields={fields}
                setFields={setFields}
                steps={steps}
                setSteps={setSteps}
                nextStep={nextStep}
                setFieldValue={setFieldValue}
                setFieldValidation={setFieldValidation}
              />
            )}

            {!steps.pageOne && (
              <div className="steps__content">
                <div className="steps__indicator">
                  Step 2: Company Information!
                </div>
                <div className="steps__title">Company Information</div>
                <p>
                  Kindly write your company information for authentication. This
                  will help you to create verified business profile.
                </p>
                <form>
                  <div className="personal-info">
                    <div className="grid">
                      <div className="form-field">
                        <label className="form-label">
                          GST number
                          <span className="tooltip-icon">
                            <OverlayTrigger
                              key="gst-tip"
                              placement="top"
                              overlay={
                                <Tooltip id="tooltip-gst-tip">
                                  Kindly write your company's GST number to
                                  verify
                                </Tooltip>
                              }
                            >
                              <InfoIcon />
                            </OverlayTrigger>
                          </span>
                        </label>
                        <input
                          type="text"
                          name="gst_number"
                          className="form-input"
                          placeholder="Enter your GST number"
                          value={fields.gst_number.value}
                          onChange={(e) => {
                            setFieldValue(e, "gst_number");
                            setGSTrequest((prev) => {
                              return {
                                ...prev,
                                clickEvent: false,
                                sent: false,
                                error: false,
                                message: "",
                              };
                            });
                          }}
                          onBlur={(e) => {
                            fields.gst_number.value &&
                              setFieldValidation(
                                e,
                                "gst_number",
                                GSTregx.test(e.target.value)
                              );
                          }}
                        />
                        <button
                          type="button"
                          className={`button ${
                            GSTrequest.sent
                              ? "button-green"
                              : GSTrequest.error
                              ? "button-red"
                              : "button-primary"
                          } button-otp`}
                          disabled={
                            !GSTregx.test(fields.gst_number.value) ||
                            GSTrequest.clickEvent
                          }
                          onClick={onVerifyGST}
                        >
                          {GSTrequest.sent ? (
                            <TickIcon />
                          ) : GSTrequest.error ? (
                            <CloseIcon />
                          ) : GSTrequest.clickEvent ? (
                            "Loading..."
                          ) : (
                            "Verify"
                          )}
                        </button>
                        {!fields.gst_number.validation && (
                          <FieldValidationError name="GST number and click on Verify" />
                        )}
                        {GSTrequest.clickEvent && GSTrequest.error && (
                          <FieldValidationError message={GSTrequest.message} />
                        )}
                      </div>
                      <div className="form-field">
                        <label className="form-label">
                          PAN <span>(associated with GST)</span>
                        </label>
                        <input
                          type="text"
                          name="pan"
                          className="form-input"
                          placeholder="Enter your PAN number"
                          value={fields.pan_number.value}
                          disabled={isGSTDataLoaded && fields.pan_number.value}
                          onChange={(e) => setFieldValue(e, "pan_number")}
                          onBlur={(e) => {
                            fields.pan_number.value &&
                              setFieldValidation(
                                e,
                                "pan_number",
                                isLength(e.target.value, {
                                  min: 10,
                                  max: 10,
                                }) && isAlphanumeric(e.target.value)
                              );
                          }}
                        />
                        {!fields.pan_number.validation && (
                          <FieldValidationError name="PAN" />
                        )}
                      </div>
                      <div className="form-field">
                        <label className="form-label">
                          Company name
                          {fields.type.value  ===  "seller" ?   <span className="mendatory"> *</span> : "" }

                        </label>
                        <input
                          type="text"
                          ame="company"
                          className="form-input"
                          placeholder="Enter your company name"
                          required={fields.i_am.value !== I_AM.INDIVIDUAL}
                          value={fields.company_name.value}
                          onChange={(e) => setFieldValue(e, "company_name")}
                          disabled={isGSTDataLoaded && fields.company_name}
                          onBlur={(e) =>
                            setFieldValidation(
                              e,
                              "company_name",
                              isLength(e.target.value, { max: 255 })
                            )
                          }
                        />
                        {!fields.company_name.validation && (
                          <FieldValidationError name="Company" />
                        )}
                      </div>
                      <div className="form-field">
                        <label className="form-label">
                          Country <span className="mendatory">*</span>
                        </label>
                        <select
                          className="form-input"
                          value={fields.country_code.value}
                          onChange={handleCountryOptions}
                          disabled={
                            isGSTDataLoaded && fields.country_code.value
                          }
                        >
                          <option key="first" value="">
                            {" "}
                            ---COUNTRIES---{" "}
                          </option>
                          {regions.countries.map((c) => {
                            return (
                              <option value={c.id} key={c.name}>
                                {c.name}
                              </option>
                            );
                          })}
                        </select>
                        {!fields.country_code.validation && (
                          <FieldValidationError name="country" />
                        )}
                      </div>
                      <div className="form-field ">
                        <label className="form-label">
                          State <span className="mendatory">*</span>
                        </label>
                        <select
                          className="form-input"
                          value={fields?.region_id?.value}
                          onChange={handleStateOptions}
                          disabled={isGSTDataLoaded && fields?.region_id?.value}
                        >
                          <option key="first" value="">
                            {" "}
                            ---STATES---{" "}
                          </option>
                          {regions.states.map((s) => {
                            return (
                              <option value={s.id} key={s.id}>
                                {s.name}
                              </option>
                            );
                          })}
                        </select>
                        {!fields.region_id.validation && (
                          <FieldValidationError name="State" />
                        )}
                      </div>
                      {/* <div className="form-field ">
                        <label className="form-label">
                          City <span className="mendatory">*</span>
                        </label>
                        <select
                          className="form-input"
                          value={fields?.region_id?.value}
                          onChange={handleStateOptions}
                          disabled={isGSTDataLoaded && fields?.region_id?.value}
                        >
                          <option key="first" value="">
                            {" "}
                            ---City---{" "}
                          </option>
                          {regions.states.map((s) => {
                            return (
                              <option value={s.id} key={s.id}>
                                {s.name}
                              </option>
                            );
                          })}
                        </select>
                        {!fields.region_id.validation && (
                          <FieldValidationError name="State" />
                        )}
                      </div> */}
                      <div className="form-field ">
                        <label className="form-label">
                          City <span className="mendatory">*</span>{" "}
                        </label>

                        <select
                          className="form-input"
                          value={fields?.city?.value}
                          onFocus={(e) => {
                            e.preventDefault();
                            City();
                          }}
                          onChange={handleCityOptions}
                        >
                          <option key="first" value="">
                            {" "}
                            ---City---{" "}
                          </option>
                          {cityList.map((s) => {
                            return (
                              <option value={s.id} key={s.id}>
                                {s.name}
                              </option>
                            );
                          })}
                        </select>

                        {!fields.city.validation && (
                          <FieldValidationError name="city" />
                        )}
                      </div>
                      <div className="form-field">
                        <label className="form-label">
                          Pincode <span className="mendatory">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          className="form-input"
                          placeholder="Enter your pincode"
                          value={fields.pin_code.value}
                          onChange={(e) => setFieldValue(e, "pin_code")}
                          disabled={isGSTDataLoaded && fields.pin_code.value}
                          onBlur={(e) =>
                            setFieldValidation(
                              e,
                              "pin_code",
                              isPostalCode(e.target.value, "IN")
                            )
                          }
                        />
                        {!fields.pin_code.validation && (
                          <FieldValidationError name="pin code" />
                        )}
                      </div>
                      <div className="form-field">
                        <label className="form-label">
                          Address <span className="mendatory">*</span>
                          <span className="tooltip-icon">
                            <OverlayTrigger
                              key="mobile-tip"
                              placement="top"
                              overlay={
                                <Tooltip id="tooltip-mobile-tip">
                                  You can modify the address if you need
                                </Tooltip>
                              }
                            >
                              <InfoIcon />
                            </OverlayTrigger>
                          </span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="form-input"
                          placeholder="Enter your address"
                          required
                          value={fields.address.value}
                          disabled={isGSTDataLoaded && fields.address.value}
                          onChange={(e) => setFieldValue(e, "address")}
                          onBlur={(e) =>
                            setFieldValidation(
                              e,
                              "address",
                              isLength(e.target.value, { max: 255 })
                            )
                          }
                        />
                        {!fields.address.validation && (
                          <FieldValidationError name="address" />
                        )}
                      </div>
                      <div className="form-button">
                        <button
                          className={`button ${
                            formSubmission.status
                              ? "button-green"
                              : "button-primary"
                          } button-hasIcon`}
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {formSubmission.value}
                        </button>
                        {formSubmission.error && (
                          <p className="error-message">
                            <CloseCircleLineIcon />{" "}
                            {formSubmission.message ||
                              "Signup Unsuccessful! Please try again after some time."}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
