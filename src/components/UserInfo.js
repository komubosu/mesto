export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  };

  getUserInfo() {
    this._userInfo = {
      inputProfileName: this._name.textContent,
      inputProfileSub: this._about.textContent,
    };
    return this._userInfo;
  };

  setUserInfo({ inputProfileName, inputProfileSub }) {
    this._name.textContent = inputProfileName;
    this._about.textContent = inputProfileSub;
  };
}