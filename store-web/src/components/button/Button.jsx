import React from "react";
import "./button.css";

function Button({ text, colorChange = "", onClick, type }) {
  return (
    <div>
      <a href="#">
        <button
        type={type}
          className={
            colorChange === "toRed"
              ? "buttonToRed"
              : colorChange === "toGreen"
              ? "buttonToGreen"
              : "button"
          }
          onClick={onClick}
        >
          {text}
        </button>
      </a>
    </div>
  );
}

export default Button;
