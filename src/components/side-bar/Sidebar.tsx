import './Sidebar.scss';
import {useEffect,useState} from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.jpg';
import icon1 from '../../assets/experience.svg';
import icon5 from '../../assets/skils-icon.svg';
import icon3 from '../../assets/education.svg';
import icon2 from '../../assets/skilss.svg';
import icon4 from '../../assets/messages.svg';
import icon6 from '../../assets/settings.svg';
import icon7 from '../../assets/logout.svg';
import { request } from '../../request';


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    { path: '/experience', label: 'Experiences', icon: icon1 },
    { path: '/skilss', label: 'Skills', icon: icon5 },
    { path: '/education', label: 'Education', icon: icon3 },
    { path: '/portfolios', label: 'Portfolios', icon: icon2 },
    { path: '/messages', label: 'Messages', icon: icon4 },
  ];

  const preferenceLinks = [
    { path: '/settings', label: 'Settings', icon: icon6 },
    { path: '/logout', label: 'Log Out', icon: icon7 },
  ];

  return (
    <div className='sidebar'>
      <div className='sidebar__logo'>
        <div className="logo_wrapper">
          <img src={logo} alt='logo' />
          <h1>Portfolio</h1>
        </div>
        <p className='user_id'>User: <span>{userData.firstName}</span></p>
      </div>
      <ul className='sidebar_links'>
        {navigationLinks.map((link) => (
          <li
            key={link.path}
            className={location.pathname === link.path ? 'active' : ''}
            onClick={() => navigate(link.path)}
          >
            <img src={link.icon} alt="" />
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <ul className='sidebar_links'>
        <span className='devide_part'>Preference</span>
        {preferenceLinks.map((link) => (
          <li
            key={link.path}
            className={location.pathname === link.path ? 'active' : ''}
            onClick={() => navigate(link.path)}
          >
            <img src={link.icon} alt="" />
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
