import {initialCards} from './initial-сards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const buttonOpenEditPopup = document.querySelector('.profile__edit-btn');
const editPopup = document.querySelector('#editPopup');
const buttonCloseEditPopup = editPopup.querySelector('.popup__close-btn');
const buttonSubmitEditPopup = editPopup.querySelector('.form__submit-btn');

const buttonOpenAddPopup = document.querySelector('.profile__add-btn');
const addPopup = document.querySelector('#addPopup');
const buttonCloseAddPopup = addPopup.querySelector('.popup__close-btn');
const buttonSubmitAddPopup = addPopup.querySelector('.form__submit-btn');

const placeContainer = document.querySelector('.places');

const imgPopup = document.querySelector('#imgPopup');
const buttonCloseImgPopup = imgPopup.querySelector('.popup__close-btn');

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
function closeEditPopup() {
  closePopup(editPopup);
  validatorFormProfileEdit.resetValidation();
};
function closeAddPopup() {
  closePopup(addPopup);
  fromNewPlace.reset();
  validatorFormNewPlace.resetValidation();
};
function closeImgPopup() {
  closePopup(imgPopup);
};

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
};
function openEditPopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileSub.value = profileSub.textContent;
  openPopup(editPopup);
};
function openAddPopup() {
  openPopup(addPopup);
};

function saveEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileSub.textContent = inputProfileSub.value;
  closeEditPopup()
};
function saveAddForm(evt) {
  evt.preventDefault();
  const cardInfo = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  }

  addNewPlace(cardInfo);
  closeAddPopup();
};

buttonCloseImgPopup.addEventListener('click', closeImgPopup);
imgPopup.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closeImgPopup();
  };
});

buttonOpenAddPopup.addEventListener('click', openAddPopup);
buttonCloseAddPopup.addEventListener('click', closeAddPopup);
addPopup.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closeAddPopup();
  }
});
fromNewPlace.addEventListener('submit', saveAddForm);

buttonOpenEditPopup.addEventListener('click', openEditPopup);
buttonCloseEditPopup.addEventListener('click', closeEditPopup);
editPopup.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closeEditPopup();
  }
});
formProfileEdit.addEventListener('submit', saveEditForm);