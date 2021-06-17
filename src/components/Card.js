export default class Card {
  constructor({ handleCardClick }, {name, link}, cardSelector) {
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._title = name;
    this._image = link;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._buttonLike = this._cardElement.querySelector('.card__like-btn');
    this._buttonOpenPopup = this._cardElement.querySelector('.card__image');
    this._buttonDeleteCard = this._cardElement.querySelector('.card__del-btn');
  };

  _handleLike() {
    this._buttonLike.classList.toggle(`card__like-btn_active`);
  };

  _handleDeletCard() {
    this._buttonDeleteCard.closest('.card').remove();
  };

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });
    this._buttonOpenPopup.addEventListener('click', () => {
      this._handleCardClick(this);
    });
    this._buttonDeleteCard.addEventListener('click', () => {
      this._handleDeletCard();
    });
  };

  generateCard() {
    this._cardElement.querySelector('.card__image').src = this._image;
    this._cardElement.querySelector('.card__image').alt = this._title;
    this._cardElement.querySelector('.card__title').textContent = this._title;

    this._setEventListeners();

    return this._cardElement;
  };
};