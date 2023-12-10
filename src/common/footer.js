import './scss/common/footer.scss'
function Footer () {
  return (
    <>
      <footer>
        <div className='container-fluid'>
          <div className='footer-left'>
            {`©${new Date().getFullYear()} BusiMeet | All Right Reserved.`}
          </div>
          <div className='footer-right'>
            <ul>
              <li><a href='/terms-and-conditions'>Terms and Conditions</a></li>
              <li><a href='/privacy-policy'>Privacy policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
