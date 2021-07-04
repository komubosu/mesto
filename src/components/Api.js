export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(res => this._checkAnswer(res))
  }

  uploadNewCard(popup) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: popup.getInputValues().inputCardName,
        link: popup.getInputValues().inputCardLink,
      })
    }).then(res => this._checkAnswer(res))
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card.cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkAnswer(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(res => this._checkAnswer(res))
  }

  setNewAvatar(form) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(form.getInputValues())
    }).then(res => this._checkAnswer(res))
  }

  setNewUserInfo(form) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(form.getInputValues())
    }).then(res => this._checkAnswer(res))
  }

  handlePutLike(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card.cardId}`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => this._checkAnswer(res))
  };

  handleRemoveLike(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card.cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkAnswer(res))
  };
}