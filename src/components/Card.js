export default class Card {
  constructor({ handleCardClick, handleDeleteCard, handleRemoveLike, handlePutLike }, cardInfo, userData, cardSelector) {
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._cardSelector = cardSelector;
    this._cardName = cardInfo.name;
    this._cardImageLink = cardInfo.link;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._buttonLike = this._cardElement.querySelector('.card__like-btn');
    this._likesCounters = this._cardElement.querySelector('.card__like-counter');
    this._likesArray = cardInfo.likes
    this._likesValue = this._likesArray.length;
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._buttonDeleteCard = this._cardElement.querySelector('.card__del-btn');
    this._cardOwner = cardInfo.owner;
    this.cardId = cardInfo._id;
    this.userId = userData._id;
    this._handleRemoveLike = handleRemoveLike;
    this._handlePutLike = handlePutLike;
  };

  handleLike() {
    this._buttonLike.classList.toggle(`card__like-btn_active`);
  };

  handleDeleteCard() {
    this._cardElement.remove()
  }

  updateLikesValue(likesValue) {
    this._likesCounters.textContent = likesValue
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      (this._buttonLike.classList.contains(`card__like-btn_active`))
      ?this._handleRemoveLike(this)
      :this._handlePutLike(this)
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this);
    });
    this._buttonDeleteCard.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });
  };

  generateCard() {
    if (this._cardOwner._id !== this.userId) {
      this._buttonDeleteCard.remove();
    };
    if (this._likesArray.some((user) => (user._id == this.userId))) {
      this.handleLike();
    }
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = this._cardName;
    this._cardElement.querySelector('.card__title').textContent = this._cardName;
    this.updateLikesValue(this._likesValue);

    this._setEventListeners();

    return this._cardElement;
  };
};