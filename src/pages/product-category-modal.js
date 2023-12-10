import { useContext, useState, useEffect } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { get ,post } from '../libs/http-hydrate'
import Auth from '../libs/auth'
import { useNavigate } from 'react-router-dom'
function RequireProductsCategories () {

  const [categoryData, setCategoryData] = useState([])
  const [userSelectedProductCategory, setUserSelectedProductCategory] = useState()
  const [categoryIds, setCategoryIds] = useState([]);
  const [categoryValue, setCategoryValue] = useState('')
  const navigate = useNavigate();
  const user = Auth.getCurrentUser()
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
      post('/general/category_listing',{type:'product'})
      .then((response)=> {
        setCategoryData(response.data.data);
      })
      .catch((err)=>{
        if(err) {
          alert("Something went wrong")
        }
      })
       handleCategoryValue(userSelectedProductCategory)
  },[userSelectedProductCategory])

  const availableCategoryData = categoryData;
  const handleAddCategory = (e,id)=> {
    e.preventDefault();
    setCategoryIds(categoryIds.concat(id))
  }
  const handleDeleteCategory = (id)=>{
    categoryIds.indexOf(id) !== -1 && categoryIds.splice(categoryIds.indexOf(id), 1);

  }

  const handleSaveCategory = ()=> {
    post('/user/profile/sync_product_category', {category_ids:categoryIds}, {headers:{'Authorization':`Bearer ${user.token}`}})
    .then((response)=>{
      if (response.status === 200) {
        window.location.reload();
      }
    })
    .catch((e)=>{
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

  const  handleCategoryValue =  (categoryId) => {
    categoryData.forEach((obj)=> {
      if(obj.id == categoryId) {
        setCategoryValue(obj.name)
      }
  })
  }

    return (
        <>
<div className="modal fade certifications-modal add-product-category" id="ProductCategoryModal" tabindex="-1" role="dialog" aria-labelledby="ProductCategoryModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Require Products Categories</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
                <div className='tags tags-regular'>
                  {categoryIds.length > 0 ?
                   <>
                   {categoryIds.map((category)=> (
                  <span className='tag' >{categoryValue}<Close2Icon onClick={()=> handleDeleteCategory(category)} /></span>
                  ))}
                   </> : <></>}
                </div>
                <div className='form-field'>
                <label className='form-label'>Add Category</label>
                <div className='flex-box'>
                <select name='cname' id='cname' className='form-input' value={userSelectedProductCategory} onChange={(e)=> {setUserSelectedProductCategory(e.target.value)}}>
                  <option disabled selected value=''>Select Your Product Category</option>
                {availableCategoryData.map((categoryData) => (
              <option value={categoryData.id}>{categoryData.name}</option>
              ))}
                </select>
              <button className='button button-blue' onClick={(e)=> handleAddCategory(e, userSelectedProductCategory)}>Add</button>
                </div>
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="button button-primary" onClick={()=> handleSaveCategory()}>Save</button>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default RequireProductsCategories