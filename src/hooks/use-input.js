import { useState, useCallback } from 'react';

const useInput = (validateValue, defaultValue) => {
  const [enteredValue, setEnteredValue] = useState(
    defaultValue ? defaultValue.value : ''
  );
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = useCallback((event) => {
    setEnteredValue(event.target.value);
  }, []);

  const inputTouchHandler = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = () => {
    setEnteredValue(defaultValue ? defaultValue.value : '');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputTouchHandler,
    reset,
  };
};

export default useInput;
