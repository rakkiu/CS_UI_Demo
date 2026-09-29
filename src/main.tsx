import React from 'react'
import ReactDOM from 'react-dom/client'
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
import InvestorApp from './investor/InvestorApp'
import AdminDashboard from './admin/AdminDashboard'
import AdminUsers from './admin/AdminUsers'
import AdminUserDetail from './admin/AdminUserDetail'
import AdminBatches from './admin/AdminBatches'
import AdminBatchDetail from './admin/AdminBatchDetail'
import AdminStorefront from './admin/AdminStorefront'
import AdminFinance from './admin/AdminFinance'
import AdminSettlementDetail from './admin/AdminSettlementDetail'
import AdminAlerts from './admin/AdminAlerts'
import AdminDisputes from './admin/AdminDisputes'
import AdminSettings from './admin/AdminSettings'
import Landing from './landing/Landing'
import DesignIndex from './redesign/DesignIndex'
import { StoreV1, StoreV2, StoreV3 } from './redesign/Store'
import { InvestorV1, InvestorV2, InvestorV3 } from './redesign/Investor'
import { DemoSessionProvider } from './DemoSession'
import './index.css'

const routes: Record<string, React.ComponentType> = {
  '/thiet-ke': DesignIndex,
  '/thiet-ke/cua-hang/1': StoreV1,
  '/thiet-ke/cua-hang/2': StoreV2,
  '/thiet-ke/cua-hang/3': StoreV3,
  '/thiet-ke/nha-dau-tu/1': InvestorV1,
  '/thiet-ke/nha-dau-tu/2': InvestorV2,
  '/thiet-ke/nha-dau-tu/3': InvestorV3,
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
  '/admin': AdminDashboard,
  '/admin/users': AdminUsers,
  '/admin/users/detail': AdminUserDetail,
  '/admin/batches': AdminBatches,
  '/admin/batches/detail': AdminBatchDetail,
  '/admin/storefront': AdminStorefront,
  '/admin/finance': AdminFinance,
  '/admin/finance/settlement': AdminSettlementDetail,
  '/admin/alerts': AdminAlerts,
  '/admin/disputes': AdminDisputes,
  '/admin/settings': AdminSettings,
}

// Remove query parameters for matching (e.g. /operator/batch/detail?demo=1 -> /operator/batch/detail)
const pathName = window.location.pathname;
const Page = pathName === '/investor' || pathName.startsWith('/investor/') ? InvestorApp : routes[pathName] || Landing;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoSessionProvider>
      <Page />
    </DemoSessionProvider>
  </React.StrictMode>,
)
