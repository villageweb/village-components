import { endOfDay, isToday } from "date-fns";
import React from "react";
import DatePicker from "react-datepicker";
import { Icon } from "../Icon/Icon";
import "../../styles/datepicker/datepicker.scss";

const Field = (props: any) => {
  let inputEl = null;

  switch (props.inputType) {
    case "slider":
      inputEl = (
        <input
          type="range"
          {...props.attributes}
          name={props.id}
          onChange={props.changed}
          className="margin-v--md"
        />
      );
      break;
    case "input":
      inputEl = (
        <input
          {...props.attributes}
          name={props.id}
          onChange={props.changed}
          className="form__input"
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          {...props.attributes}
          name={props.id}
          onChange={props.changed}
          value={props.attributes.value}
          className="form__input"
        >
          {props.fields.map((f: any) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      );
      break;
    case "check":
      props.attributes.value = props.attributes.value
        ? props.attributes.value
        : false;
      inputEl = (
        <label>
          <input
            {...props.attributes}
            name={props.id}
            onChange={(e) =>
              props.changed({ target: { value: e.target.checked } })
            }
          />
          <span className="padding--sm text--sm">{props.attributes.label}</span>
        </label>
      );
      break;
    case "radio":
      inputEl = props.fields.map((field: any) => (
        <label className="form__radio" key={field.value}>
          <input
            type="radio"
            name={props.id}
            value={field.value}
            checked={field.value === props.attributes.value}
            onChange={props.changed}
          />
          <span className="margin-r--xlg">{field.label}</span>
          <span className="form__radio-checkmark"></span>
        </label>
      ));
      break;
    case "textarea":
      inputEl = (
        <textarea
          className="form__input form__textarea text--sm"
          onChange={props.changed}
          name={props.id}
          {...props.attributes}
        />
      );
      break;
    case "date":
      let val = new Date();
      const other = props.form[props.attributes.notBefore];
      if (props.attributes.notBefore) {
        const otherDate = getDate(other.attributes.value);
        const thisDate = getDate(props.attributes.value);

        // if before
        if (thisDate <= otherDate) {
          val = getDate(other.attributes.value);
        } else {
          val = getDate(props.attributes.value);
        }
      } else if (props.attributes.value) {
        val = new Date(props.attributes.value);
      }

      props.attributes.value = val;

      let minDate;
      if (props.attributes.notBefore) {
        minDate = getDate(other.attributes.value);
      }
      if (props.min === "today") {
        minDate = new Date();
      }
      let maxDate;
      if (props.max === "week") {
        maxDate = new Date();
        maxDate.setDate(new Date().getDate() + 6);
      }

      inputEl = (
        <DatePicker
          selected={val}
          onChange={(val) => props.changed({ target: { value: val } })}
          className="form__input cursor--pointer"
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="d MMMM yyyy"
        />
      );
      break;
    case "time":
      let time = props.attributes.value;
      if (!time) {
        time = roundToMins(new Date());
      }

      props.attributes.value = time;

      const minTime = isToday(props.form["visitDay"].attributes.value)
        ? new Date()
        : endOfDay(new Date());
      const maxTime = new Date(new Date().setHours(23));
      maxTime.setMinutes(59);
      // TODO: make this input readonly
      inputEl = (
        <DatePicker
          selected={time}
          onChange={(time) => props.changed({ target: { value: time } })}
          showTimeSelect
          showTimeSelectOnly
          minTime={roundToMins(minTime)}
          maxTime={maxTime}
          timeIntervals={15}
          dateFormat="hh:mm aa"
          className="form__input cursor--pointer"
        />
      );
      break;
    default:
      inputEl = <input onChange={props.changed} />;
      break;
  }

  let label = null;
  if (props.valid || !props.dirty) {
    label = (
      <label className="form__label">
        {/* <Icon name="circle-tick" className="margin-r--xs fill--success" size="sm" /> */}
        {props.label}
      </label>
    );
  }

  let validationMessage = null;
  if (!props.valid && props.dirty) {
    validationMessage = (
      <span className="form__validation">
        <Icon
          name="warning"
          className="margin-r--xs fill--warn v-align--middle"
          size="sm"
        />
        <span className="v-align--middle">{props.validationMessage}</span>
      </span>
    );
  }

  let fieldMessage = null;
  if (props.fieldMessage) {
    fieldMessage = (
      <span className="form__field-msg">{props.fieldMessage}</span>
    );
  }

  return (
    <div className="margin-b--lg">
      {validationMessage}
      {label}
      {inputEl}
      {fieldMessage}
    </div>
  );
};

const getDate = (val: string) => (val ? new Date(val) : new Date());

const roundToMins = (date: Date, mins = 15) => {
  const minutes = Math.ceil(date.getMinutes() / mins) * mins;
  date.setMinutes(minutes);
  date.setSeconds(0);
  return date;
};

export default Field;
