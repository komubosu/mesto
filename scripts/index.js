const openPopupButton = document.querySelector('.profile__edit-btn');
const closePopupButton = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__title');
let profileSub = document.querySelector('.profile__subtitle');

let profileEdit = document.profileEdit;
let inputProfileName = profileEdit.inputProfileName;
let inputProfileSub = profileEdit.inputProfileSub;

function openPopup () {
  inputProfileName.value = profileName.textContent;
  inputProfileSub.value = profileSub.textContent;
  
  popup.classList.add('popup_opened');
};

function closePopup () {
  popup.classList.remove('popup_opened');
};

function saveForm (e) {
  e.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileSub.textContent = inputProfileSub.value;

  popup.classList.remove('popup_opened');
};

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

profileEdit.addEventListener('submit', saveForm, true);