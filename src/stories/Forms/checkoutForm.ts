export default {
  name: {
    inputType: "input",
    label: "First Name",
    attributes: {
      value: "",
      type: "text",
      placeholder: "e.g. Gama",
    },
    validations: [
      {
        type: "required",
        expression: true,
        message: "Your first name is required",
      },
      {
        type: "regex",
        expression: /.{2,}/,
        message: "Your first name must be at least 2 characters",
      },
    ],
  },
  surname: {
    inputType: "input",
    label: "Last Name",
    attributes: {
      value: "",
      type: "text",
      placeholder: "e.g. Fani",
    },
    validations: [
      {
        type: "required",
        expression: true,
        message: "Your last name is required",
      },
      {
        type: "regex",
        expression: /.{2,}/,
        message: "Your last name must be at least 2 characters",
      },
    ],
  },
  email: {
    inputType: "input",
    label: "Your Email",
    attributes: {
      value: "",
      type: "email",
      placeholder: "e.g vusi@premier.com",
      autoComplete: "username",
    },
    validations: [
      {
        type: "required",
        expression: true,
        message: "Your email address is required",
      },
      {
        type: "regex",
        expression: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Your email address must be valid",
      },
    ],
  },
  contactNumber: {
    inputType: "input",
    label: "Your Phone",
    attributes: {
      value: "",
      type: "text",
      placeholder: "0781234567",
    },
    validations: [
      {
        type: "required",
        expression: true,
        message: "Your contact number is required",
      },
      {
        type: "regex",
        expression: /^(\+\d{1,3}?)?\d{10}$/,
        message: "Your contact number must be valid",
      },
    ],
  },
  same: {
    inputType: "check",
    label: "",
    attributes: {
      type: "checkbox",
      label: "Delivery address same as physical address",
    },
  },
  notes: {
    inputType: "textarea",
    label: "Additional order or delivery notes",
    attributes: {
      type: "text",
    },
  },
};
