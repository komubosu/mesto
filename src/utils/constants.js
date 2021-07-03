export const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-btn');
export const buttonOpenPopupEditProfileAvatar = document.querySelector('.profile__edit-avatar-btn');
export const buttonOpenPopupCreateCard = document.querySelector('.profile__add-btn');
export const formProfileEdit = document.forms.formProfileEdit;
export const buttonSubmitFormProfileEdit = formProfileEdit.saveFormButton
export const formProfileAvatarEdit = document.forms.formProfileAvatarEdit;
export const buttonSubmitFormProfileAvatarEdit = formProfileAvatarEdit.saveFormButton
export const fromNewCard = document.forms.fromNewCard;
export const buttonSubmitFromNewCard = fromNewCard.saveFormButton

//было бы круто в будущем реализовать ввод своих данных при входе на сайт в уже открытый попап
export const userToken = 'b8ea5ec6-acae-49b3-8816-991c5350bb3b';
export const userId = 'cohort-25';

export const fromClasses = {
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
}