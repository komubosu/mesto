export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector, userToken, userId }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector)
    this._userToken = userToken;
    this._userId = userId;
  };

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return this._userInfo;
  };

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  };
}