import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  fromClasses,
  buttonOpenPopupEditProfile,
  buttonOpenPopupEditProfileAvatar,
  buttonOpenPopupCreateCard,
  formProfileEdit,
  buttonSubmitFormProfileEdit,
  formProfileAvatarEdit,
  buttonSubmitFormProfileAvatarEdit,
  fromNewCard,
  buttonSubmitFromNewCard,
  userId,
  userToken,
} from '../utils/constants.js';


function createCard(cardInfo, userData, cardSelector) {
  const card = new Card({
    handleCardClick: (card) => {
      popupWithImage.open(card);
    },
    handleDeleteCard: (card) => {
      popupDeleteCard.updateHandleSubmitForm({
        handleSubmitForm: (evt) => {
          evt.preventDefault();
          api.deleteCard(card)
            .then(() => {
              card.handleDeleteCard()
              popupDeleteCard.close()
            })
            .catch(err => console.log(err))
        }
      })
      popupDeleteCard.open();
    },
    handleRemoveLike: () => {
      api.handleRemoveLike(card)
        .then(result => {
          card.updateLikesValue(result.likes.length)
          card.handleLike()
        })
        .catch(err => console.log(err))
    },
    handlePutLike: () => {
    api.handlePutLike(card)
      .then(result => {
        card.updateLikesValue(result.likes.length)
        card.handleLike()
      })
      .catch(err => console.log(err))
    },
  }, cardInfo, userData, cardSelector);
  return card.generateCard();
};


const validatorEditProfileForm = new FormValidator(fromClasses, formProfileEdit);
validatorEditProfileForm.enableValidation();


const validatorEditProfileAvatarForm = new FormValidator(fromClasses, formProfileAvatarEdit);
validatorEditProfileAvatarForm.enableValidation();


const validatorCreateCardForm = new FormValidator(fromClasses, fromNewCard);
validatorCreateCardForm.enableValidation();


const popupWithImage = new PopupWithImage('#popupCardImg');
popupWithImage.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__pic',
  userId: userId,
  userToken: userToken,
});


const cards = new Section({}, '.cards');


const popupEditProfileForm = new PopupWithForm({
  handleSubmitForm: evt => {
    evt.preventDefault();
    buttonSubmitFormProfileEdit.textContent = 'Сохранение...';
    api.setNewUserInfo(popupEditProfileForm)
      .then(result => {userInfo.setUserInfo(result)})
      .then(() => popupEditProfileForm.close())
      .catch(err => console.log(err))
      .finally(() => buttonSubmitFormProfileEdit.textContent = 'Сохранить')
  }
}, '#popupEditProfile');
popupEditProfileForm.setEventListeners();
buttonOpenPopupEditProfile.addEventListener('click', () => {
  popupEditProfileForm.setInputValues(userInfo.getUserInfo());
  validatorEditProfileForm.resetValidation();
  popupEditProfileForm.open();
});


const popupEditProfileAvatarForm = new PopupWithForm({
  handleSubmitForm: evt => {
    evt.preventDefault();
    buttonSubmitFormProfileAvatarEdit.textContent = 'Сохранение...';
    api.setNewAvatar(popupEditProfileAvatarForm)
      .then(result => {userInfo.setUserInfo(result)})
      .then(() => popupEditProfileAvatarForm.close())
      .catch(err => console.log(err))
      .finally(() => buttonSubmitFormProfileAvatarEdit.textContent = 'Сохранить')
  }
}, '#popupEditProfileAvatar');
popupEditProfileAvatarForm.setEventListeners();
buttonOpenPopupEditProfileAvatar.addEventListener('click', () => {
  validatorEditProfileAvatarForm.resetValidation();
  popupEditProfileAvatarForm.open();
});


const popupCreateCardForm = new PopupWithForm({
  handleSubmitForm: evt => {
    evt.preventDefault();

    buttonSubmitFromNewCard.textContent = 'Сохранение...';
    api.uploadNewCard(popupCreateCardForm)
      .then(result => {cards.addItemPrepend(createCard(result, result.owner, '#card-template' ))})
      .then(() => popupCreateCardForm.close())
      .catch(err => console.log(err))
      .finally(() => buttonSubmitFromNewCard.textContent = 'Сохранить')
  }
}, '#popupCreateCard');
popupCreateCardForm.setEventListeners();
buttonOpenPopupCreateCard.addEventListener('click', () => {
  validatorCreateCardForm.resetValidation();
  popupCreateCardForm.open();
});


const popupDeleteCard = new PopupWithForm({}, '#popupDeleteCard');
popupDeleteCard.setEventListeners();


const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${userId}`,
  headers: {
    authorization: `${userToken}`,
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([ userData, initialCards ]) => {
    userInfo.setUserInfo(userData);
    console.log(initialCards);
    initialCards.forEach(cardInfo => cards.addItemAppend(createCard(cardInfo, userData, '#card-template')));
  })
  .catch(err => console.log(err));