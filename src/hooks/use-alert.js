import { useReducer, useCallback } from 'react';

const initAlert = { show: false, type: 'success', title: '', message: '' };

const alertReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        show: true,
        type: 'error',
        title: action.title,
        message: action.message,
      };
    case 'SET_WARNING':
      return {
        show: true,
        type: 'warning',
        title: action.title,
        message: action.message,
      };
    case 'SET_SUCCESS':
      return {
        show: true,
        type: 'success',
        title: action.title,
        message: action.message,
      };
    case 'EXIT':
      return { ...state, show: false };
    default:
      throw new Error();
  }
};

const useAlert = () => {
  const [alert, dispatchAlert] = useReducer(alertReducer, initAlert);

  const setSuccessAlert = useCallback((title, message) => {
    dispatchAlert({
      type: 'SET_SUCCESS',
      title,
      message,
    });
  }, []);

  const setWarningAlert = useCallback((title, message) => {
    dispatchAlert({
      type: 'SET_WARNING',
      title,
      message,
    });
  }, []);

  const setErrorAlert = useCallback((title, message) => {
    dispatchAlert({
      type: 'SET_ERROR',
      title,
      message,
    });
  }, []);

  const closeAlert = useCallback(() => {
    dispatchAlert({
      type: 'EXIT',
    });
  }, []);

  return {
    showAlert: alert.show,
    alertType: alert.type,
    alertMessage: alert.message,
    alertTitle: alert.title,
    setSuccessAlert,
    setWarningAlert,
    setErrorAlert,
    closeAlert,
  };
};

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export { useAlert, wait };
