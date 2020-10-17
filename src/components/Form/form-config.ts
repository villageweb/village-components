type FieldInputType =
  | 'input'
  | 'date'
  | 'textarea'
  | 'select'
  | 'check'
  | 'radio'
  | 'time'
  | 'slider';

interface FieldConfig {
  inputType: FieldInputType;
  label: string;
  fieldMessage?: string;
  min?: string;
  max?: string;
  attributes?: any;
  validations?: {
    type: string;
    expression: boolean | RegExp;
    message: string;
  }[];
  valid?: boolean;
  dirty?: boolean;

  // radio buttons and selects
  fields?: { label: string; value: string }[];

  /**
   * expression to determine if field should be visible [<operand>,<operator>,<operand>]
   * `operand` should reference an actual value
   * e.g visibility: ['customerType.attributes.value', 'eq', 'INDIVIDUAL']
   */
  visibility?: string[];

  // used internally
  visible?: boolean;
  validationMessage?: string;
}

interface FormConfig {
  [field: string]: FieldConfig;
}

export { FieldInputType, FieldConfig, FormConfig };

// EXAMPLE USAGE

/**
const registerForm: FormConfig = {
  // customer type
  customerType: {
    inputType: 'radio',
    label: 'Customer Type',
    attributes: {
      value: 'BUSINESS'
    },
    fields: [
      {
        label: 'Business',
        value: 'BUSINESS'
      },
      {
        label: 'Individual',
        value: 'INDIVIDUAL'
      }
    ],
    valid: true,
    dirty: true
  },
  name: {
    inputType: 'input',
    label: 'Name',
    attributes: {
      value: '',
      type: 'text',
      placeholder: 'e.g. Gama'
    },
    validations: [
      {
        type: 'required',
        expression: true,
        message: 'Your first name is required'
      },
      {
        type: 'regex',
        expression: /.{2,}/,
        message: 'Your first name must be at least 2 characters'
      }
    ]
  },
  // don't show if business
  surname: {
    inputType: 'input',
    label: 'Last Name',
    attributes: {
      value: '',
      type: 'text',
      placeholder: 'e.g. Fani'
    },
    validations: [
      {
        type: 'required',
        expression: true,
        message: 'Your last name is required'
      },
      {
        type: 'regex',
        expression: /.{2,}/,
        message: 'Your last name must be at least 2 characters'
      }
    ],
    visibility: ['customerType.attributes.value', 'eq', 'INDIVIDUAL']
  },
  contactNumber: {
    inputType: 'input',
    label: 'Contact Number',
    attributes: {
      value: '',
      type: 'text',
      placeholder: '0781234567'
    },
    validations: [
      {
        type: 'required',
        expression: true,
        message: 'Your contact number is required'
      },
      {
        type: 'regex',
        expression: /^(\+\d{1,3}?)?\d{10}$/,
        message: 'Your contact number must be valid'
      }
    ]
  },
  email: {
    inputType: 'input',
    label: 'Email Address',
    fieldMessage: 'You will use this email address to log in to your account',
    attributes: {
      value: '',
      type: 'email',
      placeholder: 'e.g vusi@premier.com',
      autoComplete: 'username'
    },
    validations: [
      {
        type: 'required',
        expression: true,
        message: 'Your email address is required'
      },
      {
        type: 'regex',
        expression: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: 'Your email address must be valid'
      }
    ]
  },
  password: {
    inputType: 'input',
    label: 'Password',
    attributes: {
      value: '',
      type: 'password',
      autoComplete: 'new-password'
    },
    validations: [
      {
        type: 'required',
        expression: true,
        message: 'Your password is required'
      },
      {
        type: 'regex',
        expression: /.{6,}/,
        message: 'Password must be 6 characters or more'
      },
      {
        type: 'passwordMatch',
        expression: true,
        message: 'Your passwords do not match'
      }
    ]
  },
  passwordConfirm: {
    inputType: 'input',
    label: 'Confirm Password',
    attributes: {
      value: '',
      type: 'password',
      autoComplete: 'new-password'
    },
    validations: [
      {
        type: 'passwordMatch',
        expression: true,
        message: 'Your passwords do not match'
      }
    ]
  }
};
 */
