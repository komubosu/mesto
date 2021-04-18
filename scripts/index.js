const openPopupButton = document.querySelector('.profile__edit-btn');
const closePopupButton = document.querySelector('.form__close-btn');
const savePopupButton = document.querySelector('.form__submit-btn')
const popup = document.querySelector('.popup');

const likeButton = document.querySelectorAll('.place__like-btn');

let profileName = document.querySelector('.profile__title');
let profileSub = document.querySelector('.profile__subtitle');

let inputProfileName = document.querySelector('.input__profilename');
let inputProfileSub = document.querySelector('.input__profilesub');

inputProfileName.value = profileName.innerText;
inputProfileSub.value = profileSub.innerText;

openPopupButton.addEventListener('click', function () {
  inputProfileName.value = profileName.innerText;
  inputProfileSub.value = profileSub.innerText;

  popup.classList.toggle('popup_opened');
});

closePopupButton.addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
});

savePopupButton.addEventListener('click', function() {
  profileName.innerText = inputProfileName.value;
  profileSub.innerText = inputProfileSub.value;

  popup.classList.toggle('popup_opened');
});

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
  profileName.innerText = inputProfileName.value;
  profileSub.innerText = inputProfileSub.value;

  popup.classList.remove('popup_opened');}
});

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', function() {
    likeButton[i].classList.toggle('place__like-btn_active');
  });
}