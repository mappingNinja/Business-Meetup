import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { post } from '../libs/http-hydrate'
import Auth from '../libs/auth'
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg'
import { ReactComponent as UploadIcon } from '../assets/images/upload-icon.svg'
import FieldValidationError from '../components/error-messages/field-validation-error'



function EditVisitingCard (props) {

  const user = Auth.getCurrentUser();
  let editVisitingCardData = props.data;
  console.log('this is the data in visiting card', props);

  const [logoImage, setLogoImage] = useState('');
  const [imgPreview, setImgPreview] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [deleteVisitingCard, setDeleteVisitingCard] = useState(true);
  const [dataIsUrl, setDataIsUrl] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [showDeletionAlert, setShowDeletionAlert] = useState(false);
  const [showDeletionError, setShowDeletionError] = useState(false);

  useEffect(()=> {
    if((editVisitingCardData !== null || editVisitingCardData !== undefined) && (typeof editVisitingCardData === 'string')) {
      setDeleteVisitingCard(false);
      setLogoImage(editVisitingCardData);
      setDataIsUrl(true);
    } 
  }, [])
  
  
  const handleUploadVisitingCard = (e)=> {
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
          formData.append('visiting_card', file, file.name)
     })
   
      }
  }
    else {
      formData.append('visiting_card', logoImage.data, logoImage.data.name)
    }
    post(`/user/visiting_card`,formData,{headers:{'Authorization':`Bearer ${user.token}`}})
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
    setImgPreview(img.data);
    setDeleteVisitingCard(false)
  }
  const handleDeleteVisitingCard = () => {
    setLogoImage();
    setImgPreview();
    setDeleteVisitingCard(true);
    setDataIsUrl(false);
    setIsUpdated(false)

    post(`/user/visiting_card`,{visiting_card: null},{headers:{'Authorization':`Bearer ${user.token}`}})
    .then((response)=> {
      console.log('deleted!!', response)
    })
    .catch((e)=> {
      setShowDeletionError(true);
    })
  }

    return (
        <>
<div className="modal fade certifications-modal" id="VisitingCardModal" tabindex="-1" role="dialog" aria-labelledby="VisitingCardModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Your Visiting Card</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
              <div className='upload'>
            <div className='upload-image' style={{margin:'auto'}}>

                {isUpdated ? 
                <>
                <div className='img-block'>
                    <button onClick={()=> handleDeleteVisitingCard()} className='btn btn-danger' style={{float:'right'}}><DeleteIcon/></button> 
                    <input className='img-block' type='file' disabled placeholder='Upload New Visiting Card' onChange={handleImageChange} />
                     <img src={URL.createObjectURL(imgPreview)}/></div>
                </>
                :<>
                </>}
                {dataIsUrl ? <><div className='img-block'>
                   <button onClick={()=> handleDeleteVisitingCard()} className='btn btn-danger' style={{float:'right'}}><DeleteIcon/></button> 
                   <input className='img-block' disabled type='file' placeholder='Upload New Visiting Card' onChange={handleImageChange} /> <img src={logoImage} /></div></> : 
                   <>
                   </>}
                {deleteVisitingCard  ?
                <>
                <input type='file' className='img-block' onChange={handleImageChange} />
                <label htmlFor='company_logo'>
                <UploadIcon />
                <span>Drag n Drop here Or <span className='color-primary'>Browse</span></span>
              </label>
                
                </> : <></>}
            </div>
            {showDeletionError ? <FieldValidationError message="Unable to delete the visiting card!!"></FieldValidationError> : null}
          </div>
          <div className='upload-button text-right'><button disabled={disabledBtn} className='button' onClick={(e) => handleUploadVisitingCard(e)}>Upload</button></div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default EditVisitingCard



