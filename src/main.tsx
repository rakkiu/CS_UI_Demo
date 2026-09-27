import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import StorePage from './StorePage'
import './index.css'

const routes = {
  '/dang-ky': RegisterPage,
  '/dang-nhap': LoginPage,
  '/cua-hang': StorePage,
}
const Page = routes[window.location.pathname as keyof typeof routes] ?? App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)
