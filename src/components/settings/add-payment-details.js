import { useContext, useEffect, useState } from "react";
import "../../common/scss/pages/settings.scss";
import Auth from "../../libs/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FieldValidationError from "../error-messages/field-validation-error";
import validator from "validator";
import PuffLoader from "react-spinners/PuffLoader";
import { ReactComponent as TickIcon } from '../../assets/images/tick-icon.svg';

function AddPaymentDetails(data) {
  const navigate = useNavigate();
  const { isLength, isMobilePhone, isStrongPassword, isEmail, isNumeric } =
    validator;
  const user = Auth.getCurrentUser();
  const [PaymentData, setPaymentData] = useState({
    name: "Payment Data Details",
    bank_account_number: "",
    bank_account_ifsc_code: "",
    consent: "Y",
    bank_branch: "",
    bank_name: "",
    email: "",
    mobile_number: "",
  });

  const [Verify, setVerify] = useState(false);
  const [Error, setError] = useState(false);
  const [WrongDetails, setWrongDetails] = useState(false);
  const [MobiledataError, setMobileDataErrror] = useState(false);
  const [Loading,setLoading] = useState({
    BankVerify :false,
    SaveBank:false
  });
  const [Validation, setValidation] = useState({
    email: false,
    mobile_number: false,
  });
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setPaymentData(data.PaymentDetails);

    setPaymentData({ ...PaymentData, name: "PayMent Details" });
  }, []);


  const [NullError, setNullError] = useState({
    bank_account_number: false,
    bank_account_ifsc_code: false,
    bank_branch: false,
    bank_name: false,
    email: false,
    mobile_number: false,
  });

  const [bank_Name,setBankname]= useState('');

  useEffect(()=>{
    setPaymentData({...PaymentData,bank_name:bank_Name})
  },[bank_Name])

  async function VerifyBankDetails(e) {
    e.preventDefault();
    setPaymentData({ ...PaymentData, consent: "Y" });

    if (PaymentData.bank_account_ifsc_code.trim() === "") {
      setNullError({ ...NullError, bank_account_ifsc_code: true });
      setLoading({...Loading,BankVerify:false})
      return false;
    }
    if (PaymentData.bank_account_number.trim() === "") {
      setNullError({ ...NullError, bank_account_number: true });
      setLoading({...Loading,BankVerify:false})
      return false;
    }
    const response = await axios
      .post(
        "https://api.busimeet.com/api/V1/general/get_bank_account_details",
        PaymentData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          // setError(true);
          if(res?.data?.data?.bank_name){


            // alert("h")
            // alert(res.data.data.bank_name)
            setBankname(res.data.data.bank_name);
            // setPaymentData({...PaymentData,bank_name:res?.data?.data?.bank_name})

          }
          if(res?.data?.data?.branch){       
          setPaymentData({...PaymentData,bank_branch:res?.data?.data?.branch})
          }



          setLoading({...Loading,BankVerify:false})
          setVerify(true);
          // alert(res?.data?.bank_name,res?.data?.branch)
    
        }
      })
      .catch((e) => {
        setLoading({...Loading,BankVerify:false})
        setVerify(false);
        setWrongDetails(true);

      });
  }
  async function AddPaymentData(e) {
    e.preventDefault();

    if (!(Verify === true)) {
      setError(true);
      return false;
    }

    setPaymentData({...PaymentData,consent:undefined})
    if (PaymentData.mobile_number.trim() === "") {
      setNullError({ ...NullError, mobile_number: true });
      setLoading({...Loading,SaveBank:false})
      return false;
    }

    if (PaymentData.email.trim() === "") {
      setNullError({ ...NullError, email: true });
      setLoading({...Loading,SaveBank:false})

      return false;
    }
    if (PaymentData.bank_name === "") {
      setNullError({ ...NullError, bank_name: true });
      setLoading({...Loading,SaveBank:false})

      return false;
    }

    if (PaymentData.bank_branch === "") {
      setNullError({ ...NullError, bank_branch: true });
      setLoading({...Loading,SaveBank:false})

      return false;
    }

    if (!(isMobilePhone(PaymentData.mobile_number))) {
      setValidation({ ...Validation, mobile_number: true });
      setLoading({...Loading,SaveBank:false})

      return false;
    }
    if (!(isEmail(PaymentData.email))) {
      setValidation({ ...Validation, email: true });
      setLoading({...Loading,SaveBank:false})


      return false;
    }
    const response = await axios
      .post(
        "https://api.busimeet.com/api/V1/user/setting/payment_details",
        PaymentData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if(res.status === 200)
        {      setLoading({...Loading,SaveBank:false})

          data.UpdateTrue();
        }
        setLoading({...Loading,SaveBank:false})
      })
  }
  return (
    <>
      <div className="edit-details">
        <div className="section-title">
          <h6>Enter Payment Details</h6>
        </div>
        <form>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Bank Account Number</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Your Bank Account Number"
                  value={PaymentData?.bank_account_number}
                  onChange={(e) => {
                    setPaymentData({
                      ...PaymentData,
                      bank_account_number: e.target.value,
                    });
                    setNullError({ ...NullError, bank_account_number: false });
                  }}
                />
                {NullError.bank_account_number === true ? (
                  <FieldValidationError message="Please Provide Valid IFSC Code  " />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">BANK IFSC CODE</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Your Bank IFSC Code"
                  value={PaymentData?.bank_account_ifsc_code}
                  onChange={(e) => {
                    setPaymentData({
                      ...PaymentData,
                      bank_account_ifsc_code: e.target.value,
                    });
                    setNullError({
                      ...NullError,
                      bank_account_ifsc_code: false,
                    });
                  }}
                />

                {NullError.bank_account_ifsc_code === true ? (
                  <FieldValidationError message="Please Provide Valid IFSC Code  " />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-button">
              <button
                className={
                  Verify === true
                    ? " button button-success button-verify btn btn-success"
                    : "button button-verify button-secondary"
                }
                onClick={(e) => {
                  setLoading({...Loading,BankVerify:true})
                  VerifyBankDetails(e);
                }}

              >
                {Verify === true ? <TickIcon /> : Loading?.BankVerify === true ? <PuffLoader loading={true} size={15} />: "Verify"}
              </button>
            </div>
          </div>
          <div className="form-group form-field form-check text-right">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              required
              checked={true}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              I'm authorize to use this. &nbsp;
            </label>

            <Link to={"/terms-and-conditions"}>Terms & Condition</Link>
          </div>
          {WrongDetails === true ? (
            <FieldValidationError message="Please Provide Valid Details About Your Company Bank Details  " />
          ) : (
            ""
          )}
          {Error === true ? (
            <FieldValidationError message="Please First Verify Your Bank Details  " />
          ) : (
            ""
          )}
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  disabled
                  className="form-input"
                  placeholder="Bank Name "
                  value={PaymentData?.bank_name}
                  onChange={(e) => {
                    setPaymentData({
                      ...PaymentData,
                      bank_name: e.target.value,
                    });
                    setNullError({ ...NullError, bank_name: false });
                  }}
                />
                {NullError.bank_name === true ? (
                  <FieldValidationError message="Please Enter the Bank Name  :" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Bank Branch</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  disabled

                  className="form-input"
                  placeholder="Bank Branch"
                  value={PaymentData?.bank_branch}
                  onChange={(e) => {
                    setPaymentData({
                      ...PaymentData,
                      bank_branch: e.target.value,
                    });
                    setNullError({ ...NullError, bank_branch: false });
                  }}
                />

                {NullError.bank_branch === true ? (
                  <FieldValidationError message="Please Enter the Bank Branch  :" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">
                  Concern Person Contact Details (Phone/Mobile)
                </label>
                <input
                  type="text"
                  pattern="\d*"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Phone/Mobile"
                  value={PaymentData?.mobile_number}
                  onChange={(e) => {
                    setPaymentData({
                      ...PaymentData,
                      mobile_number: e.target.value,
                    });
                    setNullError({ ...NullError, mobile_number: false });
                    setValidation({ ...Validation, mobile_number: false });
                  }}
                  maxlength="10"
                />

                {NullError.mobile_number === true ? (
                  <FieldValidationError message="Please Enter the Mobile Number :" />
                ) : (
                  ""
                )}
                {Validation.mobile_number === true ? (
                  <FieldValidationError message="Please Enter the Valid Mobile Number :" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Concern Person Email ID</label>
                <input
                  type="email"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Email ID"
                  value={PaymentData?.email}
                  onChange={(e) => {
                    setPaymentData({ ...PaymentData, email: e.target.value });
                    setNullError({ ...NullError, email: false });
                    setValidation({ ...Validation, email: false });
                  }}
                />
                {NullError.email === true ? (
                  <FieldValidationError message="Please Enter the email :" />
                ) : (
                  ""
                )}

                {Validation.email === true ? (
                  <FieldValidationError message="Please Enter the Valid Email :" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="form-button">
            <button
              className="button button-primary"
              onClick={(e) => {
                setLoading({...Loading,SaveBank:true})
                AddPaymentData(e);
              }}
            >
                        {Loading === true ? <PuffLoader loading={true} size={15} /> : "Save Details"}

    
            </button>
            <button className="button button-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPaymentDetails;
