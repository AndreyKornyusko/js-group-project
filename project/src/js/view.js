import { card } from '../templates/cards.hbs';
import modal-card  from '../templates/modal-card.hbs';

export default class View {
  constructor() {
    this.refs = {};

    this.refs.selectedBtn = document.querySelector('.selected__button');
    this.refs.seceltedTitle = document.querySelector('.selected__title');
    this.refs.form = document.querySelector('.js-form');
    this.refs.input = document.querySelector('input[name=query]');
    this.refs.searchBtn = document.querySelector('button[data-action=search]');
    this.refs.list = document.querySelector('.list__img-card');
    this.refs.images = document.querySelectorAll('.list__img-card');
    this.refs.container = document.querySelector('#root');
    this.refs.showMoreBtn = document.querySelector('#more__btn');
  }

  createTemplate(arr) {
    const markup = arr.reduce((acc, item) => acc + card(item), '');

    this.refs.container.insertAdjacentHTML('afterbegin', markup);
  }
  clearTemplate(){
    const container = this.refs.container;
    container.innerHTML = "";
  }
  showElem(){
    const item = this.refs.showMoreBtn;
    item.classList.add('visible');
  }
  hideMoreBtn(){
    const item = this.refs.showMoreBtn;
    item.classList.remove('visible');
  }
  showSelectedTitle(){
    const item = this.refs.selectedTitle;
    item.classList.add('visible');
  }
  hideSelectedTitle(){
    const item = this.refs.selectedTitle;
    item.classList.remove('visible');
  }
  showSelected(arr){
    this.clearTemplate();
    this.createTemplate(arr);
  }
}
