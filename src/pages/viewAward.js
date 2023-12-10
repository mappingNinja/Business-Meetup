import { useContext, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
function ViewAward (props) {
  const awardData = props.data;
    return (
        <>
<div className="modal fade certifications-modal" id="ViewAward" tabindex="-1" role="dialog" aria-labelledby="ViewAwardLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Award/Achievement</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
                <div className='view-certificate'>
                  <div className='img-block' style={{width:'50%',height:'30%',margin:'auto'}}>
                    <img src={awardData.file} alt='' />
                  </div>
                  <div className='content-block'>
                    <h6>{awardData.title}</h6>
                    <p>{awardData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default ViewAward