import { useCallback, useEffect, useState } from "react";
import { educationLevels } from "../../../data/eduLevels";
import { request } from "../../../request";
import { useAuth } from "../../../states/auth";
import {toast} from 'react-toastify'

import EduCard, { EduCardProps } from "../../../components/educard/EduCard";
import eduIcon from "../../../assets/education.svg";
import adding from "../../../assets/teacher-explaining-using-gestures.png";
import tick from "../../../assets/education-location.png";
import ConfirmationModal from "../../../components/confirmation/ConfirmationModal";

import "./education.scss";
import DataLoading from "../../../components/dataLoading/Loading";
const Education = () => {
  const obj = {
    name: "",
    level: "",
    description: "",
    startDate: "",
    endDate: "",
  };
  const [educations, setEducations] = useState(obj);
  const [euducationData, setEducationData] = useState<EduCardProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selected, setSelected] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {userId} = useAuth();
  const { name, level, description, startDate, endDate } = educations;
  
  const getEducation = useCallback(async () => {
    try {
      setLoading(true);
      const res = await request.get(
        `education?page=${currentPage}&limit=5&user=${userId}`
      );
      const { data, pagination } = res.data;
      setEducationData(data);
      setTotalPages(Math.ceil(pagination.total / 5));
    } catch (err) {
      toast.error('Error getting education');
    } finally {
      setLoading(false);
    }
  }, [currentPage, userId]);

  useEffect(() => {
    getEducation();
  }, [getEducation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selected) {
        await request.put(`education/${selected}`, {
          name,
          level,
          description,
          startDate,
          endDate,
        });
        setEducations({
          name: "",
          level: "",
          description: "",
          startDate: "",
          endDate: "",
        });
        setSelected("");
        getEducation();
      } else {
        await request.post("education", {
          name,
          level,
          description,
          startDate,
          endDate,
        });
        setEducations({
          name: "",
          level: "",
          description: "",
          startDate: "",
          endDate: "",
        });
        getEducation();
      }
    } catch (error) {
      toast.error("Error creating skill:");
    }
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedLevel(value); 
    setEducations({
      ...educations,
      level: value, 
    });
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const deleteEducation = (id: string) => {
    setDeleteItemId(id);
    setIsModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await request.delete(`education/${deleteItemId}`);
      setEducationData(
        euducationData.filter((res) => res._id !== deleteItemId)
      );
      getEducation();
    } catch (error) {
      toast.error("Error deleting skill");
    } finally {
      setDeleteItemId("");
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setDeleteItemId("");
    setIsModalOpen(false);
  };

  const editEducation = async (id: string) => {
    setSelected(id);
    try {
      const { data } = await request(`education/${id}`);
      const { name, level, description, startDate, endDate } = data;
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);
      const formattedStartDate = parsedStartDate.toISOString().split("T")[0];
      const formattedEndDate = parsedEndDate.toISOString().split("T")[0];
      setEducations({
        name,
        level,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      const scroll = document.querySelector(".user__layout__contents");
      if (scroll instanceof HTMLElement) {
        scroll.scrollTop = 0;
      }
    } catch (err) {
      toast.error('Error updating')
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEducations({
      ...educations,
      [name]: value,
    });
  };

  return (
    <section className="education">
      <div className="education_main">
        <div className="form__container">
          <h1 className="edu_form_title">
            <img src={eduIcon} alt="" />
            {selected ? "Edit" : "Add"} Your <span>Education</span>
          </h1>
          <form className="education__from" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="name">Education Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Education Name"
                onChange={onChange}
              />
            </div>
            <div className="form__group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                name="startDate"
                placeholder="01/12/2001"
                value={startDate}
                onChange={onChange}
              />
            </div>
            <div className="form__group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                name="endDate"
                value={endDate}
                placeholder="01/12/2001"
                onChange={onChange}
              />
            </div>
            <div className="form__group">
              <label htmlFor="level">Education Level</label>
              <input
                type="text"
                name="level"
                id="level"
                placeholder="Education Level"
                list="levelOptions"
                value={selectedLevel}
                onChange={handleLevelChange}
              />
            </div>
            <div className="form__group">
              <label htmlFor="description">Description</label>
              <input
                className="desc"
                name="description"
                id="description"
                placeholder="Text here ..."
                value={description}
                onChange={onChange}
              ></input>
            </div>
            <datalist id="levelOptions">
              {educationLevels.map((level, index) => (
                <option key={index} value={level} />
              ))}
            </datalist>
            <div className="form__group">
              <button className="submit_exp_btn add_edu" type="submit">
                {selected ? "Save Changes" : "Add Education"}
              </button>
            </div>
          </form>
        </div>
        <div className="edu_confirm_img">
          <img src={selected ? tick : adding} alt="" />
        </div>
      </div>
      <div className={`${loading ? "" : "edu_cards"}`}>
        {loading ? (
          <div className="edu_loading" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <DataLoading />
          </div>
        ) : (
          euducationData.map((res) => (
            <EduCard
              _id={res._id}
              key={res._id}
              name={res.name}
              level={res.level}
              description={res.description}
              startDate={res.startDate.split("T")[0]}
              endDate={res.endDate.split("T")[0]}
              onDlete={() => deleteEducation(res._id)}
              onEdit={() => editEducation(res._id)}
            />
          ))
        )}

        <div className="pagination_container">
          {euducationData.length === 0 ? (
            ""
          ) : (
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        deleteTitle="Confirmation Deletation"
        deleteMessage="Are you sure you want to delete this education data?"
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </section>
  );
};

export default Education;
