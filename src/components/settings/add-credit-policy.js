import { useContext, useEffect, useState } from "react";
import "../../common/scss/pages/settings.scss";
import Auth from "../../libs/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FieldValidationError from "../error-messages/field-validation-error";

function AddCreditPolicy(props) {
  const navigate = useNavigate();
  const user = Auth.getCurrentUser();
  const [CreditPolicy, setCreditPolicy] = useState({
    advance_transaction: '',
    credit_period: '',
    delay_interest: '',
    advance_transaction: '',
    credit_period_start: '',
    interest_period:''
  });

  const [NullValidation, setNullValidation] = useState({
    advance_transaction: false,
    credit_period: false,
    delay_interest: false,
    advance_transaction: false,
    credit_period_start: false,
    interest_period:false
  });
  const[Loading,setLoading]=useState(false)
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  async function AddCreditPolicyToDB(e) {
    e.preventDefault();
    if (CreditPolicy.credit_period.trim() === "") {
      setNullValidation({ ...NullValidation, credit_period: true });
      setLoading(false);

      return false;
    }
    if (CreditPolicy.advance_transaction.trim() === "") {
      setNullValidation({ ...NullValidation, advance_transaction: true });
      setLoading(false);

      return false;
    }
    if (CreditPolicy.credit_period_start.trim() === "") {
      setNullValidation({ ...NullValidation, credit_period_start: true });
      setLoading(false);

      return false;
    }
    if (CreditPolicy.delay_interest.trim() === "") {
      setNullValidation({ ...NullValidation, delay_interest: true });
      setLoading(false);

      return false;
    }
    if (CreditPolicy.interest_period.trim() === "") {
      setNullValidation({ ...NullValidation, interest_period: true });
      setLoading(false);

      return false;
    }

    const response = await axios
      .post(
        "https://api.busimeet.com/api/V1/user/setting/credit_policy",
        CreditPolicy,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        // alert(res);
        setLoading(false);

        console.log(res);
        props.UpdateTrue();
      });
  }
  return (
    <>
      <div className="edit-details">
        <div className="section-title">
          <h6>Enter Credit Policy Details</h6>
        </div>
        <form onSubmit={(e) =>
        
        
        { 
          
          setLoading(true);

          AddCreditPolicyToDB(e)
        
        }}>
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
                    setNullValidation({
                      ...NullValidation,
                      advance_transaction: false,
                    });
                    if (e.target.value === "0") {
                      setNullValidation(true);
                    } else {
                      setCreditPolicy({
                        ...CreditPolicy,
                        advance_transaction: e.target.value,
                      });
                    }
                  }}
                />

                {NullValidation.advance_transaction === true ? (
                  <FieldValidationError message="Minimum 1 Nos of Advance Transactions For Credit Required " />
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
                  value={CreditPolicy?.credit_period}
                  required
                  onChange={(e) => {
                    setNullValidation({
                      ...NullValidation,
                      credit_period: false,
                    });
                    setCreditPolicy({
                      ...CreditPolicy,
                      credit_period: e.target.value,
                    });
                  }}
                >
                  <option>Select Credit Period</option>
                  <option value={0}> 0</option>
                  <option value={15}> 15</option>
                  <option value={30}> 30</option>
                  <option value={45}> 45</option>
                  <option value={60}> 60</option>
                  <option value={75}> 75</option>

                  {/* 0, 15, 20, 45, 60, 75, 90 */}



                </select>

                {NullValidation.credit_period === true ? (
                  <FieldValidationError message="Credit Period is Requireds " />
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
                  Interest Rate
                </label>
                <input
                  required
                  style={{}}
                  type="number"
                  min="0"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Interest Rate"
                  value={CreditPolicy?.delay_interest}
                  onChange={(e) => {
                    setNullValidation({
                      ...NullValidation,
                      delay_interest: false,
                    });
                    setCreditPolicy({
                      ...CreditPolicy,
                      delay_interest: e.target.value,
                    });
                  }}
                />

                {NullValidation.delay_interest === true ? (
                  <FieldValidationError message="Delay interest Must Required " />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Credit Period Starts from</label>

                <select
                  className="form-input"
                  value={CreditPolicy?.credit_period_start}
                  required
                  onChange={(e) => {
                    setNullValidation({
                      ...NullValidation,
                      credit_period_start: false,
                    });
                    setCreditPolicy({
                      ...CreditPolicy,
                      credit_period_start: e.target.value,
                    });
                  }}
                >
                  <option>Select Credit Period Start</option>
                  <option value={"Delivery date"}> Delivery date</option>
                  

                  {/* 0, 15, 20, 45, 60, 75, 90 */}



                </select>

                {/* <input
                  required
                  type="number"
                  min="0"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Select Period Start"
                  value={CreditPolicy?.credit_period_start}
                  onChange={(e) => {
                    setNullValidation({
                      ...NullValidation,
                      credit_period: false,
                    });
                    setCreditPolicy({
                      ...CreditPolicy,
                      credit_period_start: e.target.value,
                    });
                  }}
                /> */}

                {NullValidation.credit_period_start === true ? (
                  <FieldValidationError message="Credit Period Start From  Must Required " />
                ) : (
                  ""
                )}
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
                    setNullValidation({
                      ...NullValidation,
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

                {NullValidation.interest_period === true ? (
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
          <div className="form-button">
            <button
              type="submit"
              className="button button-primary"
              // onClick={(e) => {
              //   AddCreditPolicyToDB(e);
              // }}
            >
              Save Details
            </button>
            <button className="button button-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCreditPolicy;
