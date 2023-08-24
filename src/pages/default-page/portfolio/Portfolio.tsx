import { useCallback, useEffect, useState } from "react";
import { IMG_URL, USERID } from "../../../constants";
import Cookies from "js-cookie";
import "./portfolio.scss";
import { portfolioTypes } from "../../../types";
import { request } from "../../../request";
const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState<portfolioTypes[]>([]);
  const userId = Cookies.get(USERID);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getPortfolios = useCallback(async () => {
    try {
      const res = await request.get(
        `portfolios?page=${currentPage}&limit=6&user=${userId}`
      );
      const { data, pagination } = res.data;
      setPortfolioData(data);

      setTotalPages(Math.ceil(pagination.total / 5));
    } catch (err) {
      console.log(err);
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

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio__wrapper">
          <div className="top_heading">
            <span>Portfolio</span>
            <div className="line"></div>
          </div>
          <div className="main_heading">
            <h1>My Works</h1>
          </div>
          <div className="box-wrapper">
            {portfolioData.map((res, index) => (
              <figure className="shape-box shape-box_half" key={res._id}>
                <img
                  src={`${IMG_URL}${res?.photo?._id}.${
                    res?.photo?.name.split(".")[1]
                  } `}
                  alt=""
                />

                <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
                <figcaption>
                  <div className="show-cont">
                    <h3 className="card-no">{index + 1}</h3>
                    <h4 className="card-main-title">{res?.name}</h4>
                  </div>
                  <p className="card-content">{res?.description}</p>
                  <a href={`${res?.url}`} className="read-more-btn">
                    View Online
                  </a>
                </figcaption>
                <span className="after"></span>
              </figure>
            ))}
          </div>
          <div className="pagination_container">
            {portfolioData.length === 0 ? (
              ""
            ) : (
              <div className="pagination">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
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
      </div>
    </section>
  );
};

export default Portfolio;
