export default class Card {
  constructor({ handleCardClick, handleDeleteCard }, {name, link, likes, owner, _id}, cardSelector) {
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._cardSelector = cardSelector;
    this._cardName = name;
    this._cardImageLink = link;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._buttonLike = this._cardElement.querySelector('.card__like-btn');
    this._likesCounters = this._cardElement.querySelector('.card__like-counter');
    this._likesArray = likes
    this._likesValue = this._likesArray.length;
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._buttonDeleteCard = this._cardElement.querySelector('.card__del-btn');
    this._ownerId = owner._id;
    this._cardOwner = owner;
    this._cardId = _id;
  };

  handleLike() {
    this._buttonLike.classList.toggle(`card__like-btn_active`);
  };

  _setEventListeners(api) {
    this._buttonLike.addEventListener('click', () => {
      (this._buttonLike.classList.contains(`card__like-btn_active`))
      ?api.handleRemoveLike(this)
      :api.handlePutLike(this)
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this);
    });
    this._buttonDeleteCard.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });
  };

  generateCard(api) {
    //api.checkCardOwner(this);
    if (this._ownerId !== 'b0346907ea0267fc899088ca') {
      this._buttonDeleteCard.remove();
    };
    if (this._likesArray.some((user) => (user._id == 'b0346907ea0267fc899088ca'))) {
      this.handleLike();
    }
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = this._cardName;
    this._cardElement.querySelector('.card__title').textContent = this._cardName;
    this._likesCounters.textContent = this._likesValue;

    this._setEventListeners(api);

    return this._cardElement;
  };
};