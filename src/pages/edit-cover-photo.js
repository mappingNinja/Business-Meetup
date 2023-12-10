import { useContext, useEffect, useState } from 'react'
import profileCover from '../assets/images/profile-cover.jpg'
import { ReactComponent as CompleteIcon } from '../assets/images/complete-icon.svg'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import coverPlaceHolder from '../assets/images/img-placeholder.svg'
import { get, post } from '../libs/http-hydrate';
import Auth from '../libs/auth';


function EditCoverPhoto (props) {
  console.log('this is the propps in the editCoverPhoto', props.data)
  const [availableCoverImage, setAvailableCoverImage] = useState([]);
  const [checked, setChecked] = useState()
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState()
const user = Auth.getCurrentUser();
useEffect(()=> {
  get('/general/custom_media_list?type=user_cover_image',{headers:{'Authorization':`Bearer ${user.token}`}})
  .then((resposne)=> {
    console.log("this is the available responses", resposne.data.data)
    setAvailableCoverImage(resposne.data.data)
  })
  .catch((err)=> {
    console.log("something went wrong", err)
  })
  setImage(props?.data)
  setImageId(props?.data?.id)
},[props.data])

const updateCoverImg = ()=> {

  const formData = new FormData()

  if(imageId !== null) {
    formData.append('cover_image_id', imageId)
  }

  post('/user/profile/update_cover_image', formData, {headers:{'Authorization':`Bearer ${user.token}`}} )
  .then((resposne)=> {
    if(resposne.status === 200) {
      window.location.reload();
    }
  })
  .catch((err)=> {
    console.log("this is the error", err)
  })
}

const handleCoverImgChagne = (data)=> {
  console.log('this is the data coverimg',data)
availableCoverImage.forEach((element)=> {
  if(data.id == element.id) {
    setImage(element.file);
    setImageId(element.id)
  }
})
}



    return (
        <>
<div className="modal fade change-cover" id="ChangeCover" tabindex="-1" role="dialog" aria-labelledby="ChangeCoverLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Cover Photo</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
                <div className='cover-preview'><img src={image||coverPlaceHolder} alt='Cover Image' /></div>
                <div className='cover-images'>
                  {availableCoverImage.length > 0? 
                  <>
                  {availableCoverImage.map((coverImg,index)=> (
                    <div className='image-item' key={index}>
                    <input type='radio' name='cover_image'  value={coverImg.id} onChange={(e)=> {setChecked(e.target.value); handleCoverImgChagne(coverImg)}} id={coverImg.id}/>
                    <label htmlFor={coverImg.id}><img src={coverImg.file} alt='Cover Image' /><CompleteIcon /></label>
                  </div>
                  ))}
                  
                  </> : <><p>No Available Cover Images!!</p></>}
                  
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="button button-primary" onClick={()=> updateCoverImg()}>Save</button>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default EditCoverPhoto