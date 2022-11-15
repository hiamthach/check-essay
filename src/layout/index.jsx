import React, { useState } from "react";

import "./styles.scss";
// import Footer from "../components/Footer";

import Header from "../components/Header";
import Essay from "../containers/Essay";
import Score from "../containers/Score";

export const EssayContext = React.createContext();

const MainLayout = () => {
  const [scoreContent, setScoreContent] = useState(); // Score from AI
  const [essayContent, setEssayContent] = useState(); // Essay of learner
  const [status, setStatus] = useState("idle");

  return (
    <div className="main-layout">
      <Header />
      <EssayContext.Provider
        value={{
          scoreContent,
          setScoreContent,
          essayContent,
          setEssayContent,
          status,
          setStatus,
        }}
      >
        <div className="main-layout-container">
          <Essay />
          {scoreContent && <Score />}
        </div>
      </EssayContext.Provider>
      {/* <Footer />   */}
    </div>
  );
};

export default MainLayout;
