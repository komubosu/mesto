import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({ handleSubmitForm }, popupSelector) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = Array.from(this._popup.querySelectorAll('.form__text'));
  };

  updateHandleSubmitForm({ handleSubmitForm }) {
    this._popupForm.removeEventListener('submit', this._handleSubmitForm);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm.addEventListener('submit', this._handleSubmitForm);
  }

  getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    return this._inputValues;
  };

  setInputValues(newInputValues) {
    this._inputList.forEach(input => input.value = newInputValues[input.name]);
  };

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', this._handleSubmitForm);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}