import { cloneDeep } from "lodash";
import React, { Component, FormEvent } from "react";
import {
  getFormValues,
  isFormValid,
  markDirtyFields,
  markValidFields,
  markVisibleFields,
  validateField,
} from "../../functions/form-functions";
import { Button } from "../Button";
import Field from "./Field";
import { FormConfig } from "./form-config";

type FormProps = {
  config: FormConfig;
  error?: string;
  isLoading?: boolean;
  submit: (e: Record<string, any>) => void;
  onChanges?: (e: Record<string, any>) => void;
  submitButtonText: string;
  footerContent?: any;
  headerContent?: any;
  className?: string;
  noShadow?: boolean;
};

class Form extends Component<FormProps> {
  state = { config: {}, isValid: false };

  componentDidMount() {
    let config = markVisibleFields(this.props.config);
    config = markValidFields(config);
    config = markDirtyFields(config);

    this.setState({ config, isValid: isFormValid(config) });
  }

  handleChanges = (newVal: any, field: string, oldForm: FormConfig) => {
    const form = cloneDeep(oldForm);

    const curField = form[field];

    // set new value on field
    curField.attributes.value = newVal;
    curField.dirty = true;

    // validate current field
    validateField(field, form);

    const latestForm = markVisibleFields(form);

    this.props.onChanges && this.props.onChanges(getFormValues(latestForm));

    this.setState({ isValid: isFormValid(latestForm), config: latestForm });
  };

  onSubmit(e: FormEvent) {
    e.preventDefault();
    this.props.submit(getFormValues(this.state.config));
  }

  render() {
    const fields = Object.entries(this.state.config)
      .filter(([, field]: any) => field.visible)
      .map(([key, field]: any) => (
        <Field
          id={key}
          form={this.state.config}
          key={key}
          inputType={field.inputType}
          attributes={field.attributes}
          label={field.label}
          valid={field.valid}
          validationMessage={field.validationMessage}
          fieldMessage={field.fieldMessage}
          dirty={field.dirty}
          min={field.min}
          max={field.max}
          fields={field.fields}
          changed={(event: any) =>
            this.handleChanges(event?.target?.value, key, this.state.config)
          }
        />
      ));

    const error = this.props.error ? (
      <span className="form__error">{this.props.error}</span>
    ) : null;

    return (
      <form
        className={`form ${this.props.noShadow ? "" : "shadow"} ${
          this.props.className
        }`}
        onSubmit={(e) => this.onSubmit(e)}
      >
        {this.props.headerContent}
        {fields}
        <Button
          className="button button--primary"
          type="submit"
          isLoading={this.props.isLoading}
          disabled={!this.state.isValid}
        >
          {this.props.submitButtonText}
        </Button>
        {error}
        {this.props.footerContent}
      </form>
    );
  }
}

export { Form, FormProps };
