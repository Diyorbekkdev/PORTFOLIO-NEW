import "./progress.scss";

interface ProgressIndicatorProps {
    filledFields: number;
    totalFields: number;
  }
const ProgressIndicator = ({ filledFields, totalFields } : ProgressIndicatorProps) => {
  const percentage = (filledFields / totalFields) * 100;

  return (
    <div className="progress-indicator">
      <div className="filler" style={{ width: `${percentage}%` }}>
        {percentage.toFixed(2)}%
      </div>
    </div>
  );
};

export default ProgressIndicator;