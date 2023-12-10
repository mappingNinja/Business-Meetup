import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { post } from '../libs/http-hydrate'
import Auth from '../libs/auth'
import ProductImagePlaceholder from "../assets/images/product-image-placeholder.png";


function EditBrandsModal (props) {

  const user = Auth.getCurrentUser();
  let editBrandsData = props.data;
  const [brandName, setBrandName] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const [imgPreview, setImgPreview] = useState();
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(()=> {

    console.log("props",props)
    setBrandName(editBrandsData.name);
    if(editBrandsData.icon === null){
      setLogoImage("")


    }
    else{
      setLogoImage(editBrandsData.icon)

    }
  }, [editBrandsData])
  


  const handleUploadBrand = (e)=> {
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
    formData.append('name',brandName);


    post(`/product/brand/update/${editBrandsData.id}`,formData,{headers:{'Authorization':`Bearer ${user.token}`}})
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

    return (
        <>
<div className="modal fade certifications-modal" id="EditBrandsModal" tabindex="-1" role="dialog" aria-labelledby="EditBrandsModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Brand</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" ><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
              <div className='upload'>
            <div className='upload-image'>
            
            {logoImage === "" ?
            
            
            <div className='img-block'> <input className='img-block' type='file' placeholder='Upload Newer Image' onChange={handleImageChange} /> <img src={ProductImagePlaceholder}/></div>
 : 
                isUpdated ? 
                <>
                <div className='img-block'> <input className='img-block' type='file' placeholder='Upload Newer Image' onChange={handleImageChange} /> <img src={URL.createObjectURL(imgPreview)}/></div>
                </>
                :<>
                <div className='img-block'> <input className='img-block' type='file' placeholder='Upload New Image' onChange={handleImageChange} /> <img src={logoImage} /></div>
                </>}
            </div>
            <div className='upload-fields'>
              <div className='form-field'>
                <label className='form-label'>Brand name <span className='mendatory'>*</span></label>
                <input type='text' name='cname' id='cname' className='form-input' value={brandName} placeholder='Enter Brand Name' onChange={(e)=> setBrandName(e.target.value)} />
              </div>
            </div>
          </div>
          <div className='upload-button text-right'><button className='button' onClick={(e) => handleUploadBrand(e)}>Upload</button></div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default EditBrandsModal