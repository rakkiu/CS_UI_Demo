import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import OperatorDashboard from './OperatorDashboard'
import OperatorFarmMap from './OperatorFarmMap'
import OperatorDailyLog from './OperatorDailyLog'
import OperatorBatchStatus from './OperatorBatchStatus'
import OperatorAlerts from './OperatorAlerts'
import OperatorKyc from './OperatorKyc'
import OperatorCreateBatch from './OperatorCreateBatch'
import OperatorContract from './OperatorContract'
import OperatorHarvest from './OperatorHarvest'
import OperatorSettlement from './OperatorSettlement'
import OperatorBatchDetail from './OperatorBatchDetail'
import StorePage from './StorePage'
import CommercePage from './CommercePage'
import { DemoSessionProvider } from './DemoSession'
import './index.css'

const routes: Record<string, React.ComponentType> = {
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
  '/operator': OperatorDashboard,
  '/operator/kyc': OperatorKyc,
  '/operator/create-batch': OperatorCreateBatch,
  '/operator/contract': OperatorContract,
  '/operator/harvest': OperatorHarvest,
  '/operator/settlement': OperatorSettlement,
  '/operator/map': OperatorFarmMap,
  '/operator/log': OperatorDailyLog,
  '/operator/batch': OperatorBatchStatus,
  '/operator/batch/detail': OperatorBatchDetail,
  '/operator/alerts': OperatorAlerts,
}

// Remove query parameters for matching (e.g. /operator/batch/detail?demo=1 -> /operator/batch/detail)
const pathName = window.location.pathname;
const Page = routes[pathName] || App;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoSessionProvider>
      <Page />
    </DemoSessionProvider>
  </React.StrictMode>,
)
