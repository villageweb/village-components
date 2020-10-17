import React from "react";
import { Loader } from "./Loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Adds loading indicator to button
   */
  isLoading?: boolean | undefined;

  /**
   * Adds class button--${mode} to button. Override these classes for custom styling of CTAs
   */
  mode?: "primary" | "secondary" | "tertiary";

  /**
   * Removes width property such that button size is based on its children
   */
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
