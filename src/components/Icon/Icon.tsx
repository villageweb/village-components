import axios, { Canceler } from "axios";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import IconContext from "./IconContext";

type IconProps = {
  name: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xlg";
  onClick?: (event?: SyntheticEvent) => void;
};

const Icon = ({ name, className, size, onClick }: IconProps) => {
  const [icon, setIcon] = useState("");
  const cache = useContext(IconContext);

  useEffect(() => {
    let cancelFetch: Canceler;

    (async () => {
      if (cache[name]) {
        return setIcon(cache[name]);
      }
      try {
        const { data } = await axios.get(
          `https://res.cloudinary.com/vw/image/upload/icons/${name}.svg`,
          {
            cancelToken: new axios.CancelToken((c) => (cancelFetch = c)),
          }
        );

        cache[name] = data;
        setIcon(data);
      } catch (e) {}
    })();

    return () => {
      cancelFetch && cancelFetch();
    };
  }, [name]);

  let placeholder;

  if (!icon) {
    // TODO: just return the placeholder. Do not bother with anything else.
    placeholder = (
      <span
        className={`icon-placeholder icon-placeholder--${size} ${className}`}
      ></span>
    );
  }

  let __html = icon;

  if (className || size) {
    const template = document.createElement("template");
    template.innerHTML = icon;

    const el = template.content.firstElementChild;
    el?.classList.add(`icon--${size}`);
    el?.classList.add(
      ...(className?.split(" ").filter((c: string) => !!c) || [])
    );

    __html = el?.outerHTML || "";
  }

  return (
    <>
      {placeholder}
      <span dangerouslySetInnerHTML={{ __html }} onClick={onClick}></span>
    </>
  );
};

Icon.defaultProps = {
  size: "md",
};

export default Icon;

export { Icon, IconProps };
