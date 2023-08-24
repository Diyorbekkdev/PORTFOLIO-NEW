import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import useUserDataStore from "../../states/userData";
import mobile_menu from "../../assets/default-page-icons/mobilemenue.png";
import close_icon from "../../assets/default-page-icons/close.png";
import tg from "../../assets/default-page-icons/icons8-telegram-48.png";
import insta from "../../assets/default-page-icons/icons8-instagram-24.png";
import github from "../../assets/default-page-icons/icons8-github-30.png";
import youtube from "../../assets/default-page-icons/icons8-youtube-30.png";

const DefaultHeader = () => {
  const [top, setTop] = useState(false);
  const [menuControl, setMenuControl] = useState(false);
  const toggleNavbar = () => setTop(!top);
  const userData = useUserDataStore((state) => state.userData);
  const fetchUserData = useUserDataStore((state) => state.fetchUserData);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const toggleMenu = () => setMenuControl(!menuControl);

  return (
    <Fragment>
      <header id="header" className={`${top ? "header-top" : null}`}>
        <div className="container">
          <div className="nav__wrapper">
            <h1 className="hero_name" onClick={toggleNavbar}>
              <Link to={"/"}>
                {userData?.firstName + " " + userData?.lastName}
              </Link>
            </h1>
            <h2>I'm a passionate from New York</h2>
            <nav id="navbar" className="navbar">
              {top ? (
                <>
                  <ul>
                    <li onClick={toggleNavbar}>
                      <NavLink to={"/"}>Home</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/about"}>About</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/resume"}>Resume</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/portfolio"}>Portfolio</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/contact"}>Contact</NavLink>
                    </li>
                  </ul>
                </>
              ) : (
                <ul>
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li onClick={toggleNavbar}>
                    <NavLink to={"/about"}>About</NavLink>
                  </li>
                  <li onClick={toggleNavbar}>
                    <NavLink to={"/resume"}>Resume</NavLink>
                  </li>
                  <li onClick={toggleNavbar}>
                    <NavLink to={"/portfolio"}>Portfolio</NavLink>
                  </li>
                  <li onClick={toggleNavbar}>
                    <NavLink to={"/contact"}>Contact</NavLink>
                  </li>
                </ul>
              )}
            </nav>
            <button onClick={toggleMenu} className="mobile_menu">
              <img src={mobile_menu} alt="" />
            </button>

            <div className="social_links">
              <Link to={"dsfa"}>
                {" "}
                <img src={tg} alt="" />{" "}
              </Link>
              <Link to={"dsfa"}>
                {" "}
                <img src={insta} alt="" />{" "}
              </Link>
              <Link to={"dsfa"}>
                {" "}
                <img src={github} alt="" />{" "}
              </Link>
              <Link to={"dsfa"}>
                {" "}
                <img src={youtube} alt="" />{" "}
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div
        className="mobile_menue_modal"
        style={{ display: `${menuControl ? "" : "none"}` }}
      >
        <button onClick={toggleMenu} className="close_btn">
          <img src={close_icon} alt="" />
        </button>
        <ul>
          <li onClick={toggleNavbar}>
            <NavLink onClick={toggleMenu} to={"/"}>
              Home
            </NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to={"/resume"}>Resume</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to={"/portfolio"}>Portfolio</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default DefaultHeader;