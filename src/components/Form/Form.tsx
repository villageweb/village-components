import { cloneDeep } from "lodash";
import React, { Component, FormEvent, ReactElement } from "react";
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

interface FormProps {
  /**
   * Object describing the form
   */
  config: FormConfig;

  /**
   * Text content for submit button
   */
  submitButtonText: string;

  /**
   * Callback for submit button click. Will be called with form values.
   */
  onSubmit: (e: Record<string, any>) => void;

  /**
   * Pass in any error you want to display on the footer of the form
   */
  error?: string;

  /**
   * Adds a loading indicator on the submit button
   */
  isLoading?: boolean;

  /**
   * Callback for any form value changes. Will be called with latest form values.
   */
  onChanges?: (e: Record<string, any>) => void;

  /**
   * JSX to be injected on the form footer e.g Forgot Password on a login form
   */
  footerContent?: ReactElement;

  /**
   * JSX to be injected on the form just above the submit button e.g Forgot Password on a login form
   */
  subFooterContent?: ReactElement;

  /**
   * JSX to be injected on the top of the form.
   */
  headerContent?: ReactElement;

  /**
   * Classes to be passed down to form
   */
  className?: string;

  /**
   * Add class `shadow` (that can be overridden) to form
   */
  noShadow?: boolean;
}

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
    this.props.onSubmit(getFormValues(this.state.config));
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
        {this.props.subFooterContent}
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
