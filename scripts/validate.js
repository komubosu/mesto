function showInputError(formElement, inputElement, errorMessage, classes) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${classes.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${classes.errorClass}`);
};

function hideInputError(formElement, inputElement, classes) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${classes.inputErrorClass}`);
  errorElement.classList.remove(`${classes.errorClass}`);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, classes) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classes);
  } else {
    hideInputError(formElement, inputElement, classes);
  }
};

function setEventListeners(formElement, classes) {
  const inputList = Array.from(formElement.querySelectorAll(`${classes.inputSelector}`));
  const buttonElement = formElement.querySelector(`${classes.submitButtonSelector}`);toggleButtonState(inputList, buttonElement, classes);
  formElement.addEventListener('submit', function () {
    toggleButtonState(inputList, buttonElement, classes);
  });
  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function () {
      console.log(inputElement);
      checkInputValidity(formElement, inputElement, classes);
      toggleButtonState(inputList, buttonElement, classes);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, classes) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${classes.inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${classes.inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
};

function enableValidation(classes) {
  const formList = Array.from(document.querySelectorAll(`${classes.formSelector}`));
  formList.forEach(function(formElement) {
    setEventListeners(formElement, classes);
  });
};

const classes = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
}

enableValidation(classes);