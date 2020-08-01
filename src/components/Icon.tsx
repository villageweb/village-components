import axios from "axios";
import React from "react";
import { SvgIcon } from "./SvgIcon";

const Icon = (props: any) => {
  const fetchIcon = async (name: string) => {
    const res = await axios.get(
      `https://res.cloudinary.com/vw/image/upload/icons/${name}.svg`
    );
    return res.data;
  };
  return <SvgIcon {...props} fetchIcon={fetchIcon} />;
};

export default Icon;
