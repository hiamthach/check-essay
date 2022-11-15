import React from "react";

import "./styles.scss";

const Button = ({
  type = "primary",
  children,
  outlined = false,
  disabled = false,
  isSubmit,
}) => {
  return (
    <button
      className={`cus-btn ${type} ${outlined && "outlined"} ${
        disabled && "disabled"
      }`}
      type={isSubmit ? "submit" : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
