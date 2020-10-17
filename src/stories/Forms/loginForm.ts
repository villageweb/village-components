export default {
  email: {
    inputType: 'input',
    label: 'Email Address',
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
      autoComplete: 'current-password'
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
      }
    ]
  }
};
