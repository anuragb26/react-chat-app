import { useState, useEffect } from "react";

const useForm = (initialState, validate, formSubmitApi) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        formSubmitApi();
        setSubmitting(false);
      } else {
        setSubmitting(true);
      }
    }
  }, [errors, isSubmitting, formSubmitApi]);

  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: { value: event.target.value, touched: true },
    });
  };

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default useForm;
