import { useContext, useState, useEffect } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import GSTImage from '../assets/images/gst.png'
import BankImage from '../assets/images/bank.png'
function VerifyModal () {
  const [show, setShow] = useState(false);
  useEffect(()=>{
    setShow(true);
  }, []);
  
    return (
        <>
<div className="modal fade verify-modal" show={show} onHide={() => setShow(false)} id="VerifyModal" tabindex="-1" role="dialog" aria-labelledby="VerifyModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Please Fill Below Details</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
                <div className="alert alert--highlight">
                  <p>For authenticate users we take the correct company details and payment details.</p>
                </div>
                <div className='row verify-gst-bank'>
                  <div className='col-sm'>
                    <div className='img-block'><img src={GSTImage} /></div>
                    <button className='button button-primary' data-toggle="modal" data-target="#VerifyGSTModal">Verify GST Number</button>
                  </div>
                  <div className='col-sm'>
                    <div className='img-block'><img src={BankImage} /></div>
                    <button className='button button-primary'>Verify Bank Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default VerifyModal