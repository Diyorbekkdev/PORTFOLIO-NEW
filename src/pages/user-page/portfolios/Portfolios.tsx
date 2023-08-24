import { useCallback, useState, useEffect } from "react";
import { request } from "../../../request";
import { IMG_URL, USERID } from "../../../constants";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import edit from "../../../assets/edit.png";
import delete_icon from "../../../assets/delete.png";
import portfolio from "../../../assets/skilss.svg";
import "./portfolios.scss";
import LoadingContents from "../../../components/loading/LoadingContents";

import { portfolioTypes } from "../../../types";
import ConfirmationModal from "../../../components/confirmation/ConfirmationModal";
const Portfolios = () => {
  const obj = {
    name: "",
    url: "",
    description: "",
    photo: { _id: "", name: "" },
  };
  const [portfolios, setPortfolios] = useState(obj);
  const [portfolioData, setPortfolioData] = useState<portfolioTypes[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [selectedImageId, setSelectedImageId] = useState({ _id: "", name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = Cookies.get(USERID);
  const { name, url, description, } = portfolios;

  const getPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      const res = await request.get(
        `portfolios?page=${currentPage}&limit=6&user=${userId}`
      );
      const { data, pagination } = res.data;
      setPortfolioData(data);
      
      setTotalPages(Math.ceil(pagination.total / 5));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, userId]);
  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

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
        console.log("Hello world",selected);
        console.log("Slaom",portfolios);
        
        await request.put(`portfolios/${selected}`, {
          ...portfolios,
          photo: selectedImageId
        });
        setPortfolios({
          name: "",
          url: "",
          description: "",
          photo: { _id: "", name: "" },
        });
        setSelected("");
        getPortfolios()
      } else {
        await request.post("portfolios", {
          ...portfolios,
          photo: selectedImageId,
        });
        setPortfolios({
          name: "",
          url: "",
          description: "",
          photo: { _id: "", name: "" },
        });
        setImagePreviewUrl("");
        getPortfolios();
      }
    } catch (error) {
      console.error("Error creating skill:", error);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleImageUpload(droppedFile);
    }
  };
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleImageUpload(selectedFile);
    }
  };
  const handleImageUpload = async (uploadedFile: File) => {
    try {
      const form = new FormData();
      form.append("file", uploadedFile);
      const res = await request.post("upload", form);
      const imageUrl = `${IMG_URL}${res?.data?._id}.${
        res?.data?.name.split(".")[1]
      }`;

      setImagePreviewUrl(imageUrl);
      setPortfolios((prevPortfolios) => ({
        ...prevPortfolios,
        photo: {
          _id: res?.data?._id,
          name: res?.data?.name,
        },
      }));
      setSelectedImageId(res?.data?._id);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPortfolios({
      ...portfolios,
      [name]: value,
    });
  };

  //edit and delete actions

  const editPortfolio = async (id: string) => {
    setSelected(id);
    
    try {
      const { data } = await request(`portfolios/${id}`);
      const { name, url, description, photo } = data;
      
      setPortfolios({
        name,
        url,
        description,
        photo: {
          _id: photo._id,
          name: photo.name,
        },
      });
      const imageUrl = `${IMG_URL}${photo}.jpg` || `${IMG_URL}${photo}.png`;

      setImagePreviewUrl(imageUrl);
      const scroll = document.querySelector(".user__layout__contents");
      if (scroll instanceof HTMLElement) {
        scroll.scrollTop = 0;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletePortfolio = (id: string) => {
    setDeleteItemId(id);
    setIsModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await request.delete(`portfolios/${deleteItemId}`);
      setPortfolioData(portfolioData.filter((res) => res._id !== deleteItemId));
      getPortfolios();
    } catch (error) {
      console.error("Error deleting skill:", error);
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
    <section>
      <div className="portfolios">
        <div className="education_main">
          <div className="form__container">
            <h1 className="edu_form_title">
              <img src={portfolio} alt="" />
              {selected ? "Edit" : "Add"} Your <span>Portfolio</span>
            </h1>
            <form className="education__from" onSubmit={handleSubmit}>
              <div className="form__group">
                <label htmlFor="name">Portfolio Title</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Portfolio title"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="name">Portfolio url</label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Education Name"
                  value={url}
                  onChange={onChange}
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
              <div className="form__group">
                <div
                  className={`drop-zone ${imagePreviewUrl ? "has-image" : ""}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e)}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  {imagePreviewUrl ? (
                    <img src={imagePreviewUrl} alt="Preview" />
                  ) : (
                    <p>Drag & Drop or Click to Upload</p>
                  )}
                </div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageSelect}
                />
              </div>
              <div className="form__group">
                <button className="submit_exp_btn add_edu" type="submit">
              {selected ? "Edit Portfolio": 'Add Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={`${loading ? "" : "portfolio_wrapper"}`}>
        <h2 className="title">My Projects</h2>
        {loading ? (
          <div className="loading_container">
            <LoadingContents />
          </div>
        ) : (
          portfolioData.map((res) => (
            <div key={res._id} className="card">
              <div className="content">
                <span className="title">{res.name}</span>
                <span className="category">{res.description}</span>
                <div className="portfolio_btns">
                  <button onClick={() => editPortfolio(res._id)}>
                    <img src={edit} alt="icon" />
                  </button>
                  <button onClick={() => deletePortfolio(res._id)}>
                    <img src={delete_icon} alt="icon" />
                  </button>
                </div>
              </div>
              <div className="image">
                <Link to={res.url}>
                  <img
                    src={
                      IMG_URL +
                      res.photo._id +
                      "." +
                      res.photo.name.split(".")[1]
                    }
                    alt=""
                  />
                </Link>
              </div>
            </div>
          ))
        )}
        <div className="pagination_container">
          {portfolioData.length === 0 ? (
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
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </section>
  );
};

export default Portfolios;
