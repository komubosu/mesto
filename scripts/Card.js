import {popupImage, popupSubtitle, openPopup} from './index.js';
export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._title = data.name;
    this._image = data.link;
    this._placeElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
    this._buttonLike = this._placeElement.querySelector('.place__like-btn');
    this._buttonOpenPopup = this._placeElement.querySelector('.place__image');
    this._buttonDeletePlace = this._placeElement.querySelector('.place__del-btn');
  }

  _handleLike() {
    this._buttonLike.classList.toggle(`place__like-btn_active`);
  };

  _handleOpenPopup() {
    popupImage.src = this._buttonOpenPopup.src;
    popupImage.alt = this._buttonOpenPopup.alt;
    popupSubtitle.textContent = this._buttonOpenPopup.alt;
    openPopup(imgPopup);
  };

  _handleDeletPlace() {
    this._buttonDeletePlace.closest('.place').remove();
  };

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLike()
    });
    this._buttonOpenPopup.addEventListener('click', () => {
      this._handleOpenPopup()
    });
    this._buttonDeletePlace.addEventListener('click', () => {
      this._handleDeletPlace()
    });
  };

  generatePlace() {
    this._placeElement.querySelector('.place__image').src = this._image;
    this._placeElement.querySelector('.place__image').alt = this._title;
    this._placeElement.querySelector('.place__title').textContent = this._title;

    this._setEventListeners();

    return this._placeElement;
  };
};