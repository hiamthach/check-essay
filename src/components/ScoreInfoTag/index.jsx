import React from "react";
import "./styles.scss";

const ScoreInfoTag = ({ number, name, color }) => {
  return (
    <div className={`score-info-tag score-info-tag__${color}`}>
      <span>{name}</span>
      <div className="score-info-tag__num">
        <span>{number}</span>
      </div>
    </div>
  );
};

export default ScoreInfoTag;
