import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = Array.from(this._popup.querySelectorAll('.form__text'));
  };

  _getInputValues() {
    const inputValuesList = [];
    for (let i = 0; i < this._inputList.length; i++) {
      inputValuesList[i] = this._inputList[i].value
    };
    return inputValuesList;
  };

  setInputValues([...newInputValues]) {
    for (let i = 0; i < newInputValues.length; i++) {
      this._inputList[i].value = newInputValues[i];
    }
  };

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}