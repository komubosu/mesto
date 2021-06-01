import {popupImage, popupSubtitle, openPopup} from './index.js';
export class Place {
  constructor(title, image) {
    this._title = title;
    this._image = image;
  }

  _getPlaceElement() {
    const placeElement = document
      .querySelector('#place-template')
      .content
      .querySelector('.place')
      .cloneNode(true);

    return placeElement;
  };

  _getLikeButton() {
    const likeButton = this._element.querySelector('.place__like-btn');
    return likeButton;
  };

  _getOpenPopupButton() {
    const OpenPopupButton = this._element.querySelector('.place__image');
    return OpenPopupButton;
  };

  _getDeletePlaceButton() {
    const DeletePlaceButton = this._element.querySelector('.place__del-btn');
    return DeletePlaceButton;
  };

  _handleLike() {
    this._getLikeButton().classList.toggle(`place__like-btn_active`);
  };

  _handleOpenPopup() {
    popupImage.src = this._getOpenPopupButton().src;
    popupImage.alt = this._getOpenPopupButton().alt;
    popupSubtitle.textContent = this._getOpenPopupButton().alt;
    openPopup(imgPopup);
  };

  _handleDeletPlace() {
    this._getDeletePlaceButton().closest('.place').remove();
  };

  _setEventListeners() {
    this._getLikeButton().addEventListener('click', () => {
      this._handleLike()
    });
    this._getOpenPopupButton().addEventListener('click', () => {
      this._handleOpenPopup()
    });
    this._getDeletePlaceButton().addEventListener('click', () => {
      this._handleDeletPlace()
    });
  };

  generatePlace() {
    this._element = this._getPlaceElement();

    this._element.querySelector('.place__image').src = this._image;
    this._element.querySelector('.place__image').alt = this._title;
    this._element.querySelector('.place__title').textContent = this._title;

    this._setEventListeners();

    return this._element;
  };
};