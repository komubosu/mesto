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

function createCard({name, link}, cardSelector) {
  const card = new Card({
    handleCardClick: (card) => {
      popupWithImage.open(card);
    }
  }, {name, link}, cardSelector);
  return card.generateCard();
};

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
  handleSubmitForm: evt => {
    evt.preventDefault();

    userInfo.setUserInfo(popupEditProfileForm.getInputValues());

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
  handleSubmitForm: evt => {
    evt.preventDefault();

    cardList.addItem(createCard({
      name: popupCreateCardForm.getInputValues().inputCardName,
      link: popupCreateCardForm.getInputValues().inputCardLink,
    }, '#card-template' ))

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
    cardList.addItem(createCard(item, '#card-template'));
  }
}, '.cards');
cardList.renderItems();