import { useState, useCallback } from "react";
import { validate } from "./validators";

/**
 * useFormValidation — manages form values, touched state, and field-level validation.
 *
 * @param {Object} initialState  — { email: "", password: "" }
 * @param {Object} rules         — { email: [required(), isEmail()], password: [required(), minLength(8)] }
 *
 * Returns { values, errors, touched, handleChange, handleBlur, validateAll, setValue, setValues, resetForm, isValid }
 */
export const useFormValidation = (initialState, rules = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Re-validate if field was already touched
      if (touched[name] && rules[name]) {
        const error = validate(value, rules[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched, rules]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (rules[name]) {
        const error = validate(value, rules[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [rules]
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    let valid = true;

    for (const [field, fieldRules] of Object.entries(rules)) {
      const error = validate(values[field], fieldRules);
      if (error) {
        newErrors[field] = error;
        valid = false;
      }
    }

    setErrors(newErrors);
    // Mark every ruled field as touched so errors show up
    setTouched(
      Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return valid;
  }, [values, rules]);

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(
    (newState) => {
      setValues(newState || initialState);
      setErrors({});
      setTouched({});
    },
    [initialState]
  );

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValue,
    setValues,
    resetForm,
  };
};
