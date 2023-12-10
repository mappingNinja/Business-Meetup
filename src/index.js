import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { ContextProvider } from './context/Auth.context'
import { ThemeContextProvider } from './context/Theme.context'
import { SwitchProfileProvider } from './context/switchProfile.context'
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeContextProvider>
        <SwitchProfileProvider>
        <Router>
        <App />
        </Router>
        </SwitchProfileProvider>
      </ThemeContextProvider>
    </ContextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
