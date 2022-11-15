import React, { useContext } from "react";

import "./styles.scss";

import CustomModal from "..";
import Paragraph from "../../Paragraph";

import { EssayContext } from "../../../layout";

import { flattenObject, capitalizeLetter } from "../../../utils";

import { Table, Empty } from "antd";

const ScoreModal = ({ isModalOpen, setIsModalOpen }) => {
  const { scoreContent, essayContent } = useContext(EssayContext);

  const generateCol = () => {
    return [
      {
        title: "Component",
        dataIndex: "component",
        width: 200,
        style: {
          "font-weight": "900",
        },
      },
      {
        title: "Score",
        dataIndex: "score",
        width: 50,
        align: "center",
      },
      {
        title: "Suggestion",
        dataIndex: "suggestion",
        width: 400,
      },
    ];
  };

  const generateColData = (scoreData) => {
    return Object.keys(scoreData)
      .filter((compo) => compo !== "overall")
      .map((key) => {
        return {
          ...key,
          component: capitalizeLetter(
            key
              .replace("score", "")
              .split(/[^A-Za-z0-9]/)
              .join(" ")
              .trim()
              .replace(" n ", " and ")
          ),
          score: scoreData[key],
          key: key,
        };
      });
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title="AI Score"
    >
      {scoreContent ? (
        <div className="score-modal">
          <div className="score-modal__table">
            <Table
              size="default"
              className="score-modal-table"
              columns={generateCol(flattenObject(scoreContent.scores))}
              dataSource={generateColData(flattenObject(scoreContent.scores))}
              pagination={false}
            />
          </div>
          <div className="score-modal__paragraph">
            <div className="score-modal__paragraph--head">
              <div className="score-modal__paragraph--tag-list">
                <div className="score-modal__paragraph--tag score-modal__paragraph--tag-green">
                  <span>
                    Linking words: {scoreContent.words.linking_words.length}
                  </span>
                </div>
                <div className="score-modal__paragraph--tag score-modal__paragraph--tag-yellow">
                  <span>
                    Repeated words: {scoreContent.words.duplicated_words.length}
                  </span>
                </div>
                <div className="score-modal__paragraph--tag score-modal__paragraph--tag-red">
                  <span>
                    Mistakes:{" "}
                    {Object.keys(
                      scoreContent.words?.error_and_correct
                        .error_and_correct_grammar
                    ).length +
                      Object.keys(
                        scoreContent.words?.error_and_correct
                          .error_and_correct_spelling
                      ).length}
                  </span>
                </div>
              </div>
              <div className="score-modal__paragraph--score">
                <p>Score: </p>{" "}
                <span>{scoreContent.scores.overall.toFixed(1)} / 9.0</span>{" "}
              </div>
            </div>

            <div className="score-modal__paragraph--content">
              <Paragraph content={essayContent} />
            </div>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </CustomModal>
  );
};

export default ScoreModal;
