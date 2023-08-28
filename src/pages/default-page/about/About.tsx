import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../request";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMG_URL } from "../../../constants";
import { allMessages } from "../../../types";
import { useAuth } from "../../../states/auth";

import useSkillsStore from "../../../states/skillData";
import DataLoading from "../../../components/dataLoading/Loading";

import "./about.scss";
const About = () => {
  const { skills, fetchSkills } = useSkillsStore();
  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState<allMessages[]>([]);
  const { userId } = useAuth();

  
  const [userData, setUserData] = useState({
    birthday: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    info: "",
    photo: "",
    telegram: "",
    level: "",
  });

  const getData = async () => {
    try {
      const res = await request.get(`auth/me`);
      setUserData(res.data);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const getAllMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await request(`messages?whom=${userId}`);
      setAllMessages(res.data.data);
    } catch (err) {
      toast.error("Error while getting messages. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getData();
    fetchSkills();
    getAllMessages();
  }, [fetchSkills, getAllMessages]);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const dob = new Date(birthDate);

    const yearsDiff = today.getFullYear() - dob.getFullYear();

    let age = "";

    if (yearsDiff > 0) {
      age += `${yearsDiff} year${yearsDiff > 1 ? "s" : ""}`;
    }

    return age.trim();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },

    ],
  };
  return (
    <section id="about" className="about">
      <div className="about">
        <div className="container">
          <div className="about__wrapper">
            <div className="top_heading">
              <span>About</span>
              <div className="line"></div>
            </div>
            <div className="main_heading">
              <h1>Learn more about me</h1>
            </div>
            <div className="about__me">
              <div className="about_img_container">
                <img src={`${IMG_URL + userData.photo}`} alt="" />
              </div>
              <div className="about__personal__data">
                <h1>Front-end Developer</h1>
                <p>Here you can find more information about me!</p>
                <div className="data_list">
                  <ul>
                    <li>
                      <span>Birthday:</span>
                      {userData?.birthday?.split("T")[0]}
                    </li>
                    <li>
                      <span>Telegram Blog:</span>{userData.telegram}
                    </li>
                    <li>
                      <span>Phone:</span>
                      {userData?.phoneNumber}
                    </li>
                    <li>
                      <span>Address:</span>
                      {userData?.address}
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>Age:</span>
                      {userData?.birthday && calculateAge(userData?.birthday)}
                    </li>
                    <li>
                      <span>Degree:</span>Junior
                    </li>
                    <li>
                      <span>Email:</span>
                      {userData?.email}
                    </li>
                    <li>
                      <span>Freelance:</span>New York, USA
                    </li>
                  </ul>
                </div>
                <div className="info__additional">
                  <p>{userData?.info}</p>
                </div>
              </div>
            </div>
            <div className="about__skills">
              <div className="top_heading">
                <span>Skilss</span>
                <div className="line"></div>
              </div>
              <div className="progress_skilss">
                {skills?.map((res) => (
                  <div className="skill_progress" key={res?._id}>
                    <span className="skill">
                      {res?.name}
                      <i>{res?.percent}%</i>
                    </span>
                    <div className="progres_bar_wrap">
                      <div
                        className="progres_bar"
                        style={{ width: `${res?.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="testimonials">
              <div className="top_heading points">
                <span>Testimonials</span>
                <div className="line"></div>
              </div>
              <div className="slider__wrapper">
                {loading
                  ? (<div className="loading_container">
                    <DataLoading/>
                  </div>)
                  : 
                  (
                    <Slider {...settings}>
                      {allMessages.map((res) => (
                        <div className="cookie-card" key={res._id}>
                          <span className="title">
                            {res.user.split(",")[0] + " " + res.user.split(",")[1]}
                          </span>
                          <p className="description">{res.message}</p>
                          <div className="actions"></div>
                        </div>
                      ))}
                    </Slider>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
