import React, { useContext } from "react";

import Word from "../Word";

import { EssayContext } from "../../layout/index";
import { handleWord } from "../../utils";

const Paragraph = ({ content }) => {
  const { scoreContent } = useContext(EssayContext);

  const duplicatedWords = scoreContent.words.duplicated_words.map(
    (word) => word[0]
  );

  // Get the error grammar & spelling
  let errorList = {
    ...scoreContent.words.error_and_correct.error_and_correct_spelling,
    ...scoreContent.words.error_and_correct.error_and_correct_grammar,
  };

  // Modify paragraph for rendering
  const checkParagraph = (paragraph) => {
    let modifiedParagraph = paragraph;

    //Errors
    Object.keys(errorList).forEach((key) => {
      // Response error format (start|end)
      const splittedKey = key.split("|").map((key) => parseInt(key));

      // Replace the error word by ####
      modifiedParagraph =
        modifiedParagraph.substring(0, splittedKey[0]) +
        "#".repeat(errorList[key][0].length) +
        modifiedParagraph.substring(splittedKey[1], modifiedParagraph.length);
    });

    // Linking word
    scoreContent.words.linking_words.forEach((word) => {
      if (!word.match(/[^a-zA-Z ]/g)) {
        // Replace linking word by **word
        modifiedParagraph = modifiedParagraph.replaceAll(
          word,
          "**" + word.replace(" ", "_")
        );
      }
    });

    return modifiedParagraph;
  };

  // Render paragraph: split paragraph into single word to handle
  const renderParagraph = (paragraph) => {
    let errors = errorList;
    return paragraph
      ?.split(" ")
      .map((word, index) => {
        //Check Linking word
        if (word.includes("**")) {
          const splitted = handleWord(
            word.replaceAll("*", "").replace("_", " ")
          );
          return (
            <span key={index + splitted[0]}>
              <span>{splitted[0]}</span>
              {splitted[1] && (
                <Word
                  type="linking"
                  content={splitted[1].replace(/[^a-zA-Z ]/g, "")}
                  key={index + word}
                />
              )}
              <span>{splitted[2]}</span>
            </span>
          );
        }

        // Check Error
        else if (word.includes("##")) {
          // Get the first Error key & data
          const key = Object.keys(errors)[0];
          const data = errors[key];
          if (word.length === data[0].length) {
            // Remove key
            delete errors[key];
            return (
              <Word
                type="error"
                content={data[0]}
                replace={data.slice(1)}
                key={index + word}
              />
            );
          }
        } else {
          // Check if word in Duplicated list
          if (word) {
            const splitted = handleWord(word);
            if (duplicatedWords.indexOf(splitted[1]) >= 0) {
              return (
                <span key={index + splitted[0]}>
                  <span>{splitted[0]}</span>
                  {splitted[1] && (
                    <Word type="repeated" content={splitted[1]} />
                  )}
                  <span>{splitted[2]}</span>
                </span>
              );
            }
          }

          return <Word content={word} key={index + word} />;
        }
        return "";
      })
      .reduce((prev, curr) => [prev, " ", curr]);
  };

  return (
    <div className="paragraph">
      {content &&
        checkParagraph(content)
          ?.split("\n")
          .map((sentence, index) => (
            <p key={index}>{renderParagraph(sentence)}</p>
          ))}
    </div>
  );
};

export default Paragraph;
