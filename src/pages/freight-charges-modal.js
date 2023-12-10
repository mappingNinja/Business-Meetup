import { useContext, useState, useEffect, useRef } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import FieldValidationError from '../components/error-messages/field-validation-error';
import { getAuthConfig, postwithOu } from '../libs/http-hydrate';
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
function FreightChargesModal (props) {
  const navigate = useNavigate();
  const ref = useRef();
  const [freight_charges , setfreight_charges]= useState({
    freight_charges:""
  });
  const [freight_chargeser , setfreight_chargeser]= useState({
    freight_charges:false
  });
  const [freight_chargesLoad , setfreight_chargesLoad]= useState({
    freight_charges:false
  });
  useEffect(() => {
    if (localStorage.getItem("freight_charges")) {
      setfreight_charges((p) => ({
        ...freight_charges,
        freight_charges: localStorage.getItem("freight_charges"),
      }));
    } else {
      setfreight_charges((p) => ({ ...freight_charges, freight_charges: 0 }));
    }
   


  },[localStorage.getItem('freight_charges')])
  async function editPortfolio(e) {
    e.preventDefault();
    if(freight_charges?.freight_charges === ""){
      setfreight_chargesLoad({...freight_chargesLoad,freight_charges:false})

        setfreight_chargeser({...freight_chargeser,freight_charges:true})
        return false;
    }
    const url = "/product/portfolio";
    const res = await postwithOu(url,getAuthConfig(),freight_charges);
    if (res?.data?.status === 200) {
      
      setfreight_chargesLoad({...freight_chargesLoad,freight_charges:false})
      ref.current.click();

      props.UpdateTrue();
    }
    else if (res?.data?.status === 401) {
      setfreight_chargesLoad({...freight_chargesLoad,freight_charges:false})
      navigate("/login");
    }
    else{
      setfreight_chargesLoad({...freight_chargesLoad,freight_charges:false})
      alert("Something went wrong please try again later")
    }
  }
  return (
        <>
<div className="modal fade modal-small" id="FreightChargesModal" tabindex="-1" role="dialog" aria-labelledby="FreightChargesModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Freight Charges</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"          ref={ref}>
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
              
              <div className='form-field'>
                  <label className='form-label'>Enter Freight Charges</label>
                  <div className='row'>
                  <div className='col-sm'>
                  <input type='number' name='minOrder' value={freight_charges?.freight_charges} className='form-input' placeholder='Enter Freight Charges in Percentage ' onChange={(e)=>{
                    if(!(e.target.value >=0 && e.target.value <=100 )){
                      return false;
                    }
                    setfreight_charges({...freight_charges,freight_charges:e.target.value})
                  }} />
                   {freight_chargeser?.freight_charges === true ? <FieldValidationError message="Please Enter Valid Freight Charges" /> : ""}

                  </div>
                  <div className='col-sm-3'>
                    <select className='form-input'><option>%</option></select>
                  </div>
                  </div>
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="button button-primary" onClick={(e) => {
    setfreight_chargesLoad({...freight_chargesLoad,freight_charges:true})
                  editPortfolio(e)
                }}>


{freight_chargesLoad?.freight_charges === true ? <PuffLoader loading={true} size={15} /> : "Save"}

                </button>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default FreightChargesModal