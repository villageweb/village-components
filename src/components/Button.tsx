import React from "react";
import { Loader } from "./Loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean | undefined;
}

const Button: React.FC<ButtonProps> = ({ isLoading, ...props }) => {
  const hideButtonClass = isLoading ? "visibility--hidden" : "";
  const hideLoaderClass = !isLoading ? "visibility--hidden" : "";
  return (
    <button
      className="button"
      {...props}
      disabled={props.disabled || isLoading}
    >
      <span className={hideButtonClass}>{props.children}</span>
      <Loader
        className={`${hideLoaderClass} ${
          props.className?.includes("button--transparent")
            ? "loader--black"
            : ""
        }`}
      />
    </button>
  );
};

export { Button, ButtonProps };
