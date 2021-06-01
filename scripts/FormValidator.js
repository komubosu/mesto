export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _getInputList() {
    const inputList = Array.from(
      this._formElement
      .querySelectorAll(`${this._inputSelector}`)
      );

    return inputList;
  }

  _getButtonElement() {
    const buttonElement = this._formElement
      .querySelector(`${this._submitButtonSelector}`);

    return buttonElement
  }

  _hasInvalidInput() {
    return this._getInputList().some(function(inputElement) {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    const buttonElement = this._getButtonElement();
    if (this._hasInvalidInput()) {
      buttonElement.classList.add(`${this._inactiveButtonClass}`);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      buttonElement.disabled = false;
    }
  };

  _getErrorElement(inputElement) {
    const errorElement = this._formElement
      .querySelector(`.${inputElement.id}-error`);

    return errorElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorClass}`);
  };

  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._formElement.addEventListener('submit', () => {
      this._toggleButtonState();
    });
    this._getInputList().forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };
};