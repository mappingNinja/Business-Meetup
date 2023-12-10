import { useContext, useEffect, useRef, useState } from "react";
import "../../common/scss/pages/settings.scss";
import CompanyLogo from "../../assets/images/company-logo.png";
import { ReactComponent as TickIcon } from "../../assets/images/tick-icon.svg";
import AddCompanyDetails from "./add-company-details";
import AddPaymentDetails from "./add-payment-details";
import AddContactDetails from "./add-contact-details";
import AddCreditPolicy from "./add-credit-policy";
import Auth from "../../libs/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { get, getAuthConfig, post, postwithOu } from "../../libs/http-hydrate";
import FieldValidationError from "../error-messages/field-validation-error";
import validator from "validator";
import ContentEditable from "react-contenteditable";
import { set } from "lodash";
import { PuffLoader } from "react-spinners";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function PreFilledForm() {
  const text = useRef("");
  const location = useLocation();

  const { isLength, isMobilePhone, isStrongPassword, isEmail, isNumeric } =
    validator;
    const GSTregx = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const [addCompany, setAddCompany] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [addSendContact, setAddSendConatct] = useState(false);
  const [addCredit, setAddCredit] = useState(false);
  const navigate = useNavigate();
  const user = Auth.getCurrentUser();
  const [AllDetails, setAllDetails] = useState({});
  const [EditData, setEditData] = useState({});
  const [Error, setError] = useState({
    billing_address:false,
    gst_number:false,
    gst_Verify:false,
    gst_RegEx:"",
    DuplicateGst:false,
    LoadingGstVerfication:false,
    ResponseErr:false,
    ResponseErrmsg:"",
    ItsGstCall:false
  });
  const [gst_fetched_Data, setgst_fetched_Data] = useState({})
  const [EditParCompany, setEditParCompany] = useState({});
  const [CreditPolicy, setCreditPolicy] = useState({});
  const [PayMentDetails, setPayMentDetails] = useState({});
  const [NullPayMentDetails, setNullPayMentDetails] = useState({
    email: false,
    mobile_number: false,
  });
  const [validationPayMentDetails, setvalidationPayMentDetails] = useState({
    email: false,
    mobile_number: false,
  });

  const [NullError, setNullError] = useState({
    name: false,
    mobile_number: false,
    email: false,
    id: null,
  });

  const [Update, setSupdate] = useState(false);
  const [Validation, setValidationError] = useState({
    mobile_number: false,
    email: false,
    whatsapp_number: false,
  });

  const [NullValidationCred, setNullValidationCred] = useState({
    credit_period: false,
    delay_interest: false,
    advance_transaction: false,
    credit_period_start: false,
    interest_period:false 
  });

  const [ValidationCred, setValidationCred] = useState({
    credit_period: false,
    delay_interest: false,
    advance_transaction: false,
    credit_period_start: false,
  });

  const [EditLoading, setEditLoading] = useState({
    EdCm: false,
    EdPd: false,
    EdCn: false,
    EdCp: false,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCon, setShowCon] = useState(false);

  const handleCloseCon = () => setShowCon(false);
  const handleShowCon = () => setShowCon(true);

  const [showCred, setShowCred] = useState(false);

  const handleCloseCred = () => setShowCred(false);
  const handleShowCred = () => setShowCred(true);

  const [showPay, setShowPay] = useState(false);

  const handleClosePay = () => setShowPay(false);
  const handleShowPay = () => {
    setShowPay(true);
    setPaymentRESErr("");
  };
  const [PaymentRESErr, setPaymentRESErr] = useState("");
  useEffect(() => {
    if (Update === true) {
      GetCompanydDetails();
    }
  }, [Update]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      GetCompanydDetails();
    }

  }, []);

  const [editContact, setEditContact] = useState({});

  async function EditCompanyDetails(id) {
    EditData.logo = undefined;
    // EditData.name = "JYOTI TRADING CORPORATION";
    if (EditData.gst_number.trim() === "") {
      setError({...Error, gst_number:true});
      setEditLoading({ ...EditLoading, EdCm: false });
      return false;
    }
    if (EditData.billing_address.trim() === "") {
      setError({...Error, billing_address:true});
      setEditLoading({ ...EditLoading, EdCm: false });
      return false;
    }

    const baseurl = "/user/setting/company_details/edit/";
    const url = baseurl + id;
    // alert(EditData.name)
    const data = await postwithOu(url, getAuthConfig(), EditData);
    if (data.status === 200) {
      GetCompanydDetails();
      setEditLoading({ ...EditLoading, EdCm: false });
      handleClose();
    }
  }
  async function GetCompanydDetails() {
    const response = await axios
      .get(
        "https://api.busimeet.com/api/V1/user/setting/get_prefilled_details",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res?.data?.status === 200) {
          setAllDetails(res.data.data);
          setEditData(res.data.data.company_details);
          setCreditPolicy(res.data.data.credit_policy);
          setPayMentDetails(res.data.data.payment_details);
        }
      });
  }
  async function EditDataMth(item) {
    console.log(item);
    console.log(editContact);
    if (item.mobile_number.trim() === "") {
      setNullError({ ...NullError, mobile_number: true });
      setEditLoading({ ...EditLoading, EdCn: false });
      return false;
    }
    if (item.email.trim() === "") {
      setNullError({ ...NullError, email: true });
      setEditLoading({ ...EditLoading, EdCn: false });

      return false;
    }

    if (!isMobilePhone(item.mobile_number, "en-IN")) {
      setValidationError({ ...Validation, mobile_number: true });
      setEditLoading({ ...EditLoading, EdCn: false });

      return false;
    }
    if (!isEmail(item.email)) {
      setValidationError({ ...Validation, email: true });
      setEditLoading({ ...EditLoading, EdCn: false });

      return false;
    }

    const baseurl = "/user/setting/contact/edit/";
    const url = baseurl + item.id;

    const data = await postwithOu(url, getAuthConfig(), item);
    data.status === 200 && GetCompanydDetails();
    setEditLoading({ ...EditLoading, EdCn: false });
    handleCloseCon();
  }

  async function EditCreditPolicy(e) {
    e.preventDefault();
    // alert("hello")
    if (CreditPolicy?.delay_interest == "") {
      setNullValidationCred({ ...NullValidationCred, delay_interest: true });
      setEditLoading({ ...EditLoading, EdCp: false });

      return false;
    }

    if (CreditPolicy?.credit_period === "") {
      setNullValidationCred({ ...NullValidationCred, credit_period: true });
      setEditLoading({ ...EditLoading, EdCp: false });

      return false;
    }
    if (CreditPolicy?.advance_transaction === "") {
      setNullValidationCred({
        ...NullValidationCred,
        advance_transaction: true,
      });
      setEditLoading({ ...EditLoading, EdCp: false });

      return false;
    }

    if (CreditPolicy?.credit_period_start === "") {
      setNullValidationCred({
        ...NullValidationCred,
        credit_period_start: true,
      });
      setEditLoading({ ...EditLoading, EdCp: false });

      return false;
    }

    if (CreditPolicy?.interest_period.trim() === "") {
      setNullValidationCred({
        ...NullValidationCred,
        interest_period: true,
      });
      setEditLoading({ ...EditLoading, EdCp: false });

      return false;
    }
    if (!isNumeric(CreditPolicy.advance_transaction.toString())) {
      setValidationCred({ ...ValidationCred, advance_transaction: true });
      setEditLoading({ ...EditLoading, EdCp: false });

      return false;
    }

    if (!isNumeric(CreditPolicy.delay_interest.toString())) {
      setValidationCred({ ...ValidationCred, delay_interest: true });
      setEditLoading({ ...EditLoading, EdCp: false });

      return false;
    }

    const baseurl = "/user/setting/credit_policy";

    const data = await postwithOu(baseurl, getAuthConfig(), CreditPolicy);
    if (data.status === 200) {
      GetCompanydDetails();
      setEditLoading({ ...EditLoading, EdCp: false });
      handleCloseCred();
    } else {
      setEditLoading({ ...EditLoading, EdCp: false });
      handleCloseCred();
    }
  }

  async function EditPayMnetDetails(e) {
    if (PayMentDetails.mobile_number === "") {
      setNullPayMentDetails({ ...NullPayMentDetails, mobile_number: true });
      setEditLoading({ ...EditLoading, EdPd: false });

      return false;
    }
    if (PayMentDetails.email === "") {
      setNullPayMentDetails({ ...NullPayMentDetails, email: true });
      setEditLoading({ ...EditLoading, EdPd: false });

      return false;
    }
    if (!isMobilePhone(PayMentDetails.mobile_number)) {
      setvalidationPayMentDetails({
        ...validationPayMentDetails,
        mobile_number: true,
      });
      setEditLoading({ ...EditLoading, EdPd: false });

      return false;
    }
    if (!isEmail(PayMentDetails.email)) {
      setvalidationPayMentDetails({ ...validationPayMentDetails, email: true });
      setEditLoading({ ...EditLoading, EdPd: false });
      return false;
    }
    const baseurl = "/user/setting/payment_details";

    const data = await postwithOu(baseurl, getAuthConfig(), PayMentDetails)
      .then((e) => {
        handleClosePay();
        setEditLoading({ ...EditLoading, EdPd: false });
        GetCompanydDetails();
      })
      .catch((e) => {
        setEditLoading({ ...EditLoading, EdPd: false });
        console.log(e);
        setPaymentRESErr(e.response.data.message);
      });
    //     if (data.status === 200) {
    //       handleClosePay();
    //       setEditLoading({...EditLoading,EdPd:false})
    //       GetCompanydDetails();
    //     }
    //     else{
    // alert("hey")
    //       alert(data.message);
    //       setEditLoading({...EditLoading,EdPd:false})

    //     }
  }
  function UpdateTrue() {
    // alert("inside Trur")
    setSupdate(true);

    if (addCompany === true) {
      setAddCompany(false);
    }
    GetCompanydDetails();
    setAddSendConatct(false);
    setAddPayment(false);
    setAddCredit(false);
  }
  function UpdateFalse() {
    setSupdate(false);
  }



  async function GstVerification(e) {
    e.preventDefault();
    setError((p) =>({...p,LoadingGstVerfication:true}))
    const formdata = new FormData();
    formdata.append("gst_number",EditData?.gst_number);
    const response = await post("/general/get_gst_details", formdata).then((res)=>{

      if(res.status === 200){
        setError((p) =>({...p,LoadingGstVerfication:false}));
        setError((p) =>({...p,gst_Verify:true}));
        setgst_fetched_Data(res.data.data);
        setEditData((p)=>({...p,pan_number:res.data.data.pan_number}))
        setEditData((p)=>({...p,name:res.data.data.gst_details?.tradeNam}))
        setEditData((p)=>({...p,shipping_address:res.data.data.address}))
        setEditData((p)=>({...p,billing_address:res.data.data.address}))
          EditData.region.parent.name = res?.data?.data?.region?.parent?.name;
          EditData.region.name = res?.data?.data?.region?.name

      }
    }).catch((err)=>{

      console.log(err)
      if(err.response.status === 400)
      {
        setError((p) =>({...p,LoadingGstVerfication:false}))
       setError((p)=>({...p,DuplicateGst:true}));
      //  setGstLoading(false)

      }
      if(err.response.status === 429)
      {
        setError((p) =>({...p,LoadingGstVerfication:false}))
        alert("Too many request in the Short Time , Please Wait for Some time");
        // setGstLoading(false);

      }

    })


  
    
  
  
  }

  async function EditCompanyData(e)  {
    // console.log(props.UpdateTrue)
      e.preventDefault();
      const url = "/user/setting/company_details/edit/" + EditData?.id;
      const formdata = new FormData();
      formdata.append("gst_number", EditData?.gst_number);
      formdata.append("email",EditData?.email);
      formdata.append("billing_address", EditData?.address);
      formdata.append("mobile_number", EditData?.mobile_number);
      formdata.append("pan_number",gst_fetched_Data?.pan_number );
      formdata.append("region_id" , gst_fetched_Data?.region?.id);
      formdata.append("name" , gst_fetched_Data?.gst_details?.tradeNam);
      formdata.append("shipping_address",gst_fetched_Data?.address);
      const response = await post(url, formdata,getAuthConfig()).then((res)=>{
        if(response.status === 200){
          GetCompanydDetails();
          setEditLoading({ ...EditLoading, EdCm: false });
          handleClose();
        }
      }).catch((err)=>{
      
      
        setError((p) =>({...p,ResponseErr :true }))

          setError((p) =>({...p,ResponseErrmsg : err.response.message}))
      })
  
  
    };

  return (
    <>
      <div className="prefilled-form">
        <div className="section-title">
          <h6>Manage Prefilled Forms</h6>
        </div>
        <div id="exTab1" class="tabs tabs--solid">
          <ul class="nav nav-pills">
            <li className="">
              <a href="#1a" data-toggle="tab" className={location?.state?.gst === "true" ? "active": location?.state?.pay === "true" ? "" : "active"}>
                Company details
              </a>
            </li>
            <li>
              <a href="#2a" data-toggle="tab" className={location?.state?.pay === "true" ? "active" : ""}>
                Payment details
              </a>
            </li>
            <li>
              <a href="#3a" data-toggle="tab">
                Send contact
              </a>
            </li>
            <li>
              <a href="#4a" data-toggle="tab">
                Credit policy
              </a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className={location?.state?.gst === "true" ? "tab-pane company-detail active": location?.state?.pay === "true" ? " tab-pane company-detail" : " tab-pane company-detail active"} id="1a">
              <button
                onClick={() => setAddCompany(true)}
                className={
                  AllDetails?.company_details?.gst_number === null
                    ? `button btn-sm  button-primary button-add`
                    : ` button btn-sm button-add button-disabled`
                }
                disabled={
                  AllDetails?.company_details?.gst_number === null
                    ? false
                    : true
                }
              >
                + Add
              </button>

              {AllDetails?.company_details?.gst_number != null ? (
                <>
                  {" "}
                  <div className="flex-box">
                    <div className="flex-item">
                      <input
                        type="radio"
                        name="company_detail"
                        id="company_detail"
                      />
                      <label htmlFor="company_detail">
                        <span className="tick-mark">
                          <TickIcon />
                        </span>
                        <div className="company-detail--filled">
                          <div className="company-profile">
                            <div className="company-profile-image">
                              <img
                                src={AllDetails?.company_details?.logo}
                                className="profile-pic"
                              />
                            </div>
                            <div className="company-profile-content">
                              <div className="company-profile-name">
                                <h6>{AllDetails?.company_details?.name}</h6>
                                <ul>
                                  <li>
                                    <label>GST</label>:
                                    <span>
                                      {AllDetails?.company_details?.gst_number}{" "}
                                      <span className="verified">
                                        <TickIcon />
                                      </span>
                                    </span>
                                  </li>
                                  <li>
                                    <label>PAN NO</label>:
                                    <span>
                                      {AllDetails?.company_details?.pan_number}{" "}
                                      <span className="verified">
                                        <TickIcon />
                                      </span>
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="company-info">
                            <div className="info-box">
                              <div className="info-item">
                                <label>Shipping Address</label>
                                <span>
                                  {
                                    AllDetails?.company_details
                                      ?.shipping_address
                                  }
                                </span>
                                {/* <input
                                 style={{"background":"none","border":"none","width":"100%","height":"fit-content"}}
                                  type="text"
                                  value={EditData?.shipping_address}
                                  onChange={(e) => {
                                    setEditData({
                                      ...EditData,
                                      shipping_address: e.target.value,
                                    });
                                    setError(false);
                                  }}
                               
                                  
                                /> 
                        

                          
                               
                                {Error === true ? (
                                  <FieldValidationError message="Shhiping Address Is Required" />
                                ) : (
                                  ""
                                )} */}
                              </div>
                              <div className="info-item">
                                <label>Billing Address</label>
                                {/* <span >
                                  {AllDetails?.company_details?.billing_address}
                                </span> */}

                                <span>
                                  {AllDetails?.company_details?.billing_address}
                                </span>
                                {/* <input
                                 style={{"background":"none","border":"none","width":"100%","height":"fit-content"}}
                                  type="text"
                                  value={AllDetails?.company_details?.billing_address}
                                 
                                  
                                />  */}
                              </div>
                              <div className="row">
                                <div className="col-sm">
                                  <div className="info-item">
                                    <label>STATE</label>
                                    <span>
                                      {
                                        AllDetails?.company_details?.region
                                          ?.parent?.name
                                      }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-sm">
                                  <div className="info-item">
                                    <label>STATE CODE</label>
                                    <span>
                                      {AllDetails?.company_details?.gst_number.substring(
                                        0,
                                        2
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm">
                                  <div className="info-item">
                                    <label>MOBILE NUMBER</label>
                                    <span>
                                      {
                                        AllDetails?.company_details
                                          ?.mobile_number
                                      }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-sm">
                                  <div className="info-item">
                                    <label>EMAIL ID</label>
                                    <span>
                                      {AllDetails?.company_details?.email}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="button-wrap">
                            <button
                              className="button button-blue"
                              onClick={() => {
                                handleShow();

                                //                               setEditLoading({...EditLoading,EdCm:true})

                                // EditCompanyDetails(EditData?.id);
                              }}
                            >
                              {EditLoading?.EdCm === true ? (
                                <PuffLoader loading={true} size={15} />
                              ) : (
                                "Edit Details"
                              )}
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center text-danger">
                    <h4 style={{ fontSize: "20px" }}>
                      {addCompany === true
                        ? ""
                        : "To verify your profile, please submit your GST number."}
                    </h4>
                  </div>
                </>
              )}

              {addCompany || location?.state?.gst === "true" ? (
                <>
                  <div className="card">
                    <div className="card-body">
                      <AddCompanyDetails
                        TestIngData={AllDetails?.company_details}
                        UpdateTrue={UpdateTrue}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className={ location?.state?.pay === "true" ? "tab-pane payment-details active" : "tab-pane payment-details "} id="2a">
              <button
                className={
                  AllDetails?.payment_details?.bank_account_number === undefined
                    ? `button button-primary button-add`
                    : ` button button-add btn-sm button-disabled`
                }
                disabled={
                  AllDetails?.payment_details?.bank_account_number === undefined
                    ? false
                    : true
                }
                onClick={() => setAddPayment(true)}
              >
                + Add
              </button>

              {addPayment === true ? (
                ""
              ) : AllDetails?.payment_details?.bank_account_number ===
                undefined ? (
                <div className="text-center text-danger">
                  <h4 style={{ fontSize: "20px" }}>
                    To verify your profile, please submit your payment details.
                  </h4>
                </div>
              ) : (
                ""
              )}
              {AllDetails?.payment_details?.bank_account_number ===
              undefined ? (
                " "
              ) : (
                <>
                  {" "}
                  <div className="payment-info">
                    <div className="info-box">
                      <div className="info-item">
                        <label>Concern Person Contact Details</label>
                        <span>
                          {AllDetails?.payment_details?.mobile_number}{" "}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Concern Person Email</label>

                        <span>{AllDetails?.payment_details?.email}</span>
                      </div>
                      <div className="info-item">
                        <label>BANK NAME</label>
                        <span contenteditable="false">
                          {AllDetails?.payment_details?.bank_name}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>BANK IFSC CODE</label>
                        <span contenteditable="false">
                          {AllDetails?.payment_details?.bank_account_ifsc_code}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>BANK ACCOUNT NO</label>
                        <span contenteditable="false">
                          {AllDetails?.payment_details?.bank_account_number}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Bank Branch</label>
                        <span contenteditable="false">
                          {AllDetails?.payment_details?.bank_branch}
                        </span>
                      </div>
                    </div>
                    <div className="button-wrap">
                      <button
                        className="button button-blue"
                        onClick={() => {
                          handleShowPay();
                          // setEditLoading({...EditLoading,EdPd:true})
                          // EditPayMnetDetails()
                        }}
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>
                </>
              )}

              {      addPayment || location?.state?.pay === "true" && AllDetails?.payment_details?.bank_account_number ===
              undefined ? (
                <>
                  <div className="card payment-info">
                    <div className="card-body">
                      <AddPaymentDetails
                        PaymentDetails={AllDetails?.payment_details}
                        UpdateTrue={UpdateTrue}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="tab-pane send-contact" id="3a">
              <button
                className="button button-primary button-add"
                onClick={() => setAddSendConatct(true)}
              >
                + Add
              </button>
              <div className="flex-box row">
                {AllDetails?.contacts?.length === 0 ? (
                  <>
                    <div className="text-center text-danger full-width">
                      <h4 style={{ fontSize: "20px" }}>
                        {addSendContact === true ? "" : "No record found!!"}
                      </h4>
                    </div>
                  </>
                ) : (
                  AllDetails?.contacts?.map((item, index) => (
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-1  ">
                      <input
                        type="radio"
                        name="send_contact"
                        id="send_contact"
                      />
                      <label htmlFor="send_contact">
                        <span className="tick-mark">
                          <TickIcon />
                        </span>
                        <div className="send-contact--filled">
                          <div className="contact-info">
                            <div className="info-box">
                              <div className="info-item">
                                <label>MOBILE NUMBER</label>

                                <span>{item.mobile_number}</span>
                                {/* <input value={item.mobile_number} 
                                style={{"border":"none","background":"none"}}
                                onChange={(e) =>{
                                  item.mobile_number = e.target.value
                                  
                                  setNullError({
                                      ...NullError,
                                      mobile_number: false,
                                    });
                                    setValidationError({
                                      ...Validation,
                                      mobile_number: false,
                                    });
                                }} /> */}

                                {/* <span
                                  contenteditable="true"
                                  onInput={(e) => {
                                    item.mobile_number =
                                      e.currentTarget.textContent;

                                    setNullError({
                                      ...NullError,
                                      mobile_number: false,
                                    });
                                    setValidationError({
                                      ...Validation,
                                      mobile_number: false,
                                    });
                                  }}
                                >
                                  {item.mobile_number}
                                </span> */}
                              </div>
                              <div className="info-item">
                                <label>WhatsApp Number</label>

                                <span contenteditable="true">
                                  {item.whatsapp_number
                                    ? item.whatsapp_number
                                    : "N/A"}
                                </span>
                              </div>
                              <div className="info-item">
                                <label>Other Mobile Number</label>

                                <span>
                                  {item.fax_number ? item.fax_number : "N/A"}
                                </span>
                              </div>
                              <div className="info-item">
                                <label>Office Landline Number</label>

                                {/* <input value={item.landline_number ? item.landline_number : "N/A" } 
                                style={{"border":"none","background":"none"}}
                                onChange={(e) =>{
                                  item.landline_number = e.target.value
                                  setNullError({
                                      ...NullError,
                                      email: false,
                                    });
                                    setValidationError({
                                      ...Validation,
                                      email: false,
                                    });
                                }} /> */}

                                <span>
                                  {item.landline_number
                                    ? item.landline_number
                                    : "N/A"}
                                </span>
                              </div>
                              <div className="info-item">
                                <label>Email Adress</label>
                                <span>{item.email}</span>

                                {/* <input value={item.email} 
                                style={{"border":"none","background":"none"}}
                                onChange={(e) =>{
                                  item.email = e.target.value
                                  
                                  setNullError({
                                      ...NullError,
                                      email: false,
                                    });
                                    setValidationError({
                                      ...Validation,
                                      email: false,
                                    });
                                }} /> */}
                              </div>
                            </div>
                          </div>
                          <div className="button-wrap">
                            <button
                              className="button button-blue"
                              onClick={() => {
                                // setEditLoading({...EditLoading,EdCn:true})
                                setEditContact(item);
                                // EditDataMth(item);
                                handleShowCon();
                              }}
                            >
                              Edit Details
                              {/* { editContact?.id === item.id ? EditLoading?.EdCn === true ? <PuffLoader loading={true} size={15} /> : "Edit Details" : "Edit Details"} */}
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))
                )}
              </div>
              {addSendContact ? (
                <>
                  <div className="card">
                    <div className="card-body">
                      <AddContactDetails UpdateTrue={UpdateTrue} />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="tab-pane credit-policy" id="4a">
              <button
                className={
                  AllDetails?.credit_policy?.credit_period === undefined
                    ? `button button-primary button-add`
                    : `  button btn-sm button-add button-disabled`
                }
                disabled={
                  AllDetails?.credit_policy?.credit_period === undefined
                    ? false
                    : true
                }
                onClick={() => setAddCredit(true)}
              >
                + Add
              </button>
              {AllDetails?.credit_policy?.credit_period === undefined ? (
                <>
                  {" "}
                  <div className="text-center text-danger">
                    <h4 style={{ fontSize: "20px" }}>
                      {addCredit === true ? "" : "No record found"}
                    </h4>
                  </div>
                </>
              ) : (
                <div className="policy-info">
                  <form>
                    <div className="info-box">
                      <div className="info-item">
                        <label>Nos of Advance Transactions for Credit</label>

                        <span>{CreditPolicy?.advance_transaction}</span>
                        {/* <span
                          contenteditable="true"
                          onInput={(e) => {
                            console.log(e);
                            setCreditPolicy({
                              ...CreditPolicy,
                              advance_transaction: e.target.innerHTML,
                            });

                            setNullValidationCred({
                              ...NullValidationCred,
                              advance_transaction: false,
                            });
                            setValidationCred({
                              ...ValidationCred,
                              advance_transaction: false,
                            });
                          }}
                        >
                          {CreditPolicy?.advance_transaction}
                        </span> */}
                      </div>
                      <div className="info-item">
                        <label>Credit Period (Days)</label>

                        <span className="info-days">
                          {CreditPolicy?.credit_period}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Interest Per Week After Due Date</label>

                        <span className="info-per">
                          {CreditPolicy?.delay_interest}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Credit Period Starts from</label>

                        <span className="info-days">
                          {CreditPolicy?.credit_period_start}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Interest Period</label>

                        <span >
                          {CreditPolicy?.interest_period}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Other Terms</label>

                        <span >
                          {CreditPolicy?.other_terms}
                        </span>
                      </div>
                    </div>
                    <div className="button-wrap">
                      <button
                        type="submit"
                        className="button button-blue"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShowCred();
                        }}
                      >
                        {EditLoading?.EdCp === true ? (
                          <PuffLoader loading={true} size={15} />
                        ) : (
                          "Edit Details"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {addCredit ? (
                <>
                  <div className="card">
                    <div className="card-body">
                      <AddCreditPolicy UpdateTrue={UpdateTrue} />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Company Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* <div className="upload-image">
              <input type="file" id="company_logo" />
              <label htmlFor="company_logo">
                <UploadIcon />
                <span>
                  Drag n Drop here Or{" "}
                  <span className="color-primary">Browse</span>
                </span>
              </label>
            </div> */}
            <div className="row">
              <div className="form-field col-sm">
                <label className="form-label">GST No</label>
                {AllDetails?.payment_details?.bank_account_number === undefined ? <>s
                <div className="d-flex">

               
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  value={EditData?.gst_number}
                  onChange={(e) => {

                    setError((p) =>({...p , ItsGstCall :true}))
                    if (e.target.value != "") {

                        if (GSTregx.test(e.target.value)) {

                          setError((p) =>({...p,gst_RegEx:true}))
                        } else {
                          setError((p) =>({...p,gst_RegEx:false}))
                        }
                  }
                  
                  else{
                    setError((p) =>({...p,gst_RegEx: ""}))

                  }
                  setEditData({
                    ...EditData,
                    gst_number: e.target.value,
                  });
                  setError((p)=>({...p,ResponseErr:false}));

                }}
                />
                        <button
                  
                  type="button"
                  className={Error?.gst_number === true ? 'btn btn-sm ' :
                  Error?.gst_RegEx === false ?  'btn btn-secondary ' :  Error?.gst_RegEx === "" ?  "btn btn-secondary" : Error?.gst_Verify === true ? "btn btn-success":
                  "btn btn-sm btn-warning" 
                  }

                  disabled={Error?.gst_RegEx === false ? true : Error?.gst_RegEx === "" ?  true : false }

                    onClick={(e) =>{

                      GstVerification(e)
                    }}

>

{Error?.LoadingGstVerfication === true ? <PuffLoader loading={true} size={15} /> : Error?.gst_Verify === true ? <TickIcon />: "Verify" }
               
                </button>

                </div>
               
   {Error?.gst_number === true ? (
                <FieldValidationError message="GST Number Is Required" />
              ) : (
                ""
              )}   

                      {Error?.gst_RegEx === false ? (
                <FieldValidationError message="GST Number Is Not Valid" />
              ) : (
                ""
              )}      

              
              </> :   <>

              <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  disabled
                  value={EditData?.gst_number}
                />

</> }
                    </div>
              <div className="form-field col-sm">
                <label className="form-label">PAN No</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  disabled
                  value={EditData?.pan_number}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="cname"
                id="cname"
                className="form-input"
                value={EditData?.name}
                disabled
              />
            </div>

            <div className="form-field">
              <label className="form-label">Enter Shipping Address</label>
              <input
                type="text"
                name="cname"
                id="cname"
                className="form-input"
                value={EditData?.shipping_address}
                disabled
              />
            </div>
            <div className="form-field">
              <label className="form-label">Enter Billing Address</label>
              <input
                type="text"
                name="cname"
                id="cname"
                className="form-input"
                value={EditData?.billing_address}
                onChange={(e) => {
                  setEditData({
                    ...EditData,
                    billing_address: e.target.value,
                  });
                  setError((p)=>({...p,billing_address:false}));
                  setError((p)=>({...p,ResponseErr:false}));

                }}
              />
              {Error?.billing_address === true ? (
                <FieldValidationError message="Billing Address Is Required" />
              ) : (
                ""
              )}
            </div>
            <div className="row">
              <div className="col-sm">
                <div className="form-field">
                  <label className="form-label">State</label>
                  <select className="form-input" disabled>
                    <option>
                      {EditData?.region?.parent?.name}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-sm">
                <div className="form-field">
                  <label className="form-label">City</label>
                  <select className="form-input" disabled>
                    <option>{EditData?.region?.name}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <div className="form-field">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="number"
                    name="cname"
                    id="cname"
                    className="form-input"
                    value={EditData?.mobile_number}
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm">
                <div className="form-field">
                  <label className="form-label">Email ID</label>
                  <input
                    type="email"
                    name="cname"
                    id="cname"
                    className="form-input"
                    value={EditData?.company_details?.email}
                    disabled
                  />
                </div>
              </div>
            </div>
          </form>

          {Error?.ResponseErr === true ? <FieldValidationError message={ Error?.ResponseErrmsg} /> :""}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button button-primary"
            variant="primary"
            onClick={(e) => {
              setEditLoading({ ...EditLoading, EdCm: true });
              if(Error?.ItsGstCall === true ){

                EditCompanyData(e)

              }
              else{
                EditCompanyDetails(EditData?.id);
              }
            }}
          >
            {EditLoading?.EdCm === true ? (
              <PuffLoader loading={true} size={15} />
            ) : (
              "Save Details"
            )}
          </Button>
          <Button
            className="button button-secondary"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showCon} onHide={handleCloseCon}>
        <Modal.Header>
          <Modal.Title>Edit Contact Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-details">
            <div className="section-title">
              <h6>Enter Contact Details</h6>
            </div>
            <form>
              <div className="flex-box">
                <div className="flex-item">
                  <div className="form-field">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      name="cname"
                      id="cname"
                      className="form-input"
                      placeholder="Enter Your Mobile Number"
                      value={editContact?.mobile_number}
                      onChange={(e) => {
                        setEditContact({
                          ...editContact,
                          mobile_number: e.target.value,
                        });
                        setNullError({
                          ...NullError,
                          mobile_number: false,
                        });
                        setValidationError({
                          ...Validation,
                          mobile_number: false,
                        });
                      }}
                    />
                    {NullError.mobile_number === true ? (
                      <FieldValidationError message="Mobile Number Must Required" />
                    ) : (
                      ""
                    )}

                    {Validation.mobile_number === true ? (
                      <FieldValidationError message="Invalid Mobile Number" />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-box">
                <div className="flex-item">
                  <div className="form-field">
                    <label className="form-label">Whatsapp Number</label>
                    <input
                      type="tel"
                      name="cname"
                      id="cname"
                      className="form-input"
                      placeholder="Enter Your Whatsapp Number"
                      value={editContact?.whatsapp_number}
                      onChange={(e) => {
                        setEditContact({
                          ...editContact,
                          whatsapp_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex-item">
                  <div className="form-field">
                    <label className="form-label">Landline Number</label>
                    <input
                      type="tel"
                      name="cname"
                      id="cname"
                      className="form-input"
                      placeholder="Enter Your Landine Number"
                      value={editContact?.landline_number}
                      onChange={(e) => {
                        setEditContact({
                          ...editContact,
                          landline_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-box">
                <div className="flex-item">
                  <div className="form-field">
                    <label className="form-label">Fax Number</label>
                    <input
                      type="tel"
                      name="cname"
                      id="cname"
                      className="form-input"
                      placeholder="Enter Your Fax Number"
                      value={editContact?.fax_number}
                      onChange={(e) => {
                        setEditContact({
                          ...editContact,
                          fax_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex-item">
                  <div className="form-field">
                    <label className="form-label">Email ID</label>
                    <input
                      type="email"
                      name="cname"
                      id="cname"
                      className="form-input"
                      placeholder="Enter Your Email Address"
                      value={editContact?.email}
                      onChange={(e) => {
                        setEditContact({
                          ...editContact,
                          email: e.target.value,
                        });
                        setNullError({
                          ...NullError,
                          email: false,
                        });
                        setValidationError({
                          ...Validation,
                          email: false,
                        });
                      }}
                    />
                    {NullError.email === true ? (
                      <FieldValidationError message="Email must be required" />
                    ) : (
                      ""
                    )}

                    {Validation.email === true ? (
                      <FieldValidationError message="Invalid Email " />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-box">
                <div className="flex-item">
                  <div className="form-field">
                    <label className="form-label">Office Email ID</label>
                    <input
                      type="email"
                      name="cname"
                      id="cname"
                      className="form-input"
                      value={editContact?.office_email}
                      onChange={(e) => {
                        setEditContact({
                          ...editContact,
                          office_email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-warning"
            onClick={() => {
              setEditLoading({ ...EditLoading, EdCn: true });
              EditDataMth(editContact);
            }}
          >
            {EditLoading?.EdCn === true ? (
              <PuffLoader loading={true} size={15} />
            ) : (
              "Save Details"
            )}
          </Button>
          <Button variant="secondary" onClick={handleCloseCon}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showCred} onHide={handleCloseCred}>
        <Modal.Header>
          <Modal.Title className="text-center">
            Edit Credit Policy Details{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">
                  Nos of Advance Transactions for Credit
                </label>
                <input
                  required
                  type="number"
                  name="cname"
                  min="1"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Advance Transactions for Credit"
                  value={CreditPolicy?.advance_transaction}
                  onChange={(e) => {
                    setCreditPolicy({
                      ...CreditPolicy,
                      advance_transaction: e.target.value,
                    });

                    setNullValidationCred({
                      ...NullValidationCred,
                      advance_transaction: false,
                    });
                    setValidationCred({
                      ...ValidationCred,
                      advance_transaction: false,
                    });
                  }}
                />

                {NullValidationCred?.advance_transaction === true ? (
                  <FieldValidationError message="Advance Transaction must required" />
                ) : (
                  ""
                )}

                {ValidationCred?.advance_transaction === true ? (
                  <FieldValidationError message="Advance Transaction must be Number" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Credit Period (Days)</label>
                <select
                  className="form-input"
                  required
                  onChange={(e) => {
                    setCreditPolicy({
                      ...CreditPolicy,
                      credit_period: e.target.value,
                    });
                  }}
                >
                  <option value={CreditPolicy?.credit_period}>
                    {CreditPolicy?.credit_period}
                  </option>
                  <option value={0}> 0</option>
                  <option value={15}> 15</option>
                  <option value={30}> 30</option>
                  <option value={45}> 45</option>
                  <option value={60}> 60</option>
                  <option value={75}> 75</option>

                  {/* 0, 15, 20, 45, 60, 75, 90 */}
                </select>
              </div>
            </div>
          </div>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">
                  Interest Per Week After Due Date
                </label>
                <input
                  required
                  style={{}}
                  type="number"
                  min="0"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Interest Per Week After Due Date"
                  value={CreditPolicy?.delay_interest}
                  onChange={(e) => {
                    setCreditPolicy({
                      ...CreditPolicy,
                      delay_interest: e.target.value,
                    });

                    setNullValidationCred({
                      ...NullValidationCred,
                      delay_interest: false,
                    });
                    setValidationCred({
                      ...ValidationCred,
                      delay_interest: false,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Credit Period Starts from</label>

                <select className="form-input" required>
                  <option value={"Delivery date"}> Delivery date</option>

                  {/* 0, 15, 20, 45, 60, 75, 90 */}
                </select>
              </div>
            </div>
          </div>
          <div className="flex-box">
          <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Interest Period </label>
                <select
                  className="form-input"
                  value={CreditPolicy?.interest_period}
                  required
                  onChange={(e) => {
                    setNullValidationCred({
                      ...NullValidationCred,
                      interest_period: false,
                    });
                    setCreditPolicy({
                      ...CreditPolicy,
                      interest_period: e.target.value,
                    });
                  }}
                >
                  <option value={"  "}>Select Interest Period</option>
                  <option value={"Days"}> Days</option>
                  <option value={"Week"}> Week</option>
                  <option value={"Month"}> Month</option>
                  <option value={"Year"}> Year</option>
            




                </select>

                {NullValidationCred?.interest_period === true ? (
                  <FieldValidationError message="Interest Period is Required " />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Other Terms</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Your Other Terms"
                  value={CreditPolicy?.other_terms}
                  onChange={(e) => {
                    setCreditPolicy({
                      ...CreditPolicy,
                      other_terms: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-warning"
            onClick={(e) => {
              setEditLoading({ ...EditLoading, EdCp: true });

              EditCreditPolicy(e);
            }}
          >
            {EditLoading?.EdCp === true ? (
              <PuffLoader loading={true} size={15} />
            ) : (
              "Save Details"
            )}
          </Button>
          <Button variant="secondary" onClick={handleCloseCred}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showPay} onHide={handleClosePay}>
        <Modal.Header>
          <Modal.Title className="text-center">
            Edit Payment Details{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  value={PayMentDetails?.bank_account_number}
                  disabled
                />
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
                  value={PayMentDetails?.bank_account_ifsc_code}
                  disabled
                />
              </div>
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
                  value={PayMentDetails?.bank_name}
                />
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
                  value={PayMentDetails?.bank_branch}
                />
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
                  value={PayMentDetails?.mobile_number}
                  maxlength="10"
                  onChange={(e) => {
                    setPayMentDetails({
                      ...PayMentDetails,
                      mobile_number: e.target.value,
                    });

                    setNullPayMentDetails({
                      ...NullPayMentDetails,
                      mobile_number: false,
                    });
                    setvalidationPayMentDetails({
                      ...validationPayMentDetails,
                      mobile_number: false,
                    });
                  }}
                />
                {NullPayMentDetails.mobile_number === true ? (
                  <FieldValidationError message="Mobile Number Must Required" />
                ) : (
                  ""
                )}
                {validationPayMentDetails.mobile_number === true ? (
                  <FieldValidationError message="Please Provide Valid Mobile Number" />
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
                  value={PayMentDetails?.email}
                  onChange={(e) => {
                    setPayMentDetails({
                      ...PayMentDetails,
                      email: e.target.value,
                    });
                    setNullPayMentDetails({
                      ...NullPayMentDetails,
                      email: false,
                    });
                    setvalidationPayMentDetails({
                      ...validationPayMentDetails,
                      email: false,
                    });
                  }}
                />
                {NullPayMentDetails.email === true ? (
                  <FieldValidationError message="Email Must Required" />
                ) : (
                  ""
                )}
                {validationPayMentDetails.email === true ? (
                  <FieldValidationError message="Please Provide Valid Emailm Address" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {<FieldValidationError message={PaymentRESErr} />}
          <Modal.Footer>
            <Button
              className="btn btn-warning"
              onClick={(e) => {
                setEditLoading({ ...EditLoading, EdPd: true });
                EditPayMnetDetails();
              }}
            >
              {EditLoading?.EdPd === true ? (
                <PuffLoader loading={true} size={15} />
              ) : (
                "Save Details"
              )}
            </Button>
            <Button variant="secondary" onClick={handleClosePay}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PreFilledForm;
