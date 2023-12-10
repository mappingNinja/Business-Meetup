import { useState, useEffect } from 'react'
import { get } from '../libs/http-hydrate'
import Header from '../common/header'

function AboutUs () {
  const [data, setData] = useState({
    dataa:""
  })
  const backendHtmlString ="";
  useEffect(() => {
    async function fetchData () {
      const data = await get('/content/about')
      data.status === 200 && setData({...data,dataa:data.data}) 
    }
    fetchData();
  
  }, [])
  console.log(data)
  return (
    <>
    <Header login />
      <div className='content-page'>
        <div className='container-fluid'>
        <h2> About <span className='color-primary'>BusiMeet</span> </h2>
        <p dangerouslySetInnerHTML={{__html:data?.dataa}}></p>
        </div>
      </div>
    </>
  )
}

export default AboutUs
