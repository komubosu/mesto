export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClosePopup = this._popup.querySelector('.popup__close-btn')
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    } else {
    document.addEventListener(
        'keydown',
        this._handleEscClose.bind(this),
        { once: true }
      );
    };
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      };
    });
    this._buttonClosePopup.addEventListener('click', () => {
      this.close();
    });
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this), {once: true});
  };

  close() {
    this._popup.classList.remove('popup_opened');
  };
}