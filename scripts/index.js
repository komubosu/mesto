import {initialCards} from './initial-сards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('#popupEditProfile');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-btn');

const buttonOpenPopupAddCard = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('#popupAddCard');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-btn');

const placeContainer = document.querySelector('.places');

export const popupCardImg = document.querySelector('#popupCardImg');
const buttonClosePopupCardImg = popupCardImg.querySelector('.popup__close-btn');

const profileName = document.querySelector('.profile__title');
const profileSub = document.querySelector('.profile__subtitle');

const formProfileEdit = document.forms.formProfileEdit;
const inputProfileName = formProfileEdit.inputProfileName;
const inputProfileSub = formProfileEdit.inputProfileSub;

const fromNewPlace = document.forms.fromNewPlace;
const inputPlaceName = fromNewPlace.inputPlaceName;
const inputPlaceLink = fromNewPlace.inputPlaceLink;

inputProfileName.value = profileName.textContent;
inputProfileSub.value = profileSub.textContent;

export const popupImage = document.querySelector('.popup__image');
export const popupSubtitle = document.querySelector('.popup__subtitle');

const fromClasses = {
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
}

const validatorFormProfileEdit = new FormValidator(fromClasses, formProfileEdit);
validatorFormProfileEdit.enableValidation();

const validatorFormNewPlace = new FormValidator(fromClasses, fromNewPlace);
validatorFormNewPlace.enableValidation();

initialCards.forEach(function(item) {
  addNewPlace(item);
})

function createNewPlace(cardInfo) {
  const place = new Card(cardInfo, '#place-template');
  const placeElement = place.generatePlace();

  return placeElement;
};

function addNewPlace(cardInfo) {
  placeContainer.prepend(createNewPlace(cardInfo));
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
};
function closePopupWithEsc(evt) {
  if (evt.key ==='Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
function closePopupEditProfile() {
  closePopup(popupEditProfile);
};
function closePopupAddCard() {
  closePopup(popupAddCard);
};
function closePopupCardImg() {
  closePopup(popupCardImg);
};

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
};
function openPopupEditProfile() {
  inputProfileName.value = profileName.textContent;
  inputProfileSub.value = profileSub.textContent;
  validatorFormProfileEdit.resetValidation();
  openPopup(popupEditProfile);
};
function openPopupAddCard() {
  fromNewPlace.reset();
  validatorFormNewPlace.resetValidation();
  openPopup(popupAddCard);
};

function saveEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileSub.textContent = inputProfileSub.value;
  closePopupEditProfile()
};
function saveAddForm(evt) {
  evt.preventDefault();
  const cardInfo = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  }

  addNewPlace(cardInfo);
  closePopupAddCard();
};

buttonClosePopupCardImg.addEventListener('click', closePopupCardImg);
popupCardImg.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopupCardImg();
  };
});

buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);
popupAddCard.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopupAddCard();
  }
});
fromNewPlace.addEventListener('submit', saveAddForm);

buttonOpenPopupEditProfile.addEventListener('click', openPopupEditProfile);
buttonClosePopupEditProfile.addEventListener('click', closePopupEditProfile);
popupEditProfile.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopupEditProfile();
  }
});
formProfileEdit.addEventListener('submit', saveEditForm);