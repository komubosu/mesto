const openEditPopupButton = document.querySelector('.profile__edit-btn');
const editPopup = document.querySelector('#editPopup');
const closeEditPopupButton = editPopup.querySelector('.popup__close-btn');

const openAddPopupButton = document.querySelector('.profile__add-btn');
const addPopup = document.querySelector('#addPopup');
const closeAddPopupButton = addPopup.querySelector('.popup__close-btn');
const placeContainer = document.querySelector('.places');

const imgPopup = document.querySelector('#imgPopup');
const closeImgPopupButton = imgPopup.querySelector('.popup__close-btn');

let profileName = document.querySelector('.profile__title');
let profileSub = document.querySelector('.profile__subtitle');

const profileEdit = document.profileEdit;
let inputProfileName = profileEdit.inputProfileName;
let inputProfileSub = profileEdit.inputProfileSub;

const addNewPlace = document.addNewPlace;
const inputPlaceName = addNewPlace.inputPlaceName;
const inputPlaceLink = addNewPlace.inputPlaceLink;

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
  placeContainer.prepend(createNewCard(item));
  findLikeButton();
  findDeleteButton();
  findImgButton(item);
};

function createNewCard(item) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__image').src = item.link;
  placeElement.querySelector('.place__image').alt = item.name;
  placeElement.querySelector('.place__title').textContent = item.name;

  return placeElement;
};

function findImgButton(item) {
  const OpenimgButton = document.querySelector('.place__image');
  OpenimgButton.addEventListener('click', function() {
    document.querySelector('.popup__image').src = item.link;
    document.querySelector('.popup__image').alt = item.name;
    document.querySelector('.popup__subtitle').textContent = item.name;
    imgPopup.classList.add('popup_opened');
  });
};

function findLikeButton() {
  const likeButton = document.querySelector('.place__like-btn');
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('place__like-btn_active');
  });
};

function findDeleteButton() {
  const deleteButton = document.querySelector('.place__del-btn');
  deleteButton.addEventListener('click', function() {
    const listItem = deleteButton.closest('.place');
    listItem.remove();
  });
};

function closePopup(popup) {
  popup.classList.remove('popup_opened')
};

function closeEditPopup() {
  closePopup(editPopup);
};

function closeAddPopup() {
  closePopup(addPopup);
};

function closeImgPopup() {
  closePopup(imgPopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function openAddPopup() {
  openPopup(addPopup);
};

function openEditPopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileSub.value = profileSub.textContent;
  
  openPopup(editPopup);
};

function saveEditForm(e) {
  e.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileSub.textContent = inputProfileSub.value;

  closeEditPopup()
};

function saveAddForm(e) {
  e.preventDefault();

  initialCards.push({name:`${inputPlaceName.value}`, link:`${inputPlaceLink.value}`});
  inputPlaceName.value = '';
  inputPlaceLink.value = '';

  addPlace(initialCards[initialCards.length - 1]);
  closeAddPopup();
};

closeImgPopupButton.addEventListener('click', closeImgPopup);

openAddPopupButton.addEventListener('click', openAddPopup);

closeAddPopupButton.addEventListener('click', closeAddPopup);

addNewPlace.addEventListener('submit', saveAddForm);

openEditPopupButton.addEventListener('click', openEditPopup);

closeEditPopupButton.addEventListener('click', closeEditPopup);

profileEdit.addEventListener('submit', saveEditForm);