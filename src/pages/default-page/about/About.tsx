import { useCallback, useEffect, useState } from "react";
import useSkillsStore from "../../../states/skillData";
import "./about.scss";
import { request } from "../../../request";

const About = () => {
  const [userData, setUserData] = useState({
    birthday: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    info: "",
  });
  const skills = useSkillsStore((state) => state.skills);
  const fetchSkills = useSkillsStore((state) => state.fetchSkills);

  const getData = useCallback(async () => {
    try {
      const res = await request.get(`auth/me`);
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

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
                <img
                  src="https://res.cloudinary.com/practicaldev/image/fetch/s--aXuLP7Pm--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1088365/0391b544-a37e-46be-9387-908c44762301.jpeg"
                  alt=""
                />
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
                      <span>Telegram Blog:</span>www.example.com
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
                      <span>Degree:</span>www.example.com
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
              <div className="slider__wrapper"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
