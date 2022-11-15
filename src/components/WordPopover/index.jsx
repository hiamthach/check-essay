import React from "react";

import "./styles.scss";

import { Divider } from "antd";

const WordPopover = ({ content, replace, setWord }) => {
  const handleClick = (word) => {
    setWord(word);
  };

  return (
    <div className="word-popover">
      <h6 className="word-popover__title">CORRECT YOUR WORD</h6>
      <div className="word-popover__replace--list">
        {replace.map((word, index) => {
          return (
            <span
              className="word-popover__replace--word"
              key={index + word}
              onClick={() => {
                handleClick(word);
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
      <Divider />
      <p className="word-popover__des">
        The word <span>{content}</span> doesn’t seem to fit this context.
        Consider replacing it with a different one.
      </p>
    </div>
  );
};

export default WordPopover;
