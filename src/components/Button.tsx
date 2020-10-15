import React from "react";
import { Loader } from "./Loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean | undefined;
  mode?: "primary" | "secondary" | "tertiary";
  isContained?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  isLoading,
  className,
  isContained,
  mode = "primary",
  ...props
}) => {
  const hideButtonClass = isLoading ? "visibility--hidden" : "";
  const hideLoaderClass = !isLoading ? "visibility--hidden" : "";
  const containedClass = isContained ? "button--contained" : "";
  return (
    <button
      {...props}
      className={`button button--${mode} ${containedClass} ${className}`}
      disabled={props.disabled || isLoading}
    >
      <span className={hideButtonClass}>{props.children}</span>
      <Loader
        className={`${hideLoaderClass} ${
          className?.includes("button--transparent") ? "loader--black" : ""
        }`}
      />
    </button>
  );
};

export { Button, ButtonProps };
