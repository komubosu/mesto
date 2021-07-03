export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards(cards, createCard) {
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        result.forEach(item => {
          cards.addItemAppend(createCard(item, '#card-template'));
        }
      )})
      .catch((err) => {
        console.log(err);
      })
  }

  uploadNewCard(popup, cards, createCard, button) {
    fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: popup.getInputValues().inputCardName,
        link: popup.getInputValues().inputCardLink,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {cards.addItemPrepend(createCard(result, '#card-template' ))})
      .then(() => popup.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => button.textContent = 'Сохранить')
  }

  deleteCard(card, popup) {
    fetch(`${this._baseUrl}/cards/${card._cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => card._cardElement.remove())
      .then(() => popup.close())
      .catch((err) => {
        console.log(err);
      })
  }

  getUserInfo(userInfo) {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {userInfo.setUserInfo(result)})
      .catch((err) => {
        console.log(err);
      })
  }

  setNewAvatar(popup, button, userInfo) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(popup.getInputValues())
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {userInfo.setUserInfo(result)})
      .then(() => popup.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => button.textContent = 'Сохранить')
  }

  setNewUserInfo(popup, button, userInfo) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(popup.getInputValues())
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {userInfo.setUserInfo(result)})
      .then(() => popup.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => button.textContent = 'Сохранить')
  }

  handlePutLike(card) {
    fetch(`${this._baseUrl}/cards/likes/${card._cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {card._likesCounters.textContent = result.likes.length})
      .then(() => card.handleLike())
      .catch((err) => {
        console.log(err);
      })
  };

  handleRemoveLike(card) {
    fetch(`${this._baseUrl}/cards/likes/${card._cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {card._likesCounters.textContent = result.likes.length})
      .then(() => card.handleLike())
      .catch((err) => {
        console.log(err);
      })
  };

  /*checkCardOwner(card) {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        if (result._id !== card._ownerId) {
          card._buttonDeleteCard.remove();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }*/
}