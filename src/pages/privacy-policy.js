
import { useState, useEffect } from 'react'
import { get } from '../libs/http-hydrate'
import Header from '../common/header'
function PrivacyPolicy () {
  const [data, setData] = useState()

  useEffect(() => {
    async function fetchData () {
      const data = await get('/content/privacy_policy')
      data.status === 200 && setData(data.data)
    }
    fetchData()
  }, [])

  return (
    <>
    <Header login />
    <div className='content-page'>
        <div className='container-fluid'>
        <h2> Privacy Policy </h2>
        <p>{data}</p>
        </div>
      </div>
      
    </>
  )
}

export default PrivacyPolicy
