import card from '../templates/cards.hbs';
import mcard from '../templates/mcard.hbs';

export default class View {
  constructor() {
    this.refs = {};

    this.refs.page = document.querySelector('.page');
    this.refs.selectedBtn = document.querySelector('.selected');
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
    this.refs.select = document.querySelector('.slider__star');
    this.refs.delSlider = document.querySelector('.slider__del');
    this.refs.backdrop = document.querySelector('.backdrop');
    this.refs.listWrap = document.querySelector('.relative-wrap');
  }

  createTemplate(arr) {
    const markup = arr.reduce((acc, item) => acc + card(item), '');

    this.refs.container.insertAdjacentHTML('beforeend', markup);
  }

  createSliderTemplate(arr) {
    const markup = arr.reduce((acc, item) => acc + mcard(item), '');

    this.refs.sliderContainer.insertAdjacentHTML('beforeend', markup);
  }

  clearPage() {
    this.refs.container.innerHTML = '';
  }

  deleteSlide() {
    this.refs.page.classList.remove('show-slider');
    this.refs.sliderContainer.innerHTML = '';
  }

  insertSelected() {
    const markup = '<span class="list__selected-button">Избранное</span>'
    this.refs.listWrap.insertAdjacentHTML('afterbegin', markup);
  }
}
