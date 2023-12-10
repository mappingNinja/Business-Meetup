import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg'
import { post } from '../libs/http-hydrate'
import Auth from '../libs/auth'
import FieldValidationError from '../components/error-messages/field-validation-error';


function EditCertificationModal (props) {

  const user = Auth.getCurrentUser();
  let editCertificationData = props.data;
  const [certificateName, setCertificateName] = useState('');
  const [description, setDescription] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const [imgPreview, setImgPreview] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  const [validateImg, setValidateImg] = useState(false)
  const [validateTitle, setValidateTitle] = useState(false)
  const [validateDescription, setValidateDescription] = useState(false)
  const [submitBtn, setSubmitBtn] = useState(false)
  const [deleteModalData, setDeleteModalData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(()=> {
    setCertificateName(editCertificationData.title);
    setDescription(editCertificationData.description);
    setLogoImage(editCertificationData.file)
  }, [editCertificationData])
  


  const handleUploadCertificate = (e)=> {
    e.preventDefault();

    const formData = new FormData();
    if(typeof logoImage === 'string') {
      if(logoImage?.startsWith('https://')) {
      fetch(logoImage)
      .then(response => response.blob())
      .then(blob => new File([blob], `${logoImage.substring(logoImage.lastIndexOf('/')+1)}`, {
          type: blob.type
     }))
      .then(file => {
          formData.append('logo', file, file.name)
     })
   
      }
  }
    else {
      formData.append('logo', logoImage.data, logoImage.data.name)
    }
    formData.append('title',certificateName);
    formData.append('description',description);
    formData.append('type','certificate');


    post(`/user/profile/show_case/update/${editCertificationData.id}`,formData,{headers:{'Authorization':`Bearer ${user.token}`}})
    .then((response)=> {
      if(response.status === 200) {
        window.location.reload();
      }
    })
    .catch((e)=> {
      alert("Something went wrong")
    })
  }
  const handleImageChange = (e)=>{
    let img = {data: e.target.files[0]}
    setIsUpdated(true);
    setLogoImage(img);
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
  const imageValidation = (file)=> {
    if(!file) {
      setValidateImg(true);
      setSubmitBtn(true)
    }
    else {
      setValidateImg(false);
      setSubmitBtn(false)
    }
  }

    return (
        <>
<div className="modal fade certifications-modal" id="EditCertificationModal" tabindex="-1" role="dialog" aria-labelledby="CertificationsModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Certificate</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
              <div className='upload'>
            <div className='upload-image'>
            
                {isUpdated ? 
                <>
                <div className='img-block'> <input className='img-block' type='file' placeholder='Upload Newer Image' onChange={handleImageChange} onBlur={(e)=> imageValidation(e.target.files[0])} /> <img src={URL.createObjectURL(imgPreview)}/></div>
                {validateImg? <FieldValidationError message="Image Is Required!"/>: null}
                </>
                :<>
                <div className='img-block'> <input className='img-block' type='file' placeholder='Upload New Image' onChange={handleImageChange} onBlur={(e)=> imageValidation(e.target.files[0])} /> <img src={logoImage} /></div>
                {validateImg? <FieldValidationError message="Image Is Required!"/>: null}
                </>}
            </div>
            <div className='upload-fields'>
              <div className='form-field'>
                <label className='form-label'>Certificate name <span className='mendatory'>*</span></label>
                <input type='text' name='cname' id='cname' className='form-input' value={certificateName} placeholder='Enter Certificate Name' onChange={(e)=> setCertificateName(e.target.value)} onBlur={(e)=> handleTitle(e.target.value)} />
                {validateTitle? <FieldValidationError message="Certificate Title Required!"/>: null}
              </div>
              <div className='form-field'>
                <label className='form-label'>Description <span className='mendatory'>*</span></label>
                <textarea className='form-input' placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value)} onBlur={(e)=> handleDescription(e.target.value)}></textarea>
                {validateDescription? <FieldValidationError message="Certificate Description Required!"/>: null}
              </div>
            </div>
          </div>
          <div className='upload-button text-right'><button className='button' disabled={submitBtn} onClick={(e) => {handleUploadCertificate(e); imageValidation(logoImage)}}>Upload</button></div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default EditCertificationModal