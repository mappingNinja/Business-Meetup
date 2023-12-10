import { useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
import Home from './home'
import Login from './login'

function Landing () {
  const { state } = useContext(AuthContext)
  console.log('is logged in: ', state.isLoggedIn)
  const userData = JSON.parse(localStorage.getItem('user'))
  console.log('userData is: ', userData)
  return (
    <>
      {
        (userData && userData.token) ? <Home /> : <Login />
      }
    </>
  )
}

export default Landing
