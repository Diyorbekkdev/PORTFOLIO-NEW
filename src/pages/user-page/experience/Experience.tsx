import React, { useState, useEffect, useCallback } from "react";
import { request } from "../../../request";
import { USERID } from "../../../constants";
import Cookies from "js-cookie";
import exp_gif from "../../../assets/experience-gif.gif";
import exp_icon from "../../../assets/experience.svg";
import edit_icon from "../../../assets/edit.png";
import delete_icon from "../../../assets/delete.png";
import { AccordionSectionProps } from "../../../types";

import '../../../components/accordion/accordion.scss'
import "./experience.scss";

const Experience = () => {
  const obj = {
    workName: "",
    companyName: "",
    description: "",
    startDate: "",
    endDate: "",
  };
  const [experienceData, setExperienceData] = useState(obj);
  const [experience, setExperience] = useState<AccordionSectionProps[]>([]);
  const [selected, setSelected] = useState("");
  const userId = Cookies.get(USERID);
  const { workName, companyName, description, startDate, endDate } =
    experienceData;
  const getData = useCallback(async () => {
    try {
      const { data } = await request.get(`experiences?user=${userId}`);
      setExperience(data.data);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selected) {
        const { data } = await request.put(
          `experiences/${selected}`,
          experienceData
        );
        setExperience(data.data);
        setSelected("");
        setExperienceData({
          workName: "",
          companyName: "",
          description: "",
          startDate: "",
          endDate: "",
        });
      } else {
        await request.post("experiences", experienceData);
        console.log("success");
        setExperienceData({
          workName: "",
          companyName: "",
          description: "",
          startDate: "",
          endDate: "",
        });
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      getData();
    }
  };

  const handleUpdate = async (experienceId: string) => {
    setSelected(experienceId);
    try {
      const { data } = await request.get(`experiences/${experienceId}`);
      console.log("Updated successfully");
      const { description, workName, companyName, startDate, endDate } = data;
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);
      const formattedStartDate = parsedStartDate.toISOString().split("T")[0];
      const formattedEndDate = parsedEndDate.toISOString().split("T")[0];
      setExperienceData({
        description,
        workName,
        companyName,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (experienceId: string) => {
    try {
      await request.delete(`experiences/${experienceId}`);
      console.log("Deleted successfully");
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setExperienceData({
      ...experienceData,
      [name]: value,
    });
  };

  return (
    <div className="experience_main">
      <div className="form__container">
        <h1 className="exp_form_title">
          <img src={exp_icon} alt="" />
          Add Your <span>Experience</span>
        </h1>
        <form className="experience__from" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="workName">Your Position</label>
            <input
              type="text"
              name="workName"
              id="workName"
              value={workName}
              onChange={onChange}
              placeholder="Your Position"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="companyName">Company</label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={companyName}
              onChange={onChange}
              placeholder="Company name"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Text here ..."
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              placeholder="01/12/2001"
              onChange={onChange}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={onChange}
              placeholder="01/12/2001"
              required
            />
          </div>
          <div className="form__group">
            <button className="submit_exp_btn" type="submit">
              Add Experience
            </button>
          </div>
        </form>
      </div>
      <div className="experience__list">
        <img className="exp_gif" src={exp_gif} alt="exp_list" />
        <div className="exp_title">
          <h1 className="title">Experience Lists</h1>
        </div>
        <div className="overly"></div>
        <div className="exp_list">
          {experience?.map((res) => (
            <details className="accordion" key={res._id}>
              <summary className="accordion-header">
                <div className="accordion-header-content">
                  <div className="exp_info">
                    <span className="accordion-header-content-label">
                      {" "}
                      <span className="contents_name">Company:</span>{" "}
                      
                    </span>
                    <h2 className="accordion-header-content-title">
                      {" "}
                      <span className="contents_name">Position:</span>{" "}
                      
                    </h2>
                  </div>
                  <div className="exp_info">
                    <span className="accordion-header-content-label">
                      {" "}
                      <span className="contents_name">Start Date:</span>{" "}
                      {startDate}
                    </span>
                    <span className="accordion-header-content-title">
                      {" "}
                      <span className="contents_name">End Date:</span> {endDate}
                    </span>
                  </div>
                  <div className="exp_info btn">
                    <button onClick={()=>handleUpdate(res._id)} className="">
                      <img src={edit_icon} alt="" />
                    </button>
                    <button onClick={()=> handleDelete(res._id)}>
                      <img src={delete_icon} alt="" />
                    </button>
                  </div>
                </div>
              </summary>
              <div className="accordion-content">
                <p className="accordion-content-text">
                  <span className="contents_name">Your Description:</span>{" "}
                  {description}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
