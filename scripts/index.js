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

const profileEdit = document.profileEdit;
const inputProfileName = profileEdit.inputProfileName;
const inputProfileSub = profileEdit.inputProfileSub;

const addNewPlace = document.addNewPlace;
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
  placeContainer.prepend(createNewCard(item));
};

function createNewCard(item) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  const likeButton = placeElement.querySelector('.place__like-btn');
  const deleteButton = placeElement.querySelector('.place__del-btn');
  const OpenimgButton = placeElement.querySelector('.place__image');
  
  placeElement.querySelector('.place__image').src = item.link;
  placeElement.querySelector('.place__image').alt = item.name;
  placeElement.querySelector('.place__title').textContent = item.name;
  
  findLikeButton(likeButton);
  findDeleteButton(deleteButton, placeElement);
  findImgButton(item, OpenimgButton);

  return placeElement;
};

function findImgButton(item, OpenimgButton) {
  OpenimgButton.addEventListener('click', function() {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupSubtitle.textContent = item.name;
    openPopup(imgPopup); 
  });
};

function findLikeButton(likeButton) {
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('place__like-btn_active');
  });
};

function findDeleteButton(deleteButton, placeElement) {
  deleteButton.addEventListener('click', function() {
    placeElement.remove();
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