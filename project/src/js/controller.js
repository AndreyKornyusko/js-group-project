export default class Controller {
  constructor(view, model) {
    this._view = view;
    this._model = model;

    this._view.refs.addBtn.addEventListener(
      'click',
      this.onClickAdd.bind(this),
    );
    this._view.refs.delBtn.addEventListener(
      'click',
      this.onClickDel.bind(this),
    );
    this.createTemplateFromLocalStorage();
  }

  createTemplateFromLocalStorage() {
    this._model.getLocalStorage();
    this._view.createTemplateFromLs(this._model._items);
  }

  onClickDel(evt) {
    const target = evt.target;
    const nodeName = target.nodeName;
    const action = target.dataset.action;

    if (nodeName !== 'BUTTON' || action !== 'delete') return;

    const parent = evt.target.closest('.link-card');

    const id = Number(evt.target.parentNode.dataset.id);
    const updatedLinksList = this._model._items.filter(val => val.id !== id);
    this._model._items = updatedLinksList;
    this._model.setLocalStorage();
    parent.remove();
  }

  onClickAdd(evt) {
    const target = evt.target;
    const action = target.dataset.action;
    if (target.nodeName !== 'BUTTON' || action !== 'add') return;
    evt.preventDefault();

    const inputLinkValue = this._view.refs.inputLink.value.trim();

    if (!this.isEnteredUrlValid(inputLinkValue)) {
      this._view.refs.form.reset();
      return;
    }

    this._model.addData(inputLinkValue).then(data => {
      console.log('data', data);
      this._view.createTemplate(data);
      this._model.setLocalStorage();
      this._view.refs.form.reset();
    });
  }

  isEnteredUrlValid(inputLinkValue) {
    const isUrlValid = /^((https?|ftp)\:\/\/)/.test(inputLinkValue);
    const isValid = val => val.link === inputLinkValue;
    const isLinkValid = this._model._items.some(isValid);

    if (!isUrlValid) {
      alert('Your URL is not valid');
      return false;
    }
    if (isLinkValid) {
      alert('Such a bookmark already exists');
      return false;
    }

    return true;
  }
}
