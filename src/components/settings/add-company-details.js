import { useContext, useEffect, useState } from "react";
import "../../common/scss/pages/settings.scss";
import { ReactComponent as UploadIcon } from "../../assets/images/upload-icon.svg";
import FieldValidationError from "../error-messages/field-validation-error";
import { get, getAuthConfig, postwithOu, post } from "../../libs/http-hydrate";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { ReactComponent as TickIcon } from '../../assets/images/tick-icon.svg'

function AddCompanyDetails(Data) {
  const [companyData, setCompanyData] = useState();
  const [Nulldata, setNullData] = useState(false);
  const [NulldataForPan, setNullDataForPan] = useState(false);
  const [NulldataForbill, setNulldataForbill] = useState(false);
  const [GSTValidation, setGSTValidation] = useState();
  const [verify, setVerify] = useState(false);
  const GSTregx = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const [dataCompany,setDataCompany] = useState({
    gst_number:'',
    address:''
  })
  const [gst_fetched_Data, setgst_fetched_Data] = useState({})
  const [gst_verification,setgst_verification ] = useState(false)
  const [Verification_of_gst,setVerification_of_gs]  = useState(false);
  const [AlreadyExist,setAlreadyExist]= useState(false);
  const [Loading ,setLoading] = useState(false);
  const [GstLoading,setGstLoading] = useState(false);
  const [Logo,setLogo] = useState({logo:""})
  useEffect(() => {
    // console.log("Child",Data)
    const da = Data.TestIngData;
    setCompanyData(da);
    console.log(Data)
  });
  console.log(gst_fetched_Data);

  async function GstVerification(e) {


    const formdata = new FormData();
    formdata.append("gst_number", dataCompany.gst_number);


    const response = await post("/general/get_gst_details", formdata).then((res)=>{

      if(res.status === 200){

        setgst_verification(true);
  
        setgst_fetched_Data(res.data.data);
        


        // alert(res.data.data.address);
        setDataCompany({...dataCompany,address:res.data.data.address})
        // setCompanyData({...companyData,address:res.data.data.address})
      setGstLoading(false)
      }



    }).catch((err)=>{

      console.log(err)
      if(err.response.status === 400)
      {
       setAlreadyExist(true);
       setGstLoading(false)

      }
      if(err.response.status === 429)
      {
        alert("Too many request in the Short Time , Please Wait for Some time");
        setGstLoading(false);

      }

    })


  
    
  
  
  }

  console.log(AlreadyExist)
 async function EditCompanyData(e)  {
  console.log(Data)
  // console.log(props.UpdateTrue)

    e.preventDefault();


    console.log(companyData)
    const url = "/user/setting/company_details/edit/" + companyData?.id;
    const formdata = new FormData();

    formdata.append("logo",Logo.logo)
    formdata.append("gst_number", dataCompany?.gst_number);
    formdata.append("email",companyData?.email);
    formdata.append("billing_address", dataCompany?.address);
    formdata.append("mobile_number", companyData?.mobile_number);
    formdata.append("pan_number",gst_fetched_Data?.pan_number );
    formdata.append("region_id" , gst_fetched_Data?.region?.id);
    formdata.append("name", gst_fetched_Data?.gst_details?.tradeNam);
    formdata.append("shipping_address",gst_fetched_Data?.address);
    const response = await post(url, formdata,getAuthConfig());
    if(response.status === 200){
      setLoading(false)
      // console.log(props)
      // props.UpdateTrue();
      Data.UpdateTrue()
    }
  };
  console.log(Logo.logo.name)
  return (
    <>
      <div className="edit-details">
        <div className="section-title">
          <h6>Enter Company Details</h6>
        </div>
        <form onSubmit={EditCompanyData}>
          <div className="upload">
            <div className="upload-image">
              <input type="file" id="company_logo" onChange={(e) =>{

if(e.target.files[0].size > 2097152)
                                {
                                  alert("Not More than 2 MB is allowded")
                                  return false;
                                }

                                setLogo({...Logo,logo:e.target.files[0]})

                                    console.log(e.target.files[0].name)
              }} />
              <label htmlFor="company_logo">
                <UploadIcon /> 
                
                <span>
                
           

                {Logo?.logo?.name ===  undefined ?  <>
                  Drag n Drop here Or{" "}
                  <span className="color-primary">Browse</span>
                </>
                :
        <>
      
                  <span className="color-primary">{Logo?.logo?.name}</span>
        </>
                
                  }
                  </span>
              </label>
            </div>
            <div className="upload-fields">
  
              <div className="form-field">
                <label className="form-label">GST No</label>



{/* 
                <input
                          type="text"
                          name="gst_number"
                          className="form-input"
                          placeholder="Enter your GST number"
                       
                        />
                        <button
                          type="button"
                          className="button"
                          
                        >
                         hy
                        </button> */}



                <div className="d-flex ">


                  <input
                    type="text"
                    name="cname"
                    id="cname"
                    className="form-input"
                    value={dataCompany?.gst_number}
                    onChange={(e) => {
                      setgst_verification(false)
                      setDataCompany({
                        ...dataCompany,
                        gst_number: e.target.value,
                      });
                      setNullData(false);
                        setAlreadyExist(false)
                      if (e.target.value != "") {
                        if (GSTregx.test(e.target.value)) {
                          setGSTValidation(true);
                        } else {
                          setGSTValidation(false);
                        }
                      }
                      if(e.target.value === ""){
                        setGSTValidation();
                      }
                      setgst_verification(false)
                    }}
                    contentEditable={
                      companyData?.gst_number === null ? "false" : "true"
                    }
                    onBlur={(e) => {
                      if (GSTValidation === true) {
                        setVerify(true);
                      }
                    }}
                  />

                  <button
                  
                    type="button"
                    className={

                      GSTValidation === true && gst_verification === true  ? "btn btn-sm button-green" : 


                      GSTValidation === true ?   "btn btn-sm btn-warning": ` btn btn-sm   button-otp`
                    }


                    disabled={GSTValidation === true ? false :true}
                    onClick={(e) => {

                      setGstLoading(true);
                      GstVerification()
                    }}
                  >
                  {gst_verification === true ? <TickIcon /> : GstLoading === true ? <PuffLoader loading={true} size={15} /> : " Verify" } 
                   
                  </button>
                </div>

{AlreadyExist === true ? (
                  <FieldValidationError message=" Gst Number is already taken " />
                ) : ""   }


{/* 
                {      gst_verification === false ? (
                  <FieldValidationError message="verify Your GST " />
                ) : (
                  ""
                )} */}
                {GSTValidation === false ? (
                  <FieldValidationError message="Your GST Data Is Not Valid" />
                ) : (
                  ""
                )}

                {Nulldata === true ? (
                  <FieldValidationError message="Please Add Valid GST Number" />
                ) : (
                  ""
                )}
              </div>
              <div className="form-field">
                <label className="form-label">PAN No</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  value={gst_fetched_Data?.pan_number}
                    disabled
                  onChange={(e) => {
                    setCompanyData({
                      ...companyData,
                      pan_number: e.target.value,
                    });
                    setNullDataForPan(false);
                  }}
                />
                {NulldataForPan === true ? (
                  <FieldValidationError message="Please Add Valid PAN  Number" />
                ) : (
                  ""
                )}
              </div>
              <div className="form-field">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  value={gst_fetched_Data?.gst_details?.tradeNam}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Enter Shipping Address</label>
            <input
              type="text"
              name="cname"
              id="cname"
              className="form-input"
              value={gst_fetched_Data?.address}
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
              value={dataCompany?.address}
              onChange={(e) => {
                setDataCompany({
                  ...dataCompany,
                  address: e.target.value,
                });

                setNulldataForbill(false);
              }}
            />
            {NulldataForbill === true ? (
              <FieldValidationError message="Please Add Valid Billign Address" />
            ) : (
              ""
            )}
          </div>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">State</label>
                <select className="form-input" disabled>
                  <option>{gst_fetched_Data?.region?.parent?.name}</option>
                </select>
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">City</label>
                <select className="form-input" disabled>
                  <option>{gst_fetched_Data?.region?.name}</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Mobile Number</label>
                <input
                  type="number"
                  name="cname"
                  id="cname"
                  className="form-input"
                  value={companyData?.mobile_number}
                  disabled
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
                  value={companyData?.email}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-button">
          <button className="button button-primary" 
                      disabled={gst_verification === true ? false : true}

          onClick={() =>{
            setLoading(true)
            EditCompanyData()}}>
            {Loading === true ? <PuffLoader loading={true} size={15} /> : "Save Details"}
          </button>

            <button className="button button-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCompanyDetails;
