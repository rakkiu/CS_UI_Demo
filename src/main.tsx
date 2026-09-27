import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import StorePage from './StorePage'
import CommercePage from './CommercePage'
import { DemoSessionProvider } from './DemoSession'
import './index.css'

const routes = {
  '/dang-ky': RegisterPage,
  '/dang-nhap': LoginPage,
  '/cua-hang': StorePage,
  '/gio-hang': CommercePage,
  '/thanh-toan': CommercePage,
  '/xac-nhan-don-hang': CommercePage,
  '/theo-doi-don-hang': CommercePage,
  '/lich-su-don-hang': CommercePage,
  '/huy-tra-hang': CommercePage,
  '/danh-gia-don-hang': CommercePage,
  '/san-pham': CommercePage,
}
const Page = routes[window.location.pathname as keyof typeof routes] ?? App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><DemoSessionProvider><Page /></DemoSessionProvider></React.StrictMode>,
)
