
import './App.css'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from "./components/Footer"
import Welcome from './pages/Welcome'
import { BrowserRouter ,Routes ,Route ,useLocation } from 'react-router-dom'
import CreateAccount from './pages/CreateAccount'
import ChatBot from './components/ChatBot'
import Review from './pages/Review';
import Success from './pages/Success';
import AdminDashboard from './pages/AdminDashboard'
import Sidebar from './components/Sidebar'
import ApplicationStatus from './pages/ApplicationStatus'
import Login from './pages/Login'
import Dashboard from './pages/Dashbboard'
import ViewApplication from './pages/ViewApplication'
import LeftPanel from './components/LeftPanel'
import Profile from './pages/Profile'
import SendMoney from './components/SendMoney'
import Deposit from './components/Deposit'
import Transactions from './pages/Transactions'
import Contact from './pages/Contact'
import Settings from './pages/Settings'
import AdminLogin from './pages/AdminLogin'
import i18n from './i18n'


function Layout() {

  const location = useLocation();

    const hideHeaderPages = [
    "/",
    "/create-account",
    "/review",
    "/success",
    "/login",
    
     "/admin-login",
  "/admin-dashboard",
  "/view-application",
  "/application-status"
  ];

  const hideSidebarPages = [
    "/",
    "/create-account",
    "/review",
    "/success",
    "/login",
     "/admin-login",
  "/admin-dashboard",
  "/view-application",
  "/application-status"
  ];

  const hideLayoutPages = [
  "/",
  "/create-account",
  "/review",
  "/success",
  "/login"

];
 const showHeader = !hideHeaderPages.includes(location.pathname);
  const showSidebar = !hideSidebarPages.includes(location.pathname);

  return (
    <>
{showSidebar && <Sidebar />}
      
{showHeader && <Header />}
      <Routes>

        <Route path="/" element={<Welcome />} />
        <Route path="/create-account" element={<CreateAccount />}/>
        <Route path="/review"element={<Review />}/>
        <Route path="/success"element={<Success />}/>
        <Route path="/login"element={<Login />}/>
        <Route path="/dashboard"element={<Dashboard />}/>
        <Route path="/admin-dashboard"element={<AdminDashboard />}/>
        <Route path="/application-status"element={<ApplicationStatus />}/>
        <Route path="/view-application"element={<ViewApplication />}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/send-money' element={<SendMoney/>}/>
        <Route path='/deposit' element={<Deposit/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/settings'element={<Settings/>}/>
        <Route path="/admin-login"element={<AdminLogin/>}/>

        
        

      </Routes>
      
      <ChatBot/>

    </>
  );

}

function App() {

   useEffect(() => {

    const theme =
      localStorage.getItem("theme") || "light";

    document.body.classList.add(
      theme === "dark"
        ? "dark-theme"
        : "light-theme"
    );


  }, []);
   return (
    <>
        <BrowserRouter>
      <Layout/>
      </BrowserRouter>
    
    </>
  )
}

export default App
