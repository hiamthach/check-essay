import { ToastContainer } from "react-toastify";
import "./assets/styles/index.scss";
import "antd/dist/antd.min.css";

import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layout";

function App() {
  return (
    <>
      <MainLayout />
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position={"top-center"}
      />
    </>
  );
}

export default App;
