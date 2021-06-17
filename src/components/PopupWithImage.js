import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(card) {
    this._popup.querySelector('.popup__image').src = card._image;
    this._popup.querySelector('.popup__subtitle').alt = card._title;
    this._popup.querySelector('.popup__subtitle').textContent = card._title;

    super.open();
  }
}