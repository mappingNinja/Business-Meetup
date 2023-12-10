import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { ReactComponent as EditIcon } from '../assets/images/edit-icon2.svg'
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg'
import { ReactComponent as UploadIcon } from '../assets/images/upload-icon.svg'
import { ReactComponent as Edit2Icon } from '../assets/images/edit-icon2.svg'
import EditCertificationModal from './edit-certifications-modal'
import DeleteModal from './delete-modal'
import { post } from '../libs/http-hydrate'
import Auth from '../libs/auth'
import FieldValidationError from '../components/error-messages/field-validation-error'
function CertificationModal (props) {
  
  const user = Auth.getCurrentUser();
  const [certificateName, setCertificateName] = useState('');
  const [description, setDescription] = useState('');
  const [logoImage, setLogoImage] = useState({data: ''});
  const [certificateData, setCertificateData] = useState({});
  const [showEditCertificationModal, setShowEditCertificationModal] = useState(false)
  const [imgPreview, setImgPreview] = useState();
  const [validateImg, setValidateImg] = useState(false)
  const [validateTitle, setValidateTitle] = useState(false)
  const [validateDescription, setValidateDescription] = useState(false)
  const [submitBtn, setSubmitBtn] = useState(false)
  const [deleteModalData, setDeleteModalData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const editCertificationData = props.data;

  const handleUploadCertificate = (e)=> {

    const formData = new FormData();
    formData.append('logo',logoImage.data,logoImage.data.name);
    formData.append('title',certificateName);
    formData.append('description',description);
    formData.append('type','certificate');

    post('/user/profile/show_case/create',formData,{headers:{'Authorization':`Bearer ${user.token}`}})
    .then((response)=> {
      if(response.status === 200) {
        window.location.reload()
      }
    })
    .catch((e)=> {
      
    })
  }
  const handleImageChange = (e)=>{
    let img = {data: e.target.files[0]}
    setLogoImage(img);
    setImgPreview(img.data);
  }
  const handleEditCertificationModal = (e, data) => {
    e.preventDefault();
    setCertificateData(data)
    setShowEditCertificationModal(true)
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
  const handleDeleteCertificationModal = (data) => {
    setDeleteModalData(data);
    setShowDeleteModal(true);
    return;
  }

    return (
        <>
<div className="modal fade certifications-modal" id="CertificationsModal" tabindex="-1" role="dialog" aria-labelledby="CertificationsModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Certifications</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
              <div className='upload'>
            <div className='upload-image'>
              <input className='img-block' type='file' id='company_logo' onChange={(e)=> handleImageChange(e)} />
                {logoImage.data?.name ? <><div className='img-block'> <input className='img-block' type='file' placeholder='Upload Newer Image' onChange={handleImageChange} onBlur={(e)=> imageValidation(e.target.files[0])} /> <img src={URL.createObjectURL(imgPreview)}/></div></>: <>
              <label htmlFor='company_logo'>
                <UploadIcon />
                <span>Drag n Drop here Or <span className='color-primary'>Browse</span></span>
              </label>
                </>}
            
            </div>
            <div className='upload-fields'>
              <div className='form-field'>
                <label className='form-label'>Certificate name <span className='mendatory'>*</span></label>
                <input type='text' name='cname' id='cname' className='form-input' placeholder='Enter Certificate Name' value={certificateName} onChange={(e)=> setCertificateName(e.target.value)} onBlur={(e)=> handleTitle(e.target.value)} />
                {validateTitle? <FieldValidationError message="Certificate Title Required!"/>: null}
              </div>
              <div className='form-field'>
                <label className='form-label'>Description <span className='mendatory'>*</span></label>
                <textarea className='form-input' placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value)} onBlur={(e) => handleDescription(e.target.value)}></textarea>
                {validateDescription? <FieldValidationError message="Certificate Description Required!"/>: null}
              </div>
            </div>
          </div>
            {validateImg? <FieldValidationError message="Image is Required"/> : null}
          <div className='upload-button text-right'><button className='button' disabled={submitBtn} onClick={(e)=> handleUploadCertificate(e)}>Upload</button></div>
              <div className='upload-lists'>
                {editCertificationData?.length > 0 ? 
                  editCertificationData?.map((certificate)=> (
                    <div className='upload-lists--item'>
                  <div className='img-block'>
                    <img src={certificate.file} />
                  </div>
                  <div className='content'>
                    <h6>{certificate.title}</h6>
                    <p>{certificate.description}</p>
                    <button className='edit-button' data-dismiss="modal" data-toggle="modal" data-target="#EditCertificationModal" onClick={(e)=> handleEditCertificationModal(e, certificate)}><Edit2Icon props={certificate} /></button>
                    <button className='btn btn-danger edit-button ' style={{marginRight: '50px', backgroundColor: 'red'}} data-dismiss="modal" data-toggle="modal" data-target="#DeleteModal" onClick={()=> handleDeleteCertificationModal(certificate)}><DeleteIcon props={certificate} /></button>
                  </div>
                </div>
                  )) : null}
              </div>
            </div>
            </div>
          </div>
        </div>

        {showEditCertificationModal ? <><EditCertificationModal data = {certificateData} /></> : <></>}
        {showDeleteModal ? <><DeleteModal data = {deleteModalData}/></> : <></>}
        </>
  )
}

export default CertificationModal