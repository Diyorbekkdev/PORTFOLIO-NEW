import { useEffect } from "react";
import useExperiencesStore from "../../../states/experience";
import "./resume.scss";
import useEducationStore from "../../../states/education";
import useUserDataStore from "../../../states/userData";
const Resume = () => {
  const experiences = useExperiencesStore((state) => state.experiences);
  const education = useEducationStore((state) => state.education);
  const fetchEducation = useEducationStore((state) => state.fetchEducation);
  const userData = useUserDataStore((state) => state.userData);
  const fetchUserData = useUserDataStore((state) => state.fetchUserData);
  const fetchExperiences = useExperiencesStore(
    (state) => state.fetchExperiences
  );

  useEffect(() => {
    fetchEducation();
    fetchExperiences();
    fetchUserData()
  }, [fetchExperiences, fetchEducation, fetchUserData]);

  return (
    <section id="resume" className="resume">
      <div className="container">
        <div className="resume__wrapper">
          <div className="top_heading">
            <span>About</span>
            <div className="line"></div>
          </div>
          <div className="main_heading">
            <h1>Check My Resume</h1>
          </div>
          <div className="resume__education">
            <div className="rsume_list">
              <h1 className="heading">Experience</h1>
              {experiences.map((res) => (
                <div className="rsume_list_item" key={res._id}>
                  <h1>Sumary</h1>
                  <div className="resume_item">
                    <h2>{res?.companyName}</h2>
                    <p id="period">
                      <span className="start">
                        {res?.startDate.split("-")[0]}{" "}
                      </span>
                      -<span className="end">{res?.endDate.split("-")[0]}</span>
                    </p>
                    <p>
                      <em>{res?.description}</em>
                    </p>
                    <ul>
                      <li>{userData?.phoneNumber}</li>
                      <li>{userData?.email}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="rsume_list">
              <h1 className="heading">Education</h1>
              <div className="rsume_list_item">
                <h1>Sumary</h1>
                {education.map((res) => (
                  <div className="resume_item" key={res._id}>
                    <h2>{res?.name}</h2>
                    <p id="period">
                      <span className="start">{res?.startDate.split("-")[0]}</span>-
                      <span className="end">{res?.endDate.split("-")[0]}</span>
                    </p>
                    <p>
                      <em>
                        {res?.description}
                      </em>
                    </p>
                    <ul>
                      <li>{res?.level}</li>
                      <li>{userData?.phoneNumber}</li>
                      <li>{userData?.email}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
