import { useContext, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { ReactComponent as UploadIcon } from '../assets/images/upload-icon.svg'
import { ReactComponent as Edit2Icon } from '../assets/images/edit-icon2.svg'
import Auth from '../libs/auth'
import { post } from '../libs/http-hydrate'
import EditAwardsModal from './edit-awards-modal'
import FieldValidationError from '../components/error-messages/field-validation-error'
import DeleteModal from './delete-modal'
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg'
function AwardsModal (props) {
  const user = Auth.getCurrentUser();
  const [awardName, setAwardName] = useState('');
  const [description, setDescription] = useState('');
  const [logoImage, setLogoImage] = useState({data: ''});
  const [makeCover, setMakeCover] = useState(false);
  const [imgPreview, setImgPreview] = useState();
  const [showEditAwardsModal, setShowEditAwardsModal] = useState(false);
  const [showEditAwardsData, setShowEditAwardsData] = useState();
  const [validateImg, setValidateImg] = useState(false)
  const [validateTitle, setValidateTitle] = useState(false)
  const [validateDescription, setValidateDescription] = useState(false)
  const [submitBtn, setSubmitBtn] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [deleteModalData, setDeleteModalData] = useState({});

  const editAwardsData = props.data;
  
  const handleUploadCertificate = (e)=> {
    const formData = new FormData();
    formData.append('logo',logoImage.data,logoImage.data.name);
    formData.append('title',awardName);
    formData.append('description',description);
    formData.append('type','achievement');
    if(makeCover) {
      formData.append('make_cover_photo',1)
    } 
    if(makeCover === false) {
      formData.append('make_cover_photo',0)
    }
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
    setImgPreview(img.data)
  }

  const handleSpecificEditAward = (data)=> {
    setShowEditAwardsModal(true);
    setShowEditAwardsData(data);
    return;
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
  const handleDeleteAwardsModal = (data)=> {
    setDeleteModalData(data);
    setShowDeleteModal(true);
    return;
  }
    return (
        <>
<div className="modal fade certifications-modal" id="AwardsModal" tabindex="-1" role="dialog" aria-labelledby="AwardsModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Awards & Achivements</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
              <div className='upload'>
            <div className='upload-image'>
              <input type='file' className='img-block' id='company_logo' onChange={handleImageChange} />
              {logoImage.data?.name ? <><div className='img-block'> <input className='img-block' type='file' placeholder='Upload Newer Image' onChange={handleImageChange} /> <img src={URL.createObjectURL(imgPreview)}/></div></>: <>
              <label htmlFor='company_logo'>
                <UploadIcon />
                <span>Drag n Drop here Or <span className='color-primary'>Browse</span></span>
              </label>
                </>}
              
            </div>
            
            <div className='upload-fields'>
              <div className='form-field'>
                <label className='form-label'>Awards & Achivements name <span className='mendatory'>*</span></label>
                <input type='text' name='aname' id='aname' value={awardName} onChange={(e)=> setAwardName(e.target.value)} onBlur={(e)=> handleTitle(e.target.value)} className='form-input' placeholder='Awards & Achivements name' />
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
              <button className='button button-secondary' disabled={submitBtn} onClick={(e)=> handleUploadCertificate(e)}>Upload</button>
            </div>
              <div className='upload-lists'>
                {editAwardsData.length > 0 ?
                  editAwardsData.map((award)=> (
                    <>
                  <div className='upload-lists--item'>
                  <div className='img-block'>
                    <img src={award.file} />
                  </div>
                  <div className='content'>
                    <h6>{award.title}</h6>
                    <p>{award.description}</p>
                    <button type='button' className='edit-button' data-dismiss="modal" data-toggle="modal"  data-target="#EditAwardsModal" onClick={()=> handleSpecificEditAward(award)}><Edit2Icon props={award} /></button>
                    <button className='btn btn-danger edit-button ' style={{marginRight: '50px', backgroundColor: 'red'}} data-dismiss="modal" data-toggle="modal" data-target="#DeleteModal" onClick={()=> handleDeleteAwardsModal(award)}><DeleteIcon props={award} /></button>
                  </div>
                </div>
                  </>
                  )): <></>}
                
              </div>
              
              </div>
            </div>
          </div>
        </div>
        {showEditAwardsModal ? <><EditAwardsModal data = {showEditAwardsData} /></> : <></>}
        {showDeleteModal ? <><DeleteModal data = {deleteModalData}/></> : <></>}
        </>
  )
}

export default AwardsModal