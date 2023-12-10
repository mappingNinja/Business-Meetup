
import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import Auth from '../libs/auth'
import { post } from '../libs/http-hydrate'
import FieldValidationError from '../components/error-messages/field-validation-error'
import isEmail from 'validator/lib/isEmail'
function ContactModal (props) {

  const user = Auth.getCurrentUser();
  const initialContactData = props.data;

  const [companyAdd, setCompanyAdd] = useState('');
  const [factoryAdd, setFactoryAdd] = useState('');
  const [contactNo, setContactNo] = useState();
  const [email, setEmail] = useState('');
  const [CompanyDate, setCompanyDate] = useState('');
  const [OwnerDate, setOwnerDate] = useState('');
  const [validate, setValidate] = useState(false)
  const [validateEmail, setValidateEmail] = useState(false)
  const [submitBtn, setSubmitBtn] = useState(false)
  const [validateTextCompanyAdd, setValidateTextCompanyAdd] = useState(false)
  const [validateTextFactoryAdd, setValidateTextFactoryAdd] = useState(false)
  const [allValid, setAllValid] = useState(false)

  useEffect(()=> {
    setCompanyAdd(initialContactData.companyAddress);
    setFactoryAdd(initialContactData.factoryAddress);
    setContactNo(initialContactData.office_phone_number);
    setEmail(initialContactData.office_mail);
    setCompanyDate(initialContactData.foundation_date);
    setOwnerDate(initialContactData.birthDate);
  },[initialContactData])

  const handleContactUpdate = (e)=> {

    const formData = new FormData();

    if (companyAdd != null) {
      formData.append('office_address', companyAdd)
    }  if(factoryAdd != null) {
      formData.append('factory_address', factoryAdd)
    }  if(contactNo != null) {
      formData.append('office_mobile_number', contactNo)
    }  if(email != null) {
      formData.append('office_email', email)
    }  if(CompanyDate != null) {
      formData.append('founding_date', CompanyDate)
    }  if(OwnerDate != null) {
      formData.append('birth_date', OwnerDate)
    }

     post('/user/contact', formData, {headers:{'Authorization':`Bearer ${user.token}`}})
     .then((reponse)=> {
      if(reponse.status === 200) {
        window.location.reload();
      }
     })
     .catch((err)=> {
      
     })
  }

  const handleContactValidation = (e)=> {
    if (contactNo.length === 0) {
      setValidate(false)
      setSubmitBtn(false)
      setAllValid(false)
    }
    else if (contactNo.length > 10 || contactNo.length < 10) {
      setValidate(true)
      setSubmitBtn(true)
      setAllValid(true)
    }
  }

  const handleEmail = (e)=> {
    if (email.length === 0) {
      setValidateEmail(false)
      setSubmitBtn(false)
      setAllValid(false)
    }
    else if(!isEmail(email)) {
      setValidateEmail(true)
      setSubmitBtn(true)
      setAllValid(true)
    } 
  }

  const handleTextCompany = (e) => {
    if(companyAdd.length === 0) {
      setValidateTextCompanyAdd(false);
      setSubmitBtn(false);
      setAllValid(false)
    }
    if(companyAdd.length > 255) {
      setValidateTextCompanyAdd(true);
      setSubmitBtn(true);
      setAllValid(true)
      setAllValid(true)
    }
  }

  const handleTextFactory = (e) => {
    if(factoryAdd.length === 0) {
      setValidateTextFactoryAdd(false);
      setSubmitBtn(false);
      setAllValid(false)
    }
    if(factoryAdd.length > 255) {
      setValidateTextFactoryAdd(true);
      setSubmitBtn(true);
      setAllValid(true)
    }
  }

   function handleOwnerBirthDate () {
    let eighteenYearsAgo = new Date();
    eighteenYearsAgo = eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18);
    return new Date(eighteenYearsAgo).toISOString().split('T')[0];
  }
  

    return (
        <>
<div className="modal fade certifications-modal" id="ContactModal" tabindex="-1" role="dialog" aria-labelledby="ContactModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"> Warehouse Address and All<span>(company address should be mandatory)</span></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
                <div className='row'>
                <div className='form-field col-sm-6'>
                  <label className='form-label'>Company Address <span className='mendatory'></span></label>
                  <input type='text' name='cname' id='cname' className='form-input' value={companyAdd} placeholder='Enter Company Address' onChange={(e)=> setCompanyAdd(e.target.value)} onBlur={(e)=> handleTextCompany(e)} />
                  {validateTextCompanyAdd ? <FieldValidationError message="Company Address should be less than 255 Characters"/> : null}
                </div>
                <div className='form-field col-sm-6'>
                  <label className='form-label'>Factory Address <span className='mendatory'></span></label>
                  <input type='text' name='cname' id='cname' className='form-input' value={factoryAdd} placeholder='Enter Factory Address' onChange={(e)=> setFactoryAdd(e.target.value)} onBlur={(e)=> handleTextFactory(e)} />
                  {validateTextFactoryAdd ? <FieldValidationError message="Factory Address should be less than 255 Characters"/> : null}
                </div>
                <div className='form-field col-sm-6'>
                  <label className='form-label'>Contact Number <span className='mendatory'></span></label>
                  <input type='number' name='cname' id='cname' className='form-input' value={contactNo} placeholder='Enter Contact Number' onChange={(e)=> setContactNo(e.target.value)} onBlur={(e)=> handleContactValidation(e)} />
                  {validate ? <FieldValidationError message="Contact Should Contains 10 Digits"/> : null}
                </div>
                <div className='form-field col-sm-6'>
                  <label className='form-label'>Email Address <span className='mendatory'></span></label>
                  <input type='email' name='cname' id='cname' className='form-input' value={email} placeholder='Enter Email Address' onChange={(e)=> setEmail(e.target.value)} onBlur={(e)=> handleEmail(e)} />
                  {validateEmail ? <FieldValidationError message="Invalid Email"/>: null }
                </div>
                <div className='form-field col-sm-6'>
                  {/* <div className='row'>
                    <div class="col-sm"><select className='form-input'><option>November</option></select></div>
                    <div class="col-sm"><select className='form-input'><option>14</option></select></div>
                    <div class="col-sm"><select className='form-input'><option>1999</option></select></div>
                  </div> */}
                  <label className='form-label'>Company Foundation <span className='mendatory'></span></label>
                  <input type='date' name='cname' id='cname' className='form-input' value={CompanyDate} onChange={(e)=> setCompanyDate(e.target.value)} />
                </div>
                <div className='form-field col-sm-6'>
                  <label className='form-label'>Owner Birthday<span className='mendatory'></span></label>
                  <input type='date' name='cname' id='cname' max={handleOwnerBirthDate()} className='form-input' value={OwnerDate} onChange={(e)=> setOwnerDate(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" disabled={allValid} className="button button-primary" onClick={(e)=> handleContactUpdate(e)}>Save</button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </>
  )
}

export default ContactModal