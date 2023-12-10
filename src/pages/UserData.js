import {get, getAuthConfig } from '../libs/http-hydrate'


export default async function fetchData () {
    const data = await get('/user/profile/basic_details',getAuthConfig())
    if(data.status === 200)
    return data;

  }
