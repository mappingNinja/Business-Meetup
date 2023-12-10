import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { ReactComponent as UploadIcon } from '../assets/images/upload-icon.svg'
import { ReactComponent as Edit2Icon } from '../assets/images/edit-icon2.svg'

import Auth from '../libs/auth'
import {post} from '../libs/http-hydrate'
function BrandsModal (props) {

  const user = Auth.getCurrentUser();
  let brandsData = props.data;

  const [title, setTitle] = useState('');
  const [logoImage, setLogoImage] = useState({data: ''});
  const [imgPreview, setImgPreview] = useState();

  useEffect(()=> {
    setTitle(brandsData.title);
    setLogoImage(brandsData.file);
  },[brandsData])

  const handleImageChange = (e)=>{
    let img = {data: e.target.files[0]}
    setLogoImage(img);
    setImgPreview(img.data);
  }
  const handleBrandUpload = (e)=> {
    const formData = new FormData();
    formData.append('logo',logoImage.data,logoImage.data.name);
    formData.append('title',title);
    formData.append('description','test')
    formData.append('type','brand');

    post('/user/profile/show_case/create',formData,{headers:{'Authorization':`Bearer ${user.token}`}})
    .then((response)=> {
      if(response.status === 200) {
         window.location.reload()
      }
    })
    .catch((e)=> {
      
    })
  }

    return (
        <>
<div className="modal fade certifications-modal" id="BrandsModal" tabindex="-1" role="dialog" aria-labelledby="BrandsModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Brands</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
              <div className='upload'>
            <div className='upload-image'>
            <input className='img-block' type='file' id='company_logo' onChange={handleImageChange} />
                {logoImage?.data?.name ? <><div className='img-block'> <input className='img-block' type='file' placeholder='Upload Newer Image' onChange={handleImageChange} /> <img src={URL.createObjectURL(imgPreview)}/></div></>: <>
              <label htmlFor='company_logo'>
                <UploadIcon />
                <span>Drag n Drop here Or <span className='color-primary'>Browse</span></span>
              </label>
                </>}
            </div>
            
            <div className='upload-fields'>
              <div className='form-field'>
                <label className='form-label'>Brand name <span className='mendatory'>*</span></label>
                <input type='text' name='bname' id='bname' className='form-input' placeholder='Brand name' value={title} onChange={(e)=> setTitle(e.target.value) } />
              </div>
            </div>
          </div>
          <div className='upload-button text-right'><button className='button' onClick={(e)=> handleBrandUpload(e)}>Upload</button></div>
              <div className='upload-lists brands-list'>
                {brandsData?.length > 0 
                  ? <>
                  {brandsData.map((brand)=> (
                  <div className='upload-lists--item'>
                  <div className='img-block'>
                    <img src={brand.file} />
                  </div>
                  <div className='content'>
                    <h6>{brand.title}</h6>
                    <button className='edit-button' data-dismiss="modal"  data-toggle="modal" data-target="#EditBrandsModal"><Edit2Icon /></button>
                  </div>
                  </div>
                  ))}
                    </> : <></>}
                
              </div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default BrandsModal