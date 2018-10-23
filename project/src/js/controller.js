export default class Controller {
  constructor(view, model) {
    this._view = view;
    this._model = model;
    this.request = {
      page: 1,
      query: '',
      resetPage() {
        this.page = 1;
      },
      incrementPage() {
        this.page += 1;
      },
    };
    this._view.refs.searchBtn.addEventListener(
      'click',
      this.onClickSearch.bind(this),
    );
    this._view.refs.ShowMoreBtn.addEventListener(
      'click',
      this.onClickShowMore.bind(this),
    );
  }

  onClickSearch(evt) {
    const target = evt.target;
    const action = target.dataset.action;
    if (target.nodeName !== 'BUTTON' || action !== 'search') return;
    evt.preventDefault();
    const inputValue = this._view.refs.input.value.trim();
    this.request.query = inputValue;

    this._model.getImages(this.request).then(data => {
      console.log('data controller', data);
      this._view.createTemplate(data);
      this._view.refs.form.reset();
      this._view.refs.ShowMoreBtn.classList.add('visible');
    });
  }

  onClickShowMore(evt) {
    const target = evt.target;
    const action = target.dataset.action;
    if (target.nodeName !== 'BUTTON' || action !== 'show') return;
    evt.preventDefault();
    this.request.incrementPage();
    this._model.getImages(this.request).then(data => {
      console.log('data controller', data);
      this._view.createTemplate(data);
      this._view.refs.form.reset();
    });
  }
}
