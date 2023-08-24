import { Link } from "react-router-dom";
import bell from "../../../public/bell.png";
import avatar from "../../assets/avatar-svgrepo-com.svg";
import search from "../../assets/search-icon.png";
import user_img from "../../assets/userdropdown/user.svg";
import setting from "../../assets/userdropdown/setting.svg";
import faq from "../../assets/userdropdown/faq.svg";
import logoutt from "../../assets/userdropdown/logout.svg";

import { useAuth } from "../../states/auth";
import { useState } from "react";

import "./Header.scss";
const UserHeader = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const controlDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  
  return (
    <header className="header">
      <div className="admin__container">
        <div className="main__search">
          <input type="text" placeholder="Searching ...." />
          <img className="search_icon" src={search} alt="icon" />
        </div>
        <div className="message_notify">
          <Link to={"/"}>
            <img className="m-notify" src={bell} alt="icon" />
          </Link>
          <span className="bell">0</span>
        </div>
        <div className="account">
          <div onClick={controlDropdown}>
            <img className="account__img" src={avatar} alt="icon" />
          </div>
          <div
            className={openDropdown ? "user_dropdown open" : "user_dropdown"}
          >
            <div className="user_img">
              <img
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--aXuLP7Pm--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1088365/0391b544-a37e-46be-9387-908c44762301.jpeg"
                alt="icon"
              />
              <div className="user_name">
                <span className="name">Diyorbek</span>
                <span>Juraev</span>
              </div>
            </div>
            <div className="line"></div>
            <ul>
              <li>
                <Link to={"/account"} >
                  <img src={user_img} alt="" />
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/settings"}>
                  <img src={setting} alt="" />
                  Settings
                </Link>
              </li>
              <li>
                <Link to={""}>
                  <img src={faq} alt="" />
                  FAQ
                </Link>
              </li>
            </ul>
            <div className="line"></div>
            <div className="logout">
              <button onClick={handleLogout}>
                <img src={logoutt} alt="" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
