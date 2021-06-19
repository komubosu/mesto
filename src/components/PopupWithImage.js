import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._subtitle = this._popup.querySelector('.popup__subtitle');
  }

  open(card) {
    this._image.src = card._cardImageLink;
    this._subtitle.alt = card._cardName;
    this._subtitle.textContent = card._cardName;

    super.open();
  }
}