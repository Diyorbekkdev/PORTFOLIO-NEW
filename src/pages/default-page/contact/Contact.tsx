import { useState } from "react";
import { USERID } from "../../../constants";
import { request } from "../../../request";
import { useEffect } from "react";

import location from "../../../assets/default-page-icons/location.png";
import messageIcon from "../../../assets/default-page-icons/message.png";
import call from "../../../assets/default-page-icons/call.png";
import social from "../../../assets/default-page-icons/social.png";
import Cookies from "js-cookie";

import tg from "../../../assets/default-page-icons/icons8-telegram-48.png";
import insta from "../../../assets/default-page-icons/icons8-instagram-24.png";
import github_icon from "../../../assets/default-page-icons/icons8-github-30.png";
import youtube_icon from "../../../assets/default-page-icons/icons8-youtube-30.png";

import "./contact.scss";
const Contact = () => {
  const obj = {
    title: "",
    message: "",
    user: "",
  };
  const userId = Cookies.get(USERID);
  const [post, setPost] = useState(obj);
  const { title, message, user } = post;

  const [userData, setUserData] = useState({
    phoneNumber: "",
    address: "",
    email: "",
    github: "",
    youtube: "",
    instagram: "",
    telegram: "",
  });

  const { phoneNumber, address, email, github, youtube, instagram, telegram } =
    userData;

  const getData = async () => {
    try {
      const res = await request.get(`auth/me`);
      setUserData(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await request.post(`messages?whom[in]=${userId}`, {
        title,
        message,
        user,
        whom: userId,
      });
      setPost({
        title: "",
        message: "",
        user: "",
      });
    } catch (error) {
      console.error("Error creating skill:", error);
    } finally {
      setPost({
        title: "",
        message: "",
        user: "",
      });
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact_container">
          <div className="top_heading">
            <span>Contact</span>
            <div className="line"></div>
          </div>
          <div className="main_heading">
            <h1>Contact Me</h1>
          </div>
          <div className="contact_items">
            <div className="contact_details">
              <div className="img_container">
                <img src={location} alt="" />
              </div>
              <p className="info">
                <span className="name">My Address</span>
                <span>{address}</span>
              </p>
            </div>
            <div className="contact_details">
              <div className="img_container">
                <img src={social} alt="" />
              </div>
              <p className="info">
                <span className="name">Social Profiles</span>
                <span className="tags">
                  <li>
                    <a href={telegram}>
                      <img src={tg} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={instagram}>
                      <img src={insta} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={youtube}>
                      <img src={youtube_icon} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={github}>
                      <img src={github_icon} alt="" />
                    </a>
                  </li>
                </span>
              </p>
            </div>
            <div className="contact_details">
              <div className="img_container">
                <img src={messageIcon} alt="" />
              </div>
              <p className="info">
                <span className="name">Email Me</span>
                <span>{email}</span>
              </p>
            </div>
            <div className="contact_details">
              <div className="img_container">
                <img src={call} alt="" />
              </div>
              <p className="info">
                <span className="name">Call Me</span>
                <span>{phoneNumber}</span>
              </p>
            </div>
          </div>
          <form className="contact__message" onSubmit={handleSubmit}>
            <div className="contact_form">
              <div className="form__group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  placeholder="What is your purpose"
                />
              </div>
              <div className="form__group">
                <label htmlFor="title">Email or Phone</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={user}
                  onChange={onChange}
                  placeholder="Enter your email address or phone number"
                />
              </div>
              <div className="form__group">
                <label htmlFor="title">Title</label>
                <input
                  className="message"
                  id="message"
                  name="message"
                  value={message}
                  placeholder="Write your message here"
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div className="submit__btn">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
