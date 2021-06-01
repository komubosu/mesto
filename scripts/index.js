import {initialCards} from './initial-сards.js';
import {Place} from './Place.js';
import {FormValidator} from './FormValidator.js';

const openEditPopupButton = document.querySelector('.profile__edit-btn');
const editPopup = document.querySelector('#editPopup');
const closeEditPopupButton = editPopup.querySelector('.popup__close-btn');
const submitEditPopupButton = editPopup.querySelector('.form__submit-btn');

const openAddPopupButton = document.querySelector('.profile__add-btn');
const addPopup = document.querySelector('#addPopup');
const closeAddPopupButton = addPopup.querySelector('.popup__close-btn');
const submitAddPopupButton = addPopup.querySelector('.form__submit-btn');

const placeContainer = document.querySelector('.places');

const imgPopup = document.querySelector('#imgPopup');
const closeImgPopupButton = imgPopup.querySelector('.popup__close-btn');

const profileName = document.querySelector('.profile__title');
const profileSub = document.querySelector('.profile__subtitle');

const profileEdit = document.forms.profileEdit;
const inputProfileName = profileEdit.inputProfileName;
const inputProfileSub = profileEdit.inputProfileSub;

const addNewPlace = document.forms.addNewPlace;
const inputPlaceName = addNewPlace.inputPlaceName;
const inputPlaceLink = addNewPlace.inputPlaceLink;

inputProfileName.value = profileName.textContent;
inputProfileSub.value = profileSub.textContent;

export const popupImage = document.querySelector('.popup__image');
export const popupSubtitle = document.querySelector('.popup__subtitle');

const classes = {
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
}

function enableValidation(classes) {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(function(formElement) {
    const form = new FormValidator(classes, formElement);
    form.enableValidation();
  });
};

enableValidation(classes);

initialCards.forEach(function(item) {
  addPlace(item.name, item.link);
})

function createNewPlace(title, image) {
  const place = new Place(title, image);
  const placeElement = place.generatePlace();

  return placeElement;
};

function addPlace(title, image) {
  placeContainer.prepend(createNewPlace(title, image));
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__text_type_error');
  errorElement.classList.remove('form__text-error_active');
  errorElement.textContent = '';
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
};
function closePopupWithEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key ==='Escape') {
    closePopup(openedPopup);
  };
};
function closeEditPopup() {
  closePopup(editPopup);
  hideInputError(profileEdit, inputProfileName);
  hideInputError(profileEdit, inputProfileSub);
  submitEditPopupButton.classList.remove('form__submit-btn_disabled');
  submitEditPopupButton.disabled = false;
};
function closeAddPopup() {
  closePopup(addPopup);
  addNewPlace.reset();
  hideInputError(addNewPlace, inputPlaceName);
  hideInputError(addNewPlace, inputPlaceLink);
  submitAddPopupButton.classList.add('form__submit-btn_disabled');
  submitAddPopupButton.disabled = true;
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

  addPlace(inputPlaceName.value, inputPlaceLink.value);
  closeAddPopup();
};

closeImgPopupButton.addEventListener('click', closeImgPopup);
imgPopup.addEventListener('mousedown', (evt) => {
  if (evt.target.id === 'imgPopup') {
    closeImgPopup();
  };
});

openAddPopupButton.addEventListener('click', openAddPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
addPopup.addEventListener('mousedown', (evt) => {
  if (evt.target.id === 'addPopup') {
    closeAddPopup();
  }
});
addNewPlace.addEventListener('submit', saveAddForm);

openEditPopupButton.addEventListener('click', openEditPopup);
closeEditPopupButton.addEventListener('click', closeEditPopup);
editPopup.addEventListener('mousedown', (evt) => {
  if (evt.target.id === 'editPopup') {
    closeEditPopup();
  }
});
profileEdit.addEventListener('submit', saveEditForm);