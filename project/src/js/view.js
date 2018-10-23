import card from '../templates/cards.hbs';

export default class View {
  constructor() {
    this.refs = {};

    this.refs.selectedBtn = document.querySelector('.selected-btn');
    this.refs.form = document.querySelector('.js-form');
    this.refs.input = document.querySelector('input[name=query]');
    this.refs.searchBtn = document.querySelector('button[data-action=search]');
    this.refs.list = document.querySelector('.list__img-card');
    this.refs.images = document.querySelectorAll('.list__img-card');
    this.refs.container = document.querySelector('#root');
  }

  createTemplate(arr) {
    const markup = arr.reduce((acc, item) => acc + card(item), '');

    this.refs.container.insertAdjacentHTML('afterbegin', markup);
  }
}
