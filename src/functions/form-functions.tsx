import { cloneDeep } from 'lodash';
import { FormConfig, FieldConfig } from '../components/Form/form-config';

/**
 * Return false if at least one field in the form is invalid
 * @param form form config
 */
const isFormValid = (form: FormConfig) => {
  for (const field in form) {
    const fieldConfig = form[field];
    if (!fieldConfig.valid && fieldConfig.visible) {
      return false;
    }
  }
  return true;
};

const isRequired = (field: FieldConfig) =>
  field.validations?.some(v => v.type === 'required');
/**
 * NB!! Mutates the field
 * Sets validation message for field should the field be invalid and marks it so
 * @param key field key
 * @param form form config, needed should field validation depend on other fields
 */
const validateField = (key: string, form: FormConfig) => {
  const field = form[key];
  if (!field.validations) {
    field.valid = true;
    return;
  }

  const value = field.attributes.value;
  for (const rule of field.validations) {
    if (rule.type === 'required' && rule.expression && value.trim() === '') {
      field.validationMessage = rule.message;
      field.valid = false;
      break;
    } else if (
      rule.type === 'regex' &&
      !(rule.expression as RegExp).test(value) &&
      isRequired(field)
    ) {
      field.valid = false;
      field.validationMessage = rule.message;
      break;
    } else if (rule.type === 'idNumber') {
      if (!validIdNumber(field.attributes.value)) {
        field.valid = false;
        field.validationMessage = rule.message;
      }
      break;
    } else if (rule.type === 'passwordMatch') {
      const password = form['password'].attributes.value;
      const passwordConfirm = form['passwordConfirm'];

      if (
        passwordConfirm.dirty &&
        password !== passwordConfirm.attributes.value
      ) {
        passwordConfirm.validationMessage = rule.message;
        passwordConfirm.valid = false;
        break;
      }
      if (
        passwordConfirm.dirty &&
        password === passwordConfirm.attributes.value
      ) {
        passwordConfirm.validationMessage = '';
        passwordConfirm.valid = true;
        break;
      }
    } else {
      field.valid = true;
    }
  }
};

const markDirtyFields = (oldForm: FormConfig) => {
  const form = cloneDeep(oldForm);

  Object.values(form).forEach((field: any) => {
    if (field.attributes.value) {
      field.dirty = true;
    }
  });

  return form;
};

const markValidFields = (oldForm: FormConfig) => {
  const form = cloneDeep(oldForm);

  Object.entries(form).forEach(([key]: any) => {
    validateField(key, form);
  });

  return form;
};

const markVisibleFields = (oldForm: FormConfig) => {
  const form = cloneDeep(oldForm);

  Object.values(form).forEach((field: FieldConfig) => {
    if (!field.visibility) {
      field.visible = true;
      return;
    }

    const left = field.visibility[0];
    const operator = field.visibility[1];
    const right = field.visibility[2];

    if (operator === 'eq') {
      const parts = left.split('.');

      // traversing object tree
      let part;
      let value = form as any;
      while ((part = parts.shift())) {
        value = value[part];
      }
      const eq = right === value;
      field.visible = eq;
    }
  });

  return form;
};

const getFormValues: any = (form: FormConfig) => {
  let formData = {};
  Object.entries(form)
    .filter(([, config]: any) => !!config.visible)
    .forEach(([key, config]: any) => (formData[key] = config.attributes.value));
  return formData;
};

// TODO: make this a patch like react setState()
const populateFormValues = (form: FormConfig, data: object) => {
  if (!data) {
    return form;
  }

  Object.entries(form).forEach(([key, config]: any) => {
    const val = data[key];
    if (val) {
      config.attributes.value = val;
    }
  });

  return form;
};

function validIdNumber(idNumber: any) {
  // Ref: http://www.sadev.co.za/content/what-south-african-id-number-made
  if (idNumber.length !== 13 || !isNumber(idNumber)) {
    return false;
  }

  // get first 6 digits as a valid date
  const tempDate = new Date(
    idNumber.substring(0, 2),
    idNumber.substring(2, 4) - 1,
    idNumber.substring(4, 6)
  );

  const date = tempDate.getDate();
  const month = tempDate.getMonth();

  if (
    !(
      (tempDate.getFullYear() + '').substring(2, 4) ===
        idNumber.substring(0, 2) &&
      month === +idNumber.substring(2, 4) - 1 &&
      date === +idNumber.substring(4, 6)
    )
  ) {
    return false;
  }

  // get the gender
  // const genderCode = idNumber.substring(6, 10);
  // const gender = parseInt(genderCode) < 5000 ? "Female" : "Male";

  // get country ID for citzenship
  // const citzenship = parseInt(idNumber.substring(10, 11)) == 0 ? "Yes" : "No";

  // apply Luhn formula for check-digits
  let tempTotal = 0;
  let checkSum = 0;
  let multiplier = 1;
  for (let i = 0; i < 13; ++i) {
    tempTotal = parseInt(idNumber.charAt(i), 10) * multiplier;
    if (tempTotal > 9) {
      tempTotal =
        parseInt(tempTotal.toString().charAt(0), 10) +
        parseInt(tempTotal.toString().charAt(1), 10);
    }
    checkSum = checkSum + tempTotal;
    multiplier = multiplier % 2 === 0 ? 1 : 2;
  }

  if (checkSum % 10 !== 0) {
    return false;
  }

  return true;
}

function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export {
  populateFormValues,
  getFormValues,
  markDirtyFields,
  markValidFields,
  markVisibleFields,
  validateField,
  isFormValid
};
