const openPopupButton = document.querySelector('.profile__edit-btn');
const closePopupButton = document.querySelector('.form__close-btn');
const saveFormButton = document.querySelector('.form__submit-btn')
const popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__title');
let profileSub = document.querySelector('.profile__subtitle');

let inputProfileName = document.querySelector('.input__profilename');
let inputProfileSub = document.querySelector('.input__profilesub');

function openPopup () {
  inputProfileName.value = profileName.textContent;
  inputProfileSub.value = profileSub.textContent;
  
  popup.classList.add('popup_opened');
};

function closePopup () {
  popup.classList.remove('popup_opened');
};

function saveForm () {
  profileName.textContent = inputProfileName.value;
  profileSub.textContent = inputProfileSub.value;

  popup.classList.remove('popup_opened');
};

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

saveFormButton.addEventListener('click', saveForm);