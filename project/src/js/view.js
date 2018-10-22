import card from '../templates/cards.hbs';

export default class View {
  constructor() {
    this.refs = {};
        this.refs.selectedBtn = document.querySelector('.js-selected-btn');
        this.refs.form = document.querySelector('.js-form');
        this.refs.input = document.querySelector("input[name=query]");
        this.refs.searchBtn = document.querySelector("button[data-action=search]");
        this.refs.list = document.querySelector('.img-list');
        this.refs.images = document.querySelectorAll('.img-card')
        this.refs.source = document.querySelector('#js_markup').innerHTML.trim();
        this.refs.template = Handlebars.compile(this.refs.source);

  }
  createList(items) {
    const markup = items.reduce( (acc, el) => acc + this.refs.template( {
      id: el.id,
      image: el.src,
      description: el.description
    }), "" );
    this.refs.list.insertAdjacentHTML(
      "afterbegin",
      markup
    );
  }

}
