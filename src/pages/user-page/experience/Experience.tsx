import React, { useState, useEffect, useCallback } from "react";
import { request } from "../../../request";
import { useAuth } from "../../../states/auth";
import { toast } from "react-toastify";
import { AccordionSectionProps } from "../../../types";
import ConfirmationModal from "../../../components/confirmation/ConfirmationModal";

import exp_icon from "../../../assets/experience.svg";
import edit_icon from "../../../assets/edit.png";
import delete_icon from "../../../assets/delete.png";

import "../../../components/accordion/accordion.scss";
import "./experience.scss";
import DataLoading from "../../../components/dataLoading/Loading";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const { workName, companyName, description, startDate, endDate } =
    experienceData;
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request.get(`experiences?user=${userId}`);

      setExperience(data.data);
    } catch (err) {
      toast.error("Error getting experience!");
    } finally {
      setLoading(false);
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
        toast.success("Experiences Edited successfully");
      } else {
        await request.post("experiences", experienceData);
        toast.success("Data added successfully");
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
      toast.error("error");
    } finally {
      getData();
    }
  };

  const handleUpdate = async (experienceId: string) => {
    setSelected(experienceId);
    try {
      const { data } = await request.get(`experiences/${experienceId}`);
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
      toast.error("Error updating");
    } finally {
      toast.success("Success update completed");
    }
  };

  const deleteExperience = (id: string) => {
    setDeleteItemId(id);
    setIsModalOpen(true);
  };
  const handleDelete = async () => {
    try {
      await request.delete(`experiences/${deleteItemId}`);
      toast.success("Deleted successfully");
      getData();
    } catch (err) {
      toast.error("Data deleted successfully!");
    } finally {
      setDeleteItemId("");
      setIsModalOpen(false);
    }
  };
  const cancelDelete = () => {
    setDeleteItemId("");
    setIsModalOpen(false);
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
              className="textarea"
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
        <div className="exp_title">
          <h1 className="title">Experience Lists</h1>
        </div>
        <div className="overl"></div>
        <div className={`${loading ? '' :'exp_list'}`} style={loading? {marginTop: '200px'}: {margin: '0'}}>
          {loading ? (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px'}}>
              <DataLoading />
            </div>
          ) : (
            experience?.map((res) => (
              <details className="accordion" key={res._id}>
                <summary className="accordion-header">
                  <div className="accordion-header-content">
                    <div className="exp_info">
                      <span className="accordion-header-content-label">
                        <span className="contents_name">Company:</span>
                        {res.companyName}
                      </span>
                      <h2 className="accordion-header-content-title">
                        <span className="contents_name">Position:</span>
                        {res.workName}
                      </h2>
                    </div>
                    <div className="exp_info">
                      <span className="accordion-header-content-label">
                        <span className="contents_name">Start Date:</span>
                        {res.startDate.split("T")[0]}
                      </span>
                      <span className="accordion-header-content-title">
                        <span className="contents_name">End Date:</span>{" "}
                        {res.endDate.split("T")[0]}
                      </span>
                    </div>
                    <div className="exp_info btn">
                      <button
                        onClick={() => handleUpdate(res._id)}
                        className=""
                      >
                        <img src={edit_icon} alt="" />
                      </button>
                      <button onClick={() => deleteExperience(res._id)}>
                        <img src={delete_icon} alt="" />
                      </button>
                    </div>
                  </div>
                </summary>
                <div className="accordion-content">
                  <p className="accordion-content-text">
                    <span className="contents_name">Your Description:</span>
                    {res.description}
                  </p>
                </div>
              </details>
            ))
          )}
        </div>
      </div>
      <ConfirmationModal
        deleteTitle="Confirmation Deletation"
        deleteMessage="Are you sure you want to delete this experience data?"
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Experience;
