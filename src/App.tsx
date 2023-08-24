import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout/UserLayout";
import Experience from "./pages/user-page/experience/Experience";
import Skilss from "./pages/user-page/skilss/Skilss";
import Education from "./pages/user-page/education/Education";
import Portfolios from "./pages/user-page/portfolios/Portfolios";
import Message from "./pages/user-page/messages/Message";
import Settings from "./pages/user-page/settings/Settings";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Account from "./pages/user-page/account/Account";
import DefaultLayout from "./layouts/defaultLayout/DefaultLayout";
import About from "./pages/default-page/about/About";
import Resume from "./pages/default-page/resume/Resume";
import Portfolio from "./pages/default-page/portfolio/Portfolio";
import Contact from "./pages/default-page/contact/Contact";
import NotFound from "./pages/user-page/NotFound";
import { useAuth } from "./states/auth";

function App() {
  const {isAuthenticated} = useAuth();
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={isAuthenticated ? <Navigate to="/experience"/>:<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAuthenticated?<Route path="/" element={<UserLayout />} >
          <Route path="experience" element={<Experience />} />
          <Route path="skilss" element={<Skilss />} />
          <Route path="education" element={<Education />} />
          <Route path="portfolios" element={<Portfolios />} />
          <Route path="messages" element={<Message />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
        </Route>:null}
        <Route path="/" element={<DefaultLayout />}>
          <Route path="about" element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
