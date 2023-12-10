
import { useState, useEffect } from 'react'
import { get } from '../libs/http-hydrate'
import Header from '../common/header'
function TermsAndConditions () {
  const [data, setData] = useState({
    dataa:""
  })

  useEffect(() => {
    async function fetchData () {
      const data = await get('/content/term_and_condition')
      data.status === 200 && setData({...data,dataa:data.data})
    }
    fetchData()
  }, [])

  return (
    <>
    <Header login />
    <div className='content-page'>
        <div className='container-fluid'>
        <h2> Terms and Conditions </h2>
        <p dangerouslySetInnerHTML={{__html:data?.dataa}}></p>
        </div>
      </div>
    </>
  )
}

export default TermsAndConditions
