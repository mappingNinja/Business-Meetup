import React, { createContext, useState } from 'react'

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null
}

export const AuthContext = createContext(null)

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState)

  const setIsLoggedIn = value => setState({ isLoggedIn: value })
  const setIsLoginPending = value => setState({ isLoginPending: value })
  const setLoginError = value => setState({ loginError: value })

  /*   const user = localStorage.getItem('user')
    if (user user.token) {
      setIsLoggedIn(true)
    } */

  return (
    <AuthContext.Provider value={{
      state,
      setIsLoggedIn,
      setIsLoginPending,
      setLoginError
    }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
