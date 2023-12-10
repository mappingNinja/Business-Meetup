import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import Auth from '../libs/auth'
import { post } from '../libs/http-hydrate'
import FieldValidationError from '../components/error-messages/field-validation-error'

function EditAboutModal (props) {

  const user = Auth.getCurrentUser();
  const initialAboutData = props.data;
  console.log('this is the initialdata', initialAboutData.company_details.industry)

  const [aboutModalData, setAboutModalData] = useState();
  const [aboutText, setAboutText] = useState('');
  const [allValid, setAllValid] = useState();
  const [validateAbout, setValidateAbout] = useState();
  const [submitBtn, setSubmitBtn] = useState();

  useEffect(()=> {
    setAboutModalData(initialAboutData);
    setAboutText(initialAboutData.about);
  },[initialAboutData])

  const handleAboutChange = (e)=> {
    e.preventDefault();
    const formData = new FormData();

    if (aboutModalData.about != null) {
      formData.append('about', aboutText)
    } 
    formData.append('name', aboutModalData.name);
    if (aboutModalData.company_details.details.designation !== null) {
      formData.append('designation', aboutModalData.company_details.details.designation);
    }
    

     post('/user/profile/edit', formData, {headers:{'Authorization':`Bearer ${user.token}`}})
     .then((reponse)=> {
      if(reponse.status === 200) {
        window.location.reload();
      }
     })
     .catch((err)=> {
      
     })
  }

 

  const handleAboutValidation = (value) => {
    if(value.length === 0) {
      setValidateAbout(true);
      setSubmitBtn(true);
      setAllValid(true);
    }
   else if(value.length > 255) {
      setValidateAbout(true);
      setSubmitBtn(true);
      setAllValid(true);
    }
    else {
      setValidateAbout(false);
      setSubmitBtn(false);
      setAllValid(false);
    }
  }

  const capitalizeFirstLowercaseRest = str => {
    let capitalizeStr = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
     setAboutText(capitalizeStr)
  };
 

    return (
        <>
<div className="modal fade certifications-modal" id="AboutModal" tabindex="-1" role="dialog" aria-labelledby="ContactModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"> About You</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
                <div className='row'>
                <div className='form-field col-sm-6'>
                  <label className='form-label'>Edit Your About Section <span className='mendatory'></span></label>
                  <textarea rows="4" cols="50" name='cname' id='cname' style={{borderColor:'grey',padding:'10px'}} value={aboutText} placeholder='Enter About' onChange={(e)=> {setAboutText(e.target.value); capitalizeFirstLowercaseRest(e.target.value)} } onBlur={(e)=> handleAboutValidation(e.target.value)} />
                  {validateAbout ? <FieldValidationError message="About should not be empty"/> : null}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" disabled={allValid} className="button button-primary" onClick={(e)=> handleAboutChange(e)}>Save</button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </>
  )
}

export default EditAboutModal