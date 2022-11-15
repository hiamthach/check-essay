import React, { useState } from "react";

import "./styles.scss";

import { Popover } from "antd";

import WordPopover from "../WordPopover";

const Word = ({ type, content, replace }) => {
  const [word, setWord] = useState(content); // word state
  const [wordType, setWordType] = useState(type); // type state

  // When learner check and replace word
  const handleReplaceWord = (word) => {
    setWord(word);
    setWordType("");
  };

  const renderPopover = () => {
    switch (wordType) {
      // Type is error has popover to change translate.
      case "error":
        return (
          <WordPopover
            content={content}
            replace={replace}
            setWord={handleReplaceWord}
          />
        );

      default:
        return;
    }
  };

  return (
    <Popover placement="bottomLeft" showArrow={false} content={renderPopover()}>
      <span className={`word word__${wordType ? wordType : ""}`}>{word}</span>
    </Popover>
  );
};

export default Word;
