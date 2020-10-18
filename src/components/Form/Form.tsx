import { cloneDeep } from 'lodash';
import React, { Component, FormEvent, ReactElement } from 'react';
import {
  getFormValues,
  isFormValid,
  markDirtyFields,
  markValidFields,
  markVisibleFields,
  validateField
} from '../../functions/form-functions';
import { Button } from '../Button';
import Field from './Field';
import { FieldConfig, FormConfig } from './form-config';

interface FormProps {
  /**
   * Object describing the form and keeping its state
   */
  config: FormConfig;

  /**
   * Text content for submit button. If set to none then no button will be rendered.
   */
  submitButtonContent?: string | ReactElement | 'none';

  /**
   * Callback for submit button click. Will be called with form values.
   */
  onSubmit?: (e: Record<string, any>) => void;

  /**
   * Specifies whether the form is single or double column
   */
  columnType?: 'single' | 'double';

  /**
   * Pass in any error you want to display on the footer of the form
   */
  error?: string;

  /**
   * Adds a loading indicator on the submit button
   */
  isLoading?: boolean;

  /**
   * Callback for any form value changes. Will be called with boolean indication if form valid and the latest form.
   */
  onChanges?: (e: { isValid: boolean; config: FormConfig }) => void;

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

  static defaultProps = {
    columnType: 'single',
    submitButtonContent: 'none'
  };

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

    const newState = { isValid: isFormValid(latestForm), config: latestForm };
    this.props.onChanges && this.props.onChanges(newState);

    this.setState(newState);
  };

  onSubmit(e: FormEvent) {
    e.preventDefault();
    this.props.onSubmit &&
      this.props.onSubmit(getFormValues(this.state.config));
  }

  render() {
    const fields = Object.entries(this.state.config)
      .filter(([, field]: [any, FieldConfig]) => field.visible)
      .map(([key, field]: [any, FieldConfig]) => (
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
          className={
            this.props.columnType === 'double' &&
            !['check', 'textarea'].includes(field.inputType)
              ? 'form__field--half'
              : 'form__field--full'
          }
        />
      ));

    const error = this.props.error ? (
      <span className="form__error">{this.props.error}</span>
    ) : null;

    const columnTypeClasses =
      this.props.columnType === 'double' ? 'grid grid--space-between' : '';

    return (
      <form
        className={`form ${this.props.noShadow ? '' : 'shadow'} ${
          this.props.className
        } ${columnTypeClasses}`}
        onSubmit={e => this.onSubmit(e)}
      >
        {this.props.headerContent}
        {fields}
        {this.props.subFooterContent}
        {this.props.submitButtonContent !== 'none' && (
          <Button
            className="button button--primary"
            type="submit"
            isLoading={this.props.isLoading}
            disabled={!this.state.isValid}
          >
            {this.props.submitButtonContent}
          </Button>
        )}
        {error}
        {this.props.footerContent}
      </form>
    );
  }
}

export { Form, FormProps };
