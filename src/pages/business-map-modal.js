import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { ReactComponent as BusinessIcon } from '../assets/images/business-icon.svg'
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg'
import { post, get } from '../libs/http-hydrate';
import FieldValidationError from '../components/error-messages/field-validation-error'
import Auth from '../libs/auth';
function BusinessMapModal (props) {

  const user = Auth.getCurrentUser();
  const [initialProps, setInitialProps] = useState([{}]);
  const [availableBusinessMap, setAvailableBusinessMap] = useState([])
  const [logo, setLogo] = useState('');
  const [isEmpty, setIsEmpty] = useState();


useEffect(()=> {
  setInitialProps(props.data);
  if(props.data?.length === 0) {
    setInitialProps([{id: 1, description: '', year: 2000}])
  }
  get('/general/custom_media_list?type=business_map', {headers:{'Authorization':`Bearer ${user.token}`}} )
  .then((response)=> {
    setAvailableBusinessMap(response.data.data)
  })
  .catch((err)=> {
    
  })
}, [props.data])

  const handleSaveBusinessMap = ()=> {
    
    initialProps.forEach((businessMap)=> {
      delete businessMap['id'];
      businessMap['id'] = businessMap['media_id'];
      delete businessMap['media_id']
    })

    post('/user/profile/business_map',{details:initialProps}, {headers:{'Authorization':`Bearer ${user.token}`}})
    .then((response)=> {
      if(response.status === 200) {
        window.location.reload();
      }
    })
    .catch((error)=> {
    
    })
  }

  const makeYearJson = ()=> {
    let yearJson = []

    for(let i=1900; i<2023; i++) {
      let yearObject = {year: i, id: i}
      yearJson.push(yearObject)
    }

    return yearJson;
  }

  const yearJson = makeYearJson();

const handleFormChange = (index, event) => {
  let data = [...initialProps];
  data[index][event.target.name] = event.target.value;
 
  availableBusinessMap.forEach((element)=> {
    if(data[index].id == element.id) {
      data[index].media = element
      data[index].media_id = element.id
    }
  })
 

  setInitialProps(data);
}

const addFields = () => {
  let newfield = { id: 1, description: '', year: 2000 }
  setInitialProps([...initialProps, newfield])
}

const removeFields = (index) => {
  let data = [...initialProps];
  data.splice(index, 1)
  setInitialProps(data)
}

const emptyValidation = (index)=> {
  if (initialProps.length === 0 || initialProps[index].description === '') {
    setIsEmpty(true);
  } else {
    setIsEmpty(false);
  }
}

    return (
        <>
<div className="modal fade certifications-modal business-map-modal" id="BusinessMapModal" tabindex="-1" role="dialog" aria-labelledby="BusinessMapModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"> Business Map</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
                <div className='business-map'>
                  {initialProps?.length >= 1 
                  ? <>
                  {initialProps?.map((input, index)=> (
                    <div className='map-item' key={index}>
                    <div className='map-item-inner'>
                      <div className='icon'><img src={input?.media?.file}/></div>
                      <div className='content'>
                        <div className='flex-box'>
                          <div className='flex-item year'>
                          <div className='form-field'>
                            <label className='form-label'>Year <span className='mendatory'>*</span></label>
                            <select name='year' value={input?.year} onChange={event => handleFormChange(index, event)} className='form-input'>
                              <option disabled selected>Year</option>
                              {yearJson.map((year)=> (
                                <option value={year.id}>{year.year}</option>
                              ))}
                            </select>
                          </div>
                          </div>
                          <div className='flex-item type'>
                          <div className='form-field'>
                            <label className='form-label'>Map Type <span className='mendatory'>*</span></label>
                            <select name='id' onChange={event => {handleFormChange(index, event)}} className='form-input'>
                              <option selected value={input?.media_id} disabled>{input?.media?.name}</option>
                              {availableBusinessMap.map((businessMap)=> (
                              <option value={businessMap.id}>{businessMap.name}</option>
                              ))}
                              </select>
                          </div>
                          </div>
                        </div>
                        <div className='form-field'>
                          <label className='form-label'>Description <span className='mendatory'>*</span></label>
                          <input type='text' name='description' id='cname' className='form-input' value={input?.description} onChange={event => handleFormChange(index, event)} onBlur={()=> emptyValidation(index)} placeholder='Enter Description' />
                          {isEmpty ? <FieldValidationError message = "Description cannot be null!!"/>: null}
                        </div>
                      </div>
                    </div>
                    {initialProps?.length === 1 ? <></> : 
                    <><button className='button-delete' onClick={()=> removeFields(index)}><DeleteIcon /></button></>}   
                    </div>
                    ))}
                    </>: null}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" disabled={!!isEmpty} className="button button-primary" onClick={()=> handleSaveBusinessMap()}>Save</button>
                <button className='button button-success' onClick={()=> addFields()}>Add More</button>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default BusinessMapModal