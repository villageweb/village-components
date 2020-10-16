import React, { ReactElement, useState } from "react";
import { Icon } from "./Icon/Icon";

const Counter = ({
  initialValue = 1,
  max = 999999,
  onChange,
  minusContent,
  plusContent,
  minusIcon = "circle-minus",
  plusIcon = "circle-plus",
}: {
  initialValue?: number;
  max?: number;
  onChange: Function;
  minusContent?: ReactElement;
  plusContent?: ReactElement;
  minusIcon?: string;
  plusIcon?: string;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div className="counter">
      <button
        className="button--reset counter__button counter__button--minus"
        onClick={() => {
          onChange(value > 1 ? value - 1 : 1);
          setValue(value > 1 ? value - 1 : 1);
        }}
      >
        {minusContent || <Icon name={minusIcon} className="v-align--middle" />}
      </button>
      <div className="counter__value">{value}</div>
      <button
        className="button--reset counter__button counter__button--plus"
        onClick={() => {
          onChange(value < max ? value + 1 : value);
          setValue(value < max ? value + 1 : value);
        }}
      >
        {plusContent || <Icon name={plusIcon} className="v-align--middle" />}
      </button>
    </div>
  );
};

export { Counter };
