import { useContext, useEffect, useState } from "react";
import "../../common/scss/pages/settings.scss";
import Auth from "../../libs/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FieldValidationError from "../error-messages/field-validation-error";
import validator from "validator";
import PuffLoader from "react-spinners/PuffLoader";
function AddContactDetails(props) {
  const { isLength, isMobilePhone, isStrongPassword, isEmail } = validator;
  const [Loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const user = Auth.getCurrentUser();
  const [Contact, SetContact] = useState({
    name: "",
    mobile_number: "",
    whatsapp_number: "",
    landline_number: "",
    fax_number: "",
    email: "",
    office_email: "",
  });

  const [NullError, setNullError] = useState({
    name: false,
    mobile_number: false,
    email: false,
  });

  const [Validation, setValidationError] = useState({
    name: false,
    mobile_number: false,
    email: false,
    whatsapp_number: false,
  });
  useEffect(() => {
    if (!user) {
      navigate("/");
    }

  }, []);

  async function SendContact(e) {
    e.preventDefault();
    setLoading(true)
    if (Contact.name.trim() == "") {
      setNullError({ ...NullError, name: true });
      setLoading(false);
      return false;
    }
    if (Contact.email.trim() == "") {
      setNullError({ ...NullError, email: true });
      setLoading(false);
      return false;
    }
    if (Contact.mobile_number.trim() == "") {
      setNullError({ ...NullError, mobile_number: true });
      setLoading(false);
      return false;
    }

    const response = await axios
      .post(
        "https://api.busimeet.com/api/V1/user/setting/contact/create",
        Contact,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
            if(res.status === 200){
              props.UpdateTrue()
              setLoading(false);

            }

      }).catch((e)=>{


        setLoading(false);

      })
  }

  return (
    <>
      <div className="edit-details">
        <div className="section-title">
          <h6>Enter Contact Details</h6>
        </div>
        <form onSubmit={
          SendContact}>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Your Contact Name"
                  value={Contact?.name}
                  onChange={(e) => {
                    SetContact({ ...Contact, name: e.target.value });
                    if (NullError.name === true) {
                      setNullError({ ...NullError, name: false });
                    }
                  }}
                  required
                />

                {NullError.name && (
                  <FieldValidationError message="Contact Name Is Must Required" />
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Your Mobile Number"
                  value={Contact?.mobile_number}
                  onChange={(e) => {
                    SetContact({ ...Contact, mobile_number: e.target.value });
                  }}
                  onBlur={(e) => {
                    if (e.target.value != "") {
                      if (isMobilePhone(e.target.value, "en-IN")) {
                        setValidationError({
                          ...Validation,
                          mobile_number: false,
                        });
                      } else {
                        setValidationError({
                          ...Validation,
                          mobile_number: true,
                        });
                      }
                    }
                  }}
                  required
                />

                {NullError.mobile_number && (
                  <FieldValidationError message="Mobile Number Must Required" />
                )}
                {Validation.mobile_number && (
                  <FieldValidationError message="Invalid Mobile Number" />
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
                  value={Contact?.whatsapp_number}
                  onChange={(e) => {
                    SetContact({ ...Contact, whatsapp_number: e.target.value });
                  }}
                  onBlur={(e) => {
                    if (e.target.value != "") {
                      if (e.target.value.length <= 9) {
                        setValidationError({
                          ...Validation,
                          whatsapp_number: true,
                        });
                      }
                    }
                  }}
                />
                {Validation.whatsapp_number && (
                  <FieldValidationError message="Invalid WhatsApp Number" />
                )}
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
                  value={Contact?.landline_number}
                  onChange={(e) => {
                    SetContact({ ...Contact, landline_number: e.target.value });
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
                  value={Contact?.fax_number}
                  onChange={(e) => {
                    SetContact({ ...Contact, fax_number: e.target.value });
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
                  value={Contact?.email}
                  onChange={(e) => {
                    SetContact({ ...Contact, email: e.target.value });
                  }}
                  required
                />
                {NullError.email && (
                  <FieldValidationError message="Email Must Required" />
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
                  placeholder="Enter Your Office Email Address"
                  value={Contact?.office_email}
                  onChange={(e) => {
                    SetContact({ ...Contact, office_email: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-button">
          <button className="button button-primary" type="submit" onClick={() =>{
            
          }}>
          {Loading === true ? <PuffLoader loading={true} size={15} /> : " Save Details"}
          
            </button>
            <button className="button button-secondary">Cancel</button>
       
          </div>
        </form>
      </div>
    </>
  );
}

export default AddContactDetails;
