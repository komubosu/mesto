const openEditPopupButton = document.querySelector('.profile__edit-btn');
const editPopup = document.querySelector('#editPopup');
const closeEditPopupButton = editPopup.querySelector('.popup__close-btn');

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

const popupImage = document.querySelector('.popup__image');
const popupSubtitle = document.querySelector('.popup__subtitle');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(addPlace);

function addPlace(item) {
  placeContainer.prepend(createNewPlace(item));
};

function createNewPlace(item) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  
  placeElement.querySelector('.place__image').src = item.link;
  placeElement.querySelector('.place__image').alt = item.name;
  placeElement.querySelector('.place__title').textContent = item.name;

  return placeElement;
};

placeContainer.addEventListener('click', function(evt) {
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

function putLike(evt, element) {
  evt.target.classList.toggle(`${element}__like-btn_active`);
}

function deleteCard(evt) {
  const currentCardIndex = Array.prototype.indexOf.call(evt.currentTarget.children, evt.target.parentNode);
  initialCards.splice((initialCards.length - 1 - currentCardIndex), 1);
  evt.target.parentNode.remove();
};

function closePopup(popup) {
  popup.classList.remove('popup_opened')
};
function closeEditPopup() {
  closePopup(editPopup);
};
function closeEditPopupWithEsc(evt) {
  if (evt.keyCode === 27) {
    closeEditPopup();
  }
  document.removeEventListener('keydown', closeEditPopupWithEsc);
};
function closeAddPopup() {
  closePopup(addPopup);
  addNewPlace.reset();
};
function closeAddPopupWithEsc(evt) {
  if (evt.keyCode === 27) {
    closeAddPopup();
  }
  document.removeEventListener('keydown', closeAddPopupWithEsc);
};
function closeImgPopup() {
  closePopup(imgPopup);
};
function closeImgPopupWithEsc(evt) {
  if (evt.keyCode === 27) {
    closeImgPopup();
  }
  document.removeEventListener('keydown', closeImgPopupWithEsc);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};
function openEditPopup() {
  document.addEventListener('keydown', closeEditPopupWithEsc);
  inputProfileName.value = profileName.textContent;
  inputProfileSub.value = profileSub.textContent;
  openPopup(editPopup);
};
function openAddPopup() {
  document.addEventListener('keydown', closeAddPopupWithEsc);
  openPopup(addPopup);
};
function openImgPopup(evt) {
  document.addEventListener('keydown', closeImgPopupWithEsc);
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
  addNewPlace.reset();

  addPlace(initialCards[initialCards.length - 1]);
  closeAddPopup();
};

closeImgPopupButton.addEventListener('click', closeImgPopup);
imgPopup.addEventListener('click', (evt) => {
  if (evt.target.id === 'imgPopup') {
    closeImgPopup();
  };
});

openAddPopupButton.addEventListener('click', openAddPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
addPopup.addEventListener('click', (evt) => {
  if (evt.target.id === 'addPopup') {
    closeAddPopup();
  }
});
addNewPlace.addEventListener('submit', saveAddForm);

openEditPopupButton.addEventListener('click', openEditPopup);
closeEditPopupButton.addEventListener('click', closeEditPopup);
editPopup.addEventListener('click', (evt) => {
  if (evt.target.id === 'editPopup') {
    closeEditPopup();
  }
});
profileEdit.addEventListener('submit', saveEditForm);