import card from '../templates/cards.hbs';
import mcard from '../templates/mcard.hbs';

export default class View {
  constructor() {
    this.refs = {};

    this.refs.page = document.querySelector('.page');
    this.refs.selectedBtn = document.querySelector('.selected-btn');
    this.refs.form = document.querySelector('.js-form');
    this.refs.input = document.querySelector('input[name=query]');
    this.refs.searchBtn = document.querySelector('button[data-action=search]');
    this.refs.ShowMoreBtn = document.querySelector('button[data-action=show]');
    this.refs.list = document.querySelector('.list__img-card');
    this.refs.images = document.querySelectorAll('.list__img-card');
    this.refs.container = document.querySelector('#root');
    this.refs.sliderContainer = document.querySelector('#slider');
    this.refs.slider = document.querySelector('.slider');
    this.refs.prew = document.querySelector('.prew');
    this.refs.next = document.querySelector('.next');
    this.refs.slides = document.querySelectorAll('.slider__list-item');
  }

  createTemplate(arr) {
    const markup = arr.reduce((acc, item) => acc + card(item), '');

    this.refs.container.insertAdjacentHTML('beforeend', markup);
  }

  createSliderTemplate(arr) {
    const markup = arr.reduce((acc, item) => acc + mcard(item), '');

    this.refs.sliderContainer.insertAdjacentHTML('beforeend', markup);
  }
}
