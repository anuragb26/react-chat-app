export const validateLogin = values => {
  let errors = {};
  // Email Errors
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.value)) {
    errors.email = "Invalid email address";
  }
  // Password Errors
  if (values.password.value.length < 5) {
    errors.password = "Password must be at least 5 characters";
  }

  return errors;
};

export const validateRegister = values => {
  let errors = {};

  if (!values.email.value) {
    errors.email = "Required Email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.value)
  ) {
    errors.email = "Invalid email address";
  }
  // Password Errors
  if (!values.password.value) {
    errors.password = "Required Password";
  } else if (values.password.value.length < 5) {
    errors.password = "Password must be at least 5 characters";
  }
  if (!values.displayName.value) {
    errors.displayName = "Required Display Name";
  } else if (values.displayName.value.length < 4) {
    errors.displayName = "Display Name must be at least 4 characters";
  }

  return errors;
};
