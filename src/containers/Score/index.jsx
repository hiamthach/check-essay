import React, { useContext, useState } from "react";

import "./styles.scss";

import { Divider } from "antd";
import { EssayContext } from "../../layout";

import ScoreInfoTag from "../../components/ScoreInfoTag";
import ScoreModal from "../../components/CustomModal/ScoreModal";

const Score = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scoreContent } = useContext(EssayContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Divider />
      <div className="score">
        <div className="score-overall">
          <h3>Overall</h3>
          <h2>{scoreContent?.scores.overall.toFixed(1)}</h2>
        </div>
        <div className="score-info">
          <ScoreInfoTag
            name={"Linking words, meeting the goal of 7 or more"}
            number={scoreContent?.words.linking_words.length}
            color="green"
          />
          <ScoreInfoTag
            name={"Repeated words, meeting the goal of 3 or fewer"}
            number={scoreContent?.words.duplicated_words.length}
            color="yellow"
          />
          <ScoreInfoTag
            name={"Mistakes"}
            number={
              Object.keys(
                scoreContent?.words?.error_and_correct.error_and_correct_grammar
              ).length +
              Object.keys(
                scoreContent?.words?.error_and_correct
                  .error_and_correct_spelling
              ).length
            }
            color="red"
          />

          <span className="score-info-show" onClick={openModal}>
            Show detail
          </span>
        </div>
      </div>
      <ScoreModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Score;
