import './App.css';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/landingPageLayout';
import HomePage from './pages/homePage';
import LandingPage from './pages/landingPage';
import SigninPage from './pages/signinPage';
import SignupPage from './pages/signupPage';
import UserDailyReportPage from './pages/userDailyReportPage';
import UserWeeklyReportPage from './pages/userWeeklyReportPage';
import UserFreelancerInfoPage from './pages/userFreelancerInfoPage';
import UserPCInfoPage from './pages/userPCInfoPage';
import UserPaymentInfoPage from './pages/userPaymentInfoPage';
import UserPaymentPlanPage from './pages/userPaymentPlanPage';
import UserUpworkInfoPage from './pages/userUpworkInfoPage';
import UserVPSInfoPage from './pages/userVPSInfoPage';
import AdminDailyReportPage from './pages/adminDailyReportPage';
import AdminReportStatusPage from './pages/adminReportStatusPage';
import AdminPaymentHistorytPage from './pages/adminPaymentHistoryPage';
import AdminPaymentStatusPage from './pages/adminPaymentStatusPage';
import AdminPaymentInfoPage from './pages/adminPaymentInfoPage';
import AdminFreelancerInfoPage from './pages/adminFreelancerInfoPage';
import AdminUpworkInfoPage from './pages/adminUpworkInfoPage';
import AdminVPSInfoPage from './pages/adminVPSInfoPage';
import AdminPCInfoPage from './pages/adminPCInfoPage';
import AdminReportSettingPage from './pages/adminReportSettingPage';
import AdminRollSettingPage from './pages/adminRollSettingPage';
import AdminPasswordSettingPage from './pages/adminPasswordSettingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='landing' element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='userDailyReport' element={<UserDailyReportPage />} />
          <Route path='userWeeklyReport' element={<UserWeeklyReportPage />} />
          <Route path='userPaymentPlan' element={<UserPaymentPlanPage />} />
          <Route path='userPaymentInfo' element={<UserPaymentInfoPage />} />
          <Route path='userFreelancerInfo' element={<UserFreelancerInfoPage />} />
          <Route path='userUpworkInfo' element={<UserUpworkInfoPage />} />
          <Route path='userVPSInfo' element={<UserVPSInfoPage />} />
          <Route path='userPCInfo' element={<UserPCInfoPage />} />
          <Route path='adminDailyReport' element={<AdminDailyReportPage />} />
          <Route path='adminReportStatus' element={<AdminReportStatusPage />} />
          <Route path='adminPaymentHistory' element={<AdminPaymentHistorytPage />} />
          <Route path='adminPaymentStatus' element={<AdminPaymentStatusPage />} />
          <Route path='adminPaymentInfo' element={<AdminPaymentInfoPage />} />
          <Route path='adminFreelancerInfo' element={<AdminFreelancerInfoPage />} />
          <Route path='adminUpworkInfo' element={<AdminUpworkInfoPage />} />
          <Route path='adminVPSInfo' element={<AdminVPSInfoPage />} />
          <Route path='adminPCInfo' element={<AdminPCInfoPage />} />
          <Route path='adminReportSetting' element={<AdminReportSettingPage />} />
          <Route path='adminRollSetting' element={<AdminRollSettingPage />} />
          <Route path='adminPasswordSetting' element={<AdminPasswordSettingPage />} />
        </Route>
        <Route path='signin' element={<SigninPage />} />
        <Route path='signup' element={<SignupPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
