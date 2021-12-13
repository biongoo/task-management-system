import { useState, useCallback } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
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
    setEnteredValue('');
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
