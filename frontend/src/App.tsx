import {useState, useEffect} from 'react';
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
import AdminRoleSettingPage from './pages/adminRoleSettingPage';
import AdminPasswordSettingPage from './pages/adminPasswordSettingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userApi } from "./redux/api/userApi";
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from "react-router-dom";

const theme = createTheme();

function App() {
  const navigate = useNavigate();
  const [userrole, setUserrole] = useState("");
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation(); 
  
  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
  });

  useEffect(() => {
    setUserrole(user?.role)
  }, [user?.role])
  
  useEffect(() => {
     if (cookies.logged_in && location?.pathname === "/"){
      if(user?.role === "user") {
        return navigate("/user/landing");
      } else if(user?.role === "admin"){
        return navigate("/admin/landing");
      }
     }
  },[cookies.logged_in]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
        <Routes>
          <Route path='/' element={<HomePage />} />
          {userrole === "user" ? (
            <>
            <Route path='user' element={<Layout />}>
              <Route path='landing' element={<LandingPage />} />
              <Route path='dailyReport' element={<UserDailyReportPage />} />
              <Route path='weeklyReport' element={<UserWeeklyReportPage />} />
              <Route path='paymentPlan' element={<UserPaymentPlanPage />} />
              <Route path='paymentInfo' element={<UserPaymentInfoPage />} />
              <Route path='freelancerInfo' element={<UserFreelancerInfoPage />} />
              <Route path='upworkInfo' element={<UserUpworkInfoPage />} />
              <Route path='vpsInfo' element={<UserVPSInfoPage />} />
              <Route path='pcInfo' element={<UserPCInfoPage />} />
            </Route>
            </>
          ) : (
            <>
            <Route path='admin' element={<Layout />}>
              <Route path='landing' element={<LandingPage />} />
              <Route path='dailyReport' element={<AdminDailyReportPage />} />
              <Route path='reportStatus' element={<AdminReportStatusPage />} />
              <Route path='paymentHistory' element={<AdminPaymentHistorytPage />} />
              <Route path='paymentStatus' element={<AdminPaymentStatusPage />} />
              <Route path='paymentInfo' element={<AdminPaymentInfoPage />} />
              <Route path='freelancerInfo' element={<AdminFreelancerInfoPage />} />
              <Route path='upworkInfo' element={<AdminUpworkInfoPage />} />
              <Route path='vpsInfo' element={<AdminVPSInfoPage />} />
              <Route path='pcInfo' element={<AdminPCInfoPage />} />
              <Route path='reportSetting' element={<AdminReportSettingPage />} />
              <Route path='roleSetting' element={<AdminRoleSettingPage />} />
              <Route path='passwordSetting' element={<AdminPasswordSettingPage />} />
            </Route>
            </>
          )}
        <Route path='signin' element={<SigninPage />} />
        <Route path='signup' element={<SignupPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
