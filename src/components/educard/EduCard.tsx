import "./educard.scss";
import cardImg from "../../assets/unvesites.jpg";
import edit from "../../assets/edit.png";
import delete_edu from "../../assets/delete.png";

export interface EduCardProps {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  level: string;
  onDlete: () => void;
  onEdit: () => void;
}

const EduCard = ({
  _id,
  name,
  startDate,
  endDate,
  description,
  level,
  onDlete,
  onEdit,
}: EduCardProps) => {
  return (
    <div id={_id}>
      <div className="main">
        <div className="card">
          <img src={cardImg} />
          <div className="card-title">
            <h4>{name}</h4>
            <h3>Start Date: {startDate}</h3>
            <h3>End Date: {endDate}</h3>
            <h3>Level: {level}</h3>
          </div>
          <div className="card-content">
            <div className="card-content-row">
              <p>{description}</p>
            </div>
            <div className="card-content-user-info">
              <div className="card-content-user-contact">
                <button onClick={onEdit}>
                  <img src={edit} alt="" />
                </button>
                <button onClick={onDlete}>
                  <img src={delete_edu} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduCard;
