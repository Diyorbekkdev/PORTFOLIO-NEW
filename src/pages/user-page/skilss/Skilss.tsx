import { useState, useEffect, useCallback } from "react";
import { request } from "../../../request";
import { SkillsType } from "../../../types";
import { useAuth } from "../../../states/auth";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../components/confirmation/ConfirmationModal";

import skill_icon from "../../../assets/skilss.svg";
import edit from "../../../assets/edit.png";
import delete_icon from "../../../assets/delete.png";

import "./skilss.scss";
import DataLoading from "../../../components/dataLoading/Loading";
const Skilss = () => {
  const obj = {
    name: "",
    percent: 0,
  };

  const [skill, setSkill] = useState<SkillsType[]>([]);
  const [selected, setSelected] = useState("");
  const [skillData, setSkillData] = useState(obj);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const { percent, name } = skillData;

  const { userId } = useAuth();

  const getSkill = useCallback(async () => {
    try {
      setLoading(true);
      const res = await request.get(
        `skills?user=${userId}&page=${currentPage}&limit=${5}`
      );
      const { data, pagination } = res.data;
      setSkill(data);
      setTotalPages(Math.ceil(pagination.total / 5));
    } catch (err) {
      toast.error("Error while getting skills");
    } finally {
      setLoading(false);
    }
  }, [userId, currentPage]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selected) {
        await request.put(`skills/${selected}`, { percent, name });
        getSkill();
        setSkillData({
          name: "",
          percent: 0,
        });
        setSelected("");
      } else {
        const response = await request.post("skills", {
          name,
          percent,
        });
        setSkill(response.data);
        getSkill();
      }
    } catch (error) {
      toast.error("Failed to submit skills!");
    }
  };

  useEffect(() => {
    getSkill();
  }, [getSkill]);

  const editSkill = async (id: string) => {
    setSelected(id);
    setShaking(true);
    try {
      const { data } = await request(`skills/${id}`);
      const { name, percent } = data;
      setSkillData({
        name,
        percent,
      });
    } catch (err) {
      toast.error("Error while getting skills");
    }
    setShaking(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSkillData({
      ...skillData,
      [name]: value,
    });
  };

  const deleteSkill = (id: string) => {
    setDeleteItemId(id);
    setIsModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await request.delete(`skills/${deleteItemId}`);
      setSkill(skill.filter((res) => res._id !== deleteItemId));
      getSkill();
    } catch (error) {
      toast.error("Failed to delete skills!");
    } finally {
      setDeleteItemId("");
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setDeleteItemId("");
    setIsModalOpen(false);
  };

  return (
    <div className="skill_wrapper">
      <div
        className={
          shaking ? `skill__form__wrapper` : `skill__form__wrapper shaking`
        }
      >
        <h1>
          <img src={skill_icon} alt="" />{" "}
          {selected ? "Edit Your Skill" : "Create Skill"} <span>Skill</span>
        </h1>
        <form className="skill_form" onSubmit={handleSubmit}>
          <div className="skill_form_group">
            <label htmlFor="skillName">Skill Name:</label>
            <input
              type="text"
              id="skillName"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="Your Skill Name"
            />
          </div>
          <div className="skill_form_group">
            <label htmlFor="skillPercent">Skill Percent:</label>
            <div className="skill_percent">
              <input
                type="range"
                id="skillPercent"
                name="percent"
                value={percent}
                onChange={onChange}
                min="0"
                max="100"
                step="1"
              />
              <output>{percent}%</output>
            </div>
          </div>
          <button type="submit" className="skill_btn">
            {loading ? (
              "Loading..."
            ) : (
              <div>{selected ? "Save Changes" : "Create New Skill"}</div>
            )}
          </button>
        </form>
      </div>
      <div className="skill_list">
        <div className="list__title">
          <h1>
            <span>Skills</span> Lists
          </h1>
        </div>
        <div className="list_col">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <DataLoading /> 
            </div>
          ) : (
            skill.map((res, index) => (
              <div className="container_list" key={res._id}>
                <div className="bar " data-skill="HTML">
                  <div
                    className="learning"
                    style={{ width: `${res.percent}%` }}
                  >
                    {res.name}
                  </div>
                </div>
                <div className="skill_list_info">
                  <div className="info_percent">
                    <span>Percent:</span>
                    {res.percent}%
                  </div>
                  <div className="skill_action_btns">
                    <button
                      className="edit_btn"
                      onClick={() => editSkill(res._id)}
                    >
                      <img src={edit} alt="" />
                    </button>
                    <button
                      className="delete_btn"
                      onClick={() => deleteSkill(res._id)}
                    >
                      <img src={delete_icon} alt="" />
                    </button>
                  </div>
                </div>
                <div className="order">{index + 1}</div>
              </div>
            ))
          )}
        </div>
        {skill.length === 0 ? (
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
      <ConfirmationModal
        deleteTitle="Confirmation Deletation"
        deleteMessage="Are you sure you want to delete this skill data?"
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Skilss;
