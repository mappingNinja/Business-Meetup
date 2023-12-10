import { useContext, useState, useEffect } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg'
import { ReactComponent as Edit2Icon } from '../assets/images/edit-icon2.svg'
import Certificate from '../assets/images/certi1.jpg'
import Auth from '../libs/auth'
import {post} from '../libs/http-hydrate'
import FieldValidationError from '../components/error-messages/field-validation-error'
function EditAwardsModal (props) {

  const user = Auth.getCurrentUser();
  let awardData = props.data;
  const [title, setTitle]= useState('');
  const [description, setDescription]= useState('');
  const [logo, setLogo]= useState('');
  const [imgPreview, setImgPreview] = useState();
  const [makeCover, setMakeCover] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [validateTitle, setValidateTitle] = useState(false)
  const [validateDescription, setValidateDescription] = useState(false)
  const [submitBtn, setSubmitBtn] = useState(false);
  const [convertedFile, setConvertedFile] = useState({})

  useEffect(()=> {
    setTitle(awardData.title);
    setDescription(awardData.description);
    setLogo(awardData.file);
    setMakeCover(awardData.make_cover_photo);
  }, [awardData])


  const handleAwardsEdit = (e)=> {
    e.preventDefault();

    const formData = new FormData();
    if(typeof logo === 'string') {
      if(logo?.startsWith('https://')) {
      fetch(logo)
      .then(response => response.blob())
      .then(blob => new File([blob], `${logo.substring(logo.lastIndexOf('/')+1)}`, {
          type: blob.type
     }))
      .then(file => {
          formData.append('logo', file, file.name)
     })
   
      }
  }
    else {
      formData.append('logo', logo.data, logo.data.name)
    }
    formData.append('title',title);
    formData.append('description',description);
    formData.append('type','achievement');

    if(makeCover) {
      formData.append('make_cover_photo',1)
    } 
    if(makeCover === false) {
      formData.append('make_cover_photo',0)
    }


    post(`/user/profile/show_case/update/${awardData.id}`,formData,{headers:{'Authorization':`Bearer ${user.token}`}})
    .then((response)=> {
      if(response.status === 200) {
        window.location.reload();
      }
    })
    .catch((e)=> {
      
    })
  }

  const handleImageChange = (e)=>{
    let img = {data: e.target.files[0]}
    setIsUpdated(true);
    setLogo(img);
    setImgPreview(img.data)
  }

  const handleDescription = (value) => {
    console.log('this is the value', value)
  if(value.length === 0) {
      setValidateDescription(true);
      setSubmitBtn(true)
    }
   else if(value.length > 255) {
      setValidateDescription(true);
      setSubmitBtn(true)
    }
    else {
      setValidateDescription(false);
      setSubmitBtn(false)
    }
  }
  const handleTitle = (value) => {
    if(value.length === 0) {
      setValidateTitle(true);
      setSubmitBtn(true)
    }
    else if(value.length > 255) {
      setValidateTitle(true);
      setSubmitBtn(true)
    }
    else {
      setValidateTitle(false);
      setSubmitBtn(false)
    }
  }

    return (
        <>
<div className="modal fade certifications-modal" id="EditAwardsModal" tabindex="-1" role="dialog" aria-labelledby="CertificationsModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Award/Achievement</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
              <div className='upload'>
            <div className='upload-image'>
              <div className='img-block'>
              {isUpdated ? 
                <>
                <div className='img-block'> <input className='img-block' type='file' placeholder='Upload Newer Image' onChange={handleImageChange} /> <img src={URL.createObjectURL(imgPreview)}/></div>
                </>
                :<>
                <div className='img-block'> <input className='img-block' type='file' placeholder='Upload New Image' onChange={handleImageChange} /> <img src={logo} /></div>
                </>}
                {/* <button className='delete-button'><DeleteIcon /></button> */}
              </div>
            </div>
            <div className='upload-fields'>
              <div className='form-field'>
                <label className='form-label'>Award name <span className='mendatory'>*</span></label>
                <input type='text' name='cname' id='cname' className='form-input' value={title} onChange={(e)=> setTitle(e.target.value)} onBlur={(e)=> handleTitle(e.target.value)}  placeholder='Enter Award Name' />
                {validateTitle? <FieldValidationError message="Award Title Is Required!"/> : null}
              </div>
              <div className='form-field'>
                <label className='form-label'>Description <span className='mendatory'>*</span></label>
                <textarea className='form-input' value={description} onChange={(e)=> setDescription(e.target.value)} onBlur={(e)=> handleDescription(e.target.value)} placeholder='Description'></textarea>
                {validateDescription? <FieldValidationError message="Award Description Is Required!"/> : null}
              </div>
            </div>
          </div>
          <div className='upload-button text-right d-flex justify-content-between'>
              <div className='form-field'>
                  <input type='checkbox' id='make_cover' value={makeCover} onChange={(e)=> setMakeCover(e.target.value)} />
                  <label htmlFor='make_cover'>Make cover photo</label>
                </div>
              <button className='button' disabled={submitBtn} onClick={(e)=> handleAwardsEdit(e)}>Upload</button>
            </div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default EditAwardsModal