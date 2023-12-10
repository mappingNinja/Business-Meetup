import axios from 'axios'
import Auth from './auth'
/* axios.defaults.headers = {
  'X-CSRF-TOKEN': 'xxx'
} */
//  axios.defaults.withCredentials = true
const BASE_URL = 'https://api.busimeet.com/api/V1'

const postConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

export const getAuthConfig = () => {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: Auth.getAuthToken()
    }
  }
}

export const post = async (url, payload, config = postConfig) => {
  const data = await axios.post(BASE_URL + url, payload, config)
  return data
}

export const postwithOu = async (url, config,payload ) => {
  const data = await axios.post(BASE_URL + url, payload, config)
  return data
}

export const get = async (url, args) => {
  const data = await axios.get(BASE_URL + url,args)
  return data
}

export const dummyRequest = async (response) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response)
    }, 1500)
  })
}
