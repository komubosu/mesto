export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItemPrepend(element) {
    this._container.prepend(element);
  };

  addItemAppend(element) {
    this._container.append(element);
  };

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  };
};