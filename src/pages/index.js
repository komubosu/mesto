import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import {
  initialCards,
  fromClasses,
  buttonOpenPopupEditProfile,
  buttonOpenPopupCreateCard,
  formProfileEdit,
  fromNewCard,
} from '../utils/constants.js';

const validatorEditProfileForm = new FormValidator(fromClasses, formProfileEdit);
validatorEditProfileForm.enableValidation();

const validatorCreateCardForm = new FormValidator(fromClasses, fromNewCard);
validatorCreateCardForm.enableValidation();

const popupWithImage = new PopupWithImage('#popupCardImg');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
});

const popupEditProfileForm = new PopupWithForm({
  submitForm: evt => {
    evt.preventDefault();
    userInfo.setUserInfo(popupEditProfileForm._getInputValues());

    popupEditProfileForm.close();
  }
}, '#popupEditProfile');
popupEditProfileForm.setEventListeners();
buttonOpenPopupEditProfile.addEventListener('click', () => {
  popupEditProfileForm.setInputValues(userInfo.getUserInfo());
  validatorEditProfileForm.resetValidation();
  popupEditProfileForm.open();
});

const popupCreateCardForm = new PopupWithForm({
  submitForm: evt => {
    evt.preventDefault();

    const createCard = new Section({
      items: [popupCreateCardForm._getInputValues()],
      renderer: item => {
        const card = new Card({
          handleCardClick: (card) => {
            popupWithImage.open(card);
          }
        }, {name: item[0], link: item[1]}, '#card-template');
        createCard.addItem(card.generateCard());
      }
    }, '.cards');
    createCard.renderItems();

    popupCreateCardForm.close();
  }
}, '#popupCreateCard');
popupCreateCardForm.setEventListeners();
buttonOpenPopupCreateCard.addEventListener('click', () => {
  validatorCreateCardForm.resetValidation();
  popupCreateCardForm.open();
});

const cardList = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card({
      handleCardClick: (card) => {
        popupWithImage.open(card);
      }
    }, item, '#card-template');
    cardList.addItem(card.generateCard());
  }
}, '.cards');
cardList.renderItems();