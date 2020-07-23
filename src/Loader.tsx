import React from "react";

const Loader: React.FC<{ className: string }> = ({ className }) => (
  <div className={`loader ${className}`}>
    <span></span>
    <span></span>
    <span></span>
  </div>
);

export default Loader;
