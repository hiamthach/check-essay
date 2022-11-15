import api from "./apiConfig";

export const AIScoreAPI = {
  checkEssayAPI: ({ question, question_respond }) => {
    const url = "/writing/task-2-essay";

    return api.post(url, {
      question,
      question_respond,
    });
  },
};
