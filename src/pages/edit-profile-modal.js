import { useContext, useState, useEffect, useRef } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import CompanyLogo from '../assets/images/company-logo.png'
import { ReactComponent as EditIcon } from '../assets/images/edit-icon2.svg'
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg'
import { ReactComponent as TickIcon } from '../assets/images/tick-icon.svg'
import { post, get } from '../libs/http-hydrate'
import { resolvePath, useNavigate } from 'react-router-dom'
import Auth from '../libs/auth'
import { default as ReactSelect } from "react-select";
import { components } from 'react-select'
import FieldValidationError from '../components/error-messages/field-validation-error'
import profilePlaceholder from '../assets/images/profile-placeholder.svg'

function EditInfo(props) {
  let placeHolderImageSrc = 'https://dev-busimeet.s3.ap-south-1.amazonaws.com/default/user.png'
  const inputRef = useRef(null);
  const inputRefCompany = useRef(null);
  const data = props.data;
  const initialIndustryTransformed = data?.company_details?.industry?.map(({ id, name }) => ({ label: name, value: id }));
  const initialIndustryNumber = data.company_details.industry?.map((industry) => (industry.id));
  console.log('this is the data in the editProfile-modal', data)
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({})
  const [userName, setUserName] = useState("")
  const [designation, setDesignation] = useState('');
  const [logo, setLogo] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [about, setAbout] = useState('');
  const [industry, setIndustry] = useState(Array);
  const [availableIndustry, setAvailableIndustry] = useState([]);
  const [industryOption, setIndustryOption] = useState([])
  const [validateAbout, setValidateAbout] = useState(false);
  const [validateName, setValidateName] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);
  const [establishData, setEstablishDate] = useState();
  const [optionSelected, setOptionSelected] = useState(initialIndustryTransformed);
  const [logoImage, setLogoImage] = useState('');
  const [imgPreview, setImgPreview] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [validateImg, setValidateImg] = useState(false);
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const isRunned = useRef(false);

  const [isLogoUpdated, setIsLogoUpdated] = useState(false);
  const [logoPreview, setLogoPreview] = useState();
  const [isLogoDeleted, setIsLogoDeleted] = useState(false);

  // const [companyLogos, setCompanyLogo] = useState('')
  // const [isCompanyLogoUpdated, setIsCompanyLogoUpdated] = useState(false);
  // const [CompanyLogoImage, setCompanyLogoImage] = useState('');
  // const [companyImgPreview, setCompanyImgPreview] = useState();
  // const [isCompanyImgDeleted, setIsCompanyImgDeleted] = useState(false);



  const industryString = 'electronics'
  const user = Auth.getCurrentUser();
  console.log('data is : ', logo)
  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;
    if (data.profile_image.startsWith('https://')) {
      setLogoImage(data.profile_image);
      setIsNewProfile(true);
    }
    setIndustryOption(initialIndustryNumber);
    setDesignation(data.company_details.details.designation)
    setLogo(data.company_details.details.logo)
    setCompanyName(data.company_details.details.name)
    setGstNumber(data.company_details.details.gst_number)
    setEstablishDate(data.company_details.details.establish_date);
    setUserName(data.name);
    setAbout(data.about);

    post("/general/category_listing", { type: 'industry', }, { headers: { 'Authorization': `Bearer ${user.token}` } })
      .then((response) => {
        setAvailableIndustry(response.data.data);
      })

  }, []);

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const imageValidation = (file) => {
    if (!file) {
      setValidateImg(true);
      setSubmitBtn(true)
    }
    else {
      setValidateImg(false);
      setSubmitBtn(false)
    }
  }

  const handleImageChange = (e) => {
    let img = { data: e.target.files[0] }
    setIsUpdated(true);
    setLogoImage(img);
    setImgPreview(img.data)
  }

  const handleLogoChange = (e) => {
    console.log('image is : ', e.target.files[0]);
    let img = { data: e.target.files[0] }
    const newP = URL.createObjectURL(img.data);
    console.log('this is new p : ', newP)
    setIsLogoUpdated(true);
    setLogo(img);
    setLogoPreview(img.data)
  }


  const handleIndustryChange = (selected) => {
    setOptionSelected(selected);
    const newArray = [];
    selected.forEach((select) => {
      if (!newArray.includes(select.value)) {
        newArray.push(select.value);
      }
    })
    setIndustryOption(newArray);
  }

  const transformedIndustryArray = availableIndustry.map(({ id, name }) => ({ label: name, value: id }));
  const formData = new FormData();
  let profile_image;
  if (logoImage) {
    if (typeof logoImage === 'string') {
      if (logoImage?.startsWith('https://')) {

        fetch(logoImage)
          .then(response => response.blob())
          .then(blob => new File([blob], `${logoImage.substring(logoImage.lastIndexOf('/') + 1)}`, {
            type: blob.type
          }))
          .then(file => {

            formData.append('profile_image', file, file.name);
          })

      }
    }
    else {

      formData.append('profile_image', logoImage.data, logoImage.data.name);
    }
  } else if (isDeleted) {
    alert('we are in the else if')
    fetch(placeHolderImageSrc)
      .then(response => response.blob())
      .then(blob => new File([blob], `${placeHolderImageSrc.substring(placeHolderImageSrc.lastIndexOf('/') + 1)}`, {
        type: blob.type
      }))
      .then(file => {
        console.log('we are in the file makeing')
        formData.append('profile_image', file, file.name);
      })
  }

  // if (logoImage) {
  //   if (typeof logoImage === 'string') {
  //     if (logoImage?.startsWith('https://')) {

  //       fetch(logoImage)
  //         .then(response => response.blob())
  //         .then(blob => new File([blob], `${logoImage.substring(logoImage.lastIndexOf('/') + 1)}`, {
  //           type: blob.type
  //         }))
  //         .then(file => {

  //           formData.append('profile_image', file, file.name);
  //         })

  //     }
  //   }
  //   else {

  //     formData.append('profile_image', logoImage.data, logoImage.data.name);
  //   }
  // } else if (isDeleted) {
  //   console.log('we are in the else if')
  //   fetch(placeHolderImageSrc)
  //     .then(response => response.blob())
  //     .then(blob => new File([blob], `${placeHolderImageSrc.substring(placeHolderImageSrc.lastIndexOf('/') + 1)}`, {
  //       type: blob.type
  //     }))
  //     .then(file => {
  //       console.log('we are in the file makeing')
  //       formData.append('profile_image', file, file.name);
  //     })
  // }


  if (logo) {
    if (typeof logo === 'string') {
      if (logo?.startsWith('https://')) {
        fetch(logo)
          .then((response) => console.log(response))
          .then(response => response.blob())
          .then(blob => new File([blob], `${logo.substring(logo.lastIndexOf('/') + 1)}`, {
            type: blob.type
          }))
          .then(file => {
            formData.append('company_logo', file, file.name);
          })
      }
    }
    else {
      formData.append('company_logo', logo.data, logo.data.name);
    }
  } else if (isLogoDeleted) {
    alert(placeHolderImageSrc)
    fetch(placeHolderImageSrc)
      .then(response => console.log('this is the res : ', response.json()))
      .then((response => response.json()))
      .then(blob => new File([blob], `${placeHolderImageSrc.substring(placeHolderImageSrc.lastIndexOf('/') + 1)}`, {
        type: blob.type
      }))
      .then(file => {
        console.log('we are in the file makeing')
        formData.append('remove_company_logo', file, file.name);
      })
      .catch(err => {
        alert('errro')
        console.log('error is : ', err)
      })
  }

  formData.append('name', userName);
  formData.append('about', about)
  if (designation) {
    formData.append('designation', designation);
  }
  if (industryOption.length > 0) {
    // console.log('tihs is industry options', industryOption)
    industryOption.forEach((industry) => formData.append('industry[]', industry))
  }
  if (establishData) {
    formData.append('company_establish_date', establishData);
  }


  //const editData = { name: userName, designation: designation, about: about, industry: industryOption, company_establish_date: establishData, profile_image: profile_image }

  const postEditProfile = async () => {
    // console.log('the logo is  : ', URL.createObjectURL(logo?.data))

    await post('/user/profile/edit', formData, { headers: { 'Authorization': `Bearer ${user.token}` } })
      .then((response) => {
        if (response.status === 200) {
          document.location.reload(true);
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          alert(`${e.response.data.message}`)
        }
        if (e.response.status === 404) {
          alert("Route Not Found")
        }
        if (e.response.status === 500) {
          alert("Internal Server Error")
        }
      })
  }

  const handleAbout = (value) => {
    if (value.length === 0) {
      setValidateAbout(true);
      setSubmitBtn(true)
    }
    else if (value.length > 255) {
      setValidateAbout(true);
      setSubmitBtn(true)
    }
    else {
      setValidateAbout(false);
      setSubmitBtn(false)
    }
  }
  const handleName = (value) => {
    if (value.length === 0) {
      setValidateName(true);
      setSubmitBtn(true)
    }
    else if (value.length > 255) {
      setValidateName(true);
      setSubmitBtn(true)
    }
    else {
      setValidateName(false);
      setSubmitBtn(false)
    }
  }
  const handleClick = () => {
    inputRef.current.click();
  }
  // handleCompanyImgClick
  const handleLogosClick = () => {
    inputRefCompany.current.click();
  }

  const handleDeleteProfileImage = () => {
    setLogoImage('');
    setImgPreview();
    setIsDeleted(true);
  }

  // handleDeleteCompanyImage
  const handleDeleteLogo = () => {
    alert('logo deleted')
    setLogo('');
    setLogoPreview();
    setIsLogoDeleted(true);
  }


  //setAvailableIndustry(availableIndustry);
  return (
    <>
      <div className="modal fade edit-detail-modal" id="EditInfo" tabindex="-1" role="dialog" aria-labelledby="EditInfoLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><Close2Icon /></span>
              </button>
            </div>
            <div className="modal-body">
              <div className='row'>
                <div className='form-field col-sm-6'>
                  <label className='form-label'>Full Name <span className='mendatory'>*</span></label>
                  <input type='text' name='fname' id='fname' className='form-input' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter Full Name' onBlur={(e) => handleName(e.target.value)} required />
                  {validateName ? <FieldValidationError message="Name Is Required!" /> : null}
                </div>
                {data?.i_am === 'employee'
                  ? <>
                    <div className='form-field col-sm'>
                      <label className='form-label'>Designation <span className='mendatory'>*</span></label>
                      <input type='text' name='designation' id='designation' className='form-input' value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder='Enter Designation' required />
                    </div>
                  </> : null}
              </div>
              <div className='form-field'>
                <label className='form-label'>About <span className='mendatory'>*</span></label>
                <textarea className='form-input' placeholder='About' value={about} onChange={(e) => setAbout(e.target.value)} onBlur={(e) => handleAbout(e.target.value)}></textarea>
                {validateAbout ? <FieldValidationError message="About Is Required!" /> : null}
              </div>

              <div className='upload'>
                <div className='upload-images'>
                  <div className='upload-item'>
                    <label className='form-label'>Company Logo</label>
                    <div className='upload-image image-lists'>

                      <label htmlFor='company_logo'>
                        {/* {console.log('some data is : ',  URL.createObjectURL(logo?.data))} */}
                        {
                          isLogoUpdated ?
                            <>
                              {alert('in 1')}
                              <div className='img-block'>
                                <input type='file' id='company_logo' ref={inputRefCompany} placeholder='Upload Newer Image' onChange={handleLogoChange} onBlur={(e) => imageValidation(e.target.files[0])} />
                                {/* <img src={logo} /> */}
                                <img src={(logo ? URL.createObjectURL(logoPreview) : placeHolderImageSrc)} />
                                <div className='actions'>
                                  <button className='button-edit' onClick={handleLogosClick}><EditIcon /></button>
                                  <button className='button-delete' onClick={handleDeleteLogo}><DeleteIcon /></button>
                                </div>
                              </div>
                            </> :
                            <>
                              <div className='img-block'>
                                <input className='img-block' ref={inputRefCompany} type='file' placeholder='Upload New Image' onChange={handleLogoChange} onBlur={(e) => imageValidation(e.target.files[0])} />
                                <img src={logo || placeHolderImageSrc} />
                                <div className='actions'>
                                  <button className='button-edit' onClick={handleLogosClick}><EditIcon /></button>
                                  <button className='button-delete' onClick={handleDeleteLogo}><DeleteIcon /></button>
                                </div>
                              </div>

                            </>

                        }

                      </label>
                    </div>
                  </div>
                  <div className='upload-item'>
                    <label className='form-label'>Profile Picture</label>
                    <div className='upload-image image-lists'>

                      {isUpdated ?
                        <>
                          <div className='img-block'>
                            <input className='img-block' ref={inputRef} type='file' placeholder='Upload Newer Image' onChange={handleImageChange} onBlur={(e) => imageValidation(e.target.files[0])} />
                            <img src={(logo ? URL.createObjectURL(imgPreview) : placeHolderImageSrc)} />
                            <div className='actions'>
                              <button className='button-edit' onClick={handleClick}><EditIcon /></button>
                              <button className='button-delete' onClick={handleDeleteProfileImage}><DeleteIcon /></button>
                            </div>
                          </div>

                        </>
                        : <>
                          <div className='img-block'>
                            <input className='img-block' ref={inputRef} type='file' placeholder='Upload New Image' onChange={handleImageChange} onBlur={(e) => imageValidation(e.target.files[0])} />
                            <img src={logoImage || placeHolderImageSrc} />
                            <div className='actions'>
                              <button className='button-edit' onClick={handleClick}><EditIcon /></button>
                              <button className='button-delete' onClick={handleDeleteProfileImage}><DeleteIcon /></button>
                            </div>
                          </div>

                        </>}


                    </div>
                  </div>

                </div>
                <div className='upload-fields'>
                  <div className='row'>
                    <div className='col-sm'><h6>Company Details</h6></div>
                  </div>
                  <div className='row'>
                    <div className='form-field col-sm'>
                      <label className='form-label'>Company Name <span className='mendatory'></span></label>
                      <input type='text' name='cname' id='cname' className='form-input' onChange={(e) => setCompanyName(e.target.value)} value={companyName} placeholder='Enter Company Name' disabled />
                    </div>
                    <div className='form-field col-sm verified-icon'>
                      <label className='form-label'>GST No <span className='mendatory'></span></label>
                      <input type='text' name='cname' id='cname' className='form-input' onChange={(e) => setGstNumber(e.target.value)} value={gstNumber} placeholder='Enter GST No' disabled />
                      <TickIcon />
                    </div>
                    <div className='form-field col-sm'>
                      <label className='form-label'>ESTD<span className='mendatory'></span></label>
                      <input type='date' name='cname' id='cname' className='form-input' value={establishData} onChange={(e) => setEstablishDate(e.target.value)} />
                    </div>
                  </div>
                  <div className='row'>

                    <div className='form-field col-sm'>
                      <label className='form-label'>Industry <span className='mendatory'></span></label>
                      {/* <select  name='cname' id='cname' className='form-input' placeholder={handleIndustryData(industryOption)} value={handleIndustryData(industryOption)} onChange={(e)=> {handleChange(e.target.value)}}>
                  <option disabled selected value=''>Please Select The Industry</option>
                {availableIndustry.map((industry) => (
              <option value={industry.id}>{industry.name}</option>
              ))}
                </select> */}
                      <ReactSelect
                        options={transformedIndustryArray}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                          Option
                        }}
                        onChange={(selected) => handleIndustryChange(selected)}
                        allowSelectAll={true}
                        value={optionSelected}
                        className='multi-select'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" disabled={submitBtn} className="button button-primary" onClick={(e) => { postEditProfile(e) }}>Save</button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default EditInfo