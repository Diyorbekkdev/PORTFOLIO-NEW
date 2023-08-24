import { Outlet } from "react-router-dom";
import Sidebar from "../../components/side-bar/Sidebar";
import UserHeader from "../../components/header/UserHeader";

import './userLayout.scss';
const UserLayout = () => {
  return (
    <div className="user__layout">
       <div style={{display:'flex'}}>
         <Sidebar   />
        <UserHeader  />
        </div>
        <main className="user__layout__contents">
          <div className="content__container">
            <Outlet/>
          </div>
        </main>
        <footer>
           
        </footer>
    </div>
  )
}

export default UserLayout