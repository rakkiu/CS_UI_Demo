import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
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
import './index.css'

let Page = App;
const path = window.location.pathname;

if (path === '/dang-ky') Page = RegisterPage;
else if (path === '/operator') Page = OperatorDashboard;
else if (path === '/operator/kyc') Page = OperatorKyc;
else if (path === '/operator/create-batch') Page = OperatorCreateBatch;
else if (path === '/operator/contract') Page = OperatorContract;
else if (path === '/operator/harvest') Page = OperatorHarvest;
else if (path === '/operator/settlement') Page = OperatorSettlement;
else if (path === '/operator/map') Page = OperatorFarmMap;
else if (path === '/operator/log') Page = OperatorDailyLog;
else if (path === '/operator/batch') Page = OperatorBatchStatus;
else if (path === '/operator/batch/detail') Page = OperatorBatchDetail;
else if (path === '/operator/alerts') Page = OperatorAlerts;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)
