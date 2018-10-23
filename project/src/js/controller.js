export default class Controller {
  constructor(view, model) {
    this._view = view;
    this._model = model;
    this._view.refs.searchBtn.addEventListener(
      'click',
      this.onClickSearch.bind(this),
    );
  }

  onClickSearch(evt) {
    const target = evt.target;
    const action =target.dataset.action;
    if (target.nodeName !== 'BUTTON' || action !== 'search') return;
    evt.preventDefault();
    const inputValue = this._view.refs.input.value.trim();
    console.log('inputValue', inputValue);
    const request = {
      query: inputValue,
      page: 1,
      // incrementPage() {
      //   this.page += 1;
    }
    this._model.getImages(request).then(data => {
      console.log('data controller', data);
      this._view.createTemplate(data);
      this._view.refs.form.reset();
    });;
  }



}
