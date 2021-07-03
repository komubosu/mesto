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


function createCard({name, link, likes, owner, _id}, cardSelector) {
  const card = new Card({
    handleCardClick: (card) => {
      popupWithImage.open(card);
    },
    handleDeleteCard: (card) => {
      popupDeleteCard.updateHandleSubmitForm({
        handleSubmitForm: (evt) => {
          evt.preventDefault();
          api.deleteCard(card, popupDeleteCard);
        }
      })
      popupDeleteCard.open();
    }
  }, {name, link, likes, owner, _id}, cardSelector);
  return card.generateCard(api);
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
    api.setNewUserInfo(popupEditProfileForm, buttonSubmitFormProfileEdit, userInfo);
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
    api.setNewAvatar(popupEditProfileAvatarForm, buttonSubmitFormProfileAvatarEdit, userInfo);
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
    api.uploadNewCard(popupCreateCardForm, cards, createCard, buttonSubmitFromNewCard);
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
api.getInitialCards(cards, createCard );
api.getUserInfo(userInfo);