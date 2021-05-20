const placeTemplate = document.querySelector('#place-template').content;

const openEditPopupButton = document.querySelector('.profile__edit-btn');
const editPopup = document.querySelector('#editPopup');
const closeEditPopupButton = editPopup.querySelector('.popup__close-btn');
const submitEditPopupButton = editPopup.querySelector('.form__submit-btn');

const openAddPopupButton = document.querySelector('.profile__add-btn');
const addPopup = document.querySelector('#addPopup');
const closeAddPopupButton = addPopup.querySelector('.popup__close-btn');
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

const popupImage = document.querySelector('.popup__image');
const popupSubtitle = document.querySelector('.popup__subtitle');

initialCards.forEach(addPlace);

function addPlace(item) {
  placeContainer.prepend(createNewPlace(item));
};

function createNewPlace(item) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__image').src = item.link;
  placeElement.querySelector('.place__image').alt = item.name;
  placeElement.querySelector('.place__title').textContent = item.name;

  addEventForPlace(placeElement)

  return placeElement;
};

function addEventForPlace(placeElement) {
  placeElement.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('place__like-btn')) {
      putLike(evt, 'place')
    };

    if (evt.target.classList.contains('place__image')) {
      openImgPopup(evt);
    };

    if (evt.target.classList.contains('place__del-btn')) {
      deleteCard(evt);
    };
});
};

function putLike(evt, element) {
  evt.target.classList.toggle(`${element}__like-btn_active`);
}

function deleteCard(evt) {
  const currentCardIndex = Array.prototype.indexOf.call(evt.currentTarget.children, evt.target.parentNode);
  initialCards.splice((initialCards.length - 1 - currentCardIndex), 1);
  evt.target.parentNode.remove();
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
  hideInputError(profileEdit, inputProfileName, classes);
  hideInputError(profileEdit, inputProfileSub, classes);
  submitEditPopupButton.classList.remove(`${classes.inactiveButtonClass}`);
  submitEditPopupButton.disabled = false;
};
function closeAddPopup() {
  closePopup(addPopup);
  addNewPlace.reset();
  hideInputError(addNewPlace, inputPlaceName, classes);
  hideInputError(addNewPlace, inputPlaceLink, classes);
};
function closeImgPopup() {
  closePopup(imgPopup);
};

function openPopup(popup) {
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
function openImgPopup(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupSubtitle.textContent = evt.target.alt;
  openPopup(imgPopup);
};

function saveEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileSub.textContent = inputProfileSub.value;
  closeEditPopup()
};
function saveAddForm(evt) {
  evt.preventDefault();

  initialCards.push({name:`${inputPlaceName.value}`, link:`${inputPlaceLink.value}`});

  addPlace(initialCards[initialCards.length - 1]);
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