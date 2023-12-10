import { useContext, useState } from 'react';
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import Auth from '../libs/auth';
import { post, get } from '../libs/http-hydrate';
function DeleteModal (props) {
  const user = Auth.getCurrentUser();

  const deleteData = props.data;
 
  const handleDeletePost = ()=> {
    get(`/user/profile/show_case/delete/${deleteData.id}`,{headers:{'Authorization':`Bearer ${user.token}`}})
    .then((response)=> {
        if(response.status === 200) {
            window.location.reload();
        }
    })
    .catch((e)=> {
        alert('Something went wrong...')
    })
  }

  const reloadPage =()=> {
    window.location.reload();
  }
    return (
        <>
<div className="modal fade certifications-modal" id="DeleteModal" tabindex="-1" role="dialog" aria-labelledby="DeleteModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className='view-certificate'>
                  <div className='content-block'>
                    <h6 style={{marginBottom:'3%'}}>Do You Want To Delete It?</h6>
                    <button style={{marginRight:'3%'}} className='button btn-danger' onClick={handleDeletePost}>Yes</button>
                    <button className='button' data-dismiss="modal" aria-label="Close" >No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default DeleteModal