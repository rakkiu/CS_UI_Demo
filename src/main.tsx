import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RegisterPage from './RegisterPage'
import './index.css'

const Page = window.location.pathname === '/dang-ky' ? RegisterPage : App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)
