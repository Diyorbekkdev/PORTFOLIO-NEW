import "./Sidebar.scss";
import { useEffect, useState, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { request } from "../../request";
import ConfirmationModal from "../confirmation/ConfirmationModal";
import { useAuth } from "../../states/auth";
import { toast } from "react-toastify";

import logo from "../../../public/logo.jpg";
import icon1 from "../../assets/experience.svg";
import icon5 from "../../assets/skils-icon.svg";
import icon3 from "../../assets/education.svg";
import icon2 from "../../assets/skilss.svg";
import icon4 from "../../assets/messages.svg";
import icon6 from "../../assets/settings.svg";
import icon7 from "../../assets/logout.svg";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();
  const [userData, setUserData] = useState({
    birthday: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    info: "",
    _id: "",
  });

  const getData = async () => {
    try {
      const res = await request.get(`auth/me`);
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const navigationLinks = [
    { path: "/experience", label: "Experiences", icon: icon1 },
    { path: "/skilss", label: "Skills", icon: icon5 },
    { path: "/education", label: "Education", icon: icon3 },
    { path: "/portfolios", label: "Portfolios", icon: icon2 },
    { path: "/messages", label: "Messages", icon: icon4 },
  ];

  
  const handleLogout = () => {
    try {
      setIsModalOpen(true);
    } catch (err) {
      toast.error("Could not log out");
    }
  };
  const handleConfirmLogout = () => {
    try {
      setIsModalOpen(false);
      logout();
      navigate("/login"); 
    } catch (err) {
      toast.error("Could not log out");
    }finally{
      setIsModalOpen(false)
      
    }
  };
  const cancelDelete = () => {
    setIsModalOpen(false);
  };
  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebar__logo">
          <div className="logo_wrapper">
            <img src={logo} alt="logo" />
            <h1>Portfolio</h1>
          </div>
          <p className="user_id">
            User: <span>{userData.firstName}</span>
          </p>
        </div>
        <ul className="sidebar_links">
          {navigationLinks.map((link) => (
            <li
              key={link.path}
              className={location.pathname === link.path ? "active" : ""}
              onClick={() => navigate(link.path)}
            >
              <img src={link.icon} alt="" />
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <ul className="sidebar_links">
          <span className="devide_part">Preference</span>
          <li
            className={location.pathname === "/settings" ? "active" : ""}
            onClick={() => navigate("/settings")}
          >
            <img src={icon6} alt="" />
            <Link to={"/setting"}>Settings</Link>
          </li>
          <li>
            <img src={icon7} alt="" />
            <div className="logOut" onClick={handleLogout}>Logout</div>
          </li>
        </ul>
      </div>
        <ConfirmationModal
          deleteTitle="Confirmation Deletation"
          deleteMessage="Are you sure Log Out?"
          isOpen={isModalOpen}
          onCancel={cancelDelete}
          onConfirm={handleConfirmLogout}
        />
    </Fragment>
  );
};

export default Sidebar;
