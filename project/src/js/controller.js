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

   /* this._view.refs.searchBtn.addEventListener(
      'click',
      this.onClickSearch.bind(this),
    );*/
    this._view.refs.ShowMoreBtn.addEventListener(
      'click',
      this.onClickShowMore.bind(this),
    );

    this._view.refs.container.addEventListener(
      'click',
      this.onClickImagesInContainer.bind(this),
    );
    this._view.refs.selectedBtn.addEventListener(
      'click',
      this.onClickShowSelectedImage.bind(this),
    );

    this._view.refs.prew.addEventListener('click', this.onclickPrew.bind(this));

    this._view.refs.next.addEventListener('click', this.onclickNext.bind(this));

    this._view.refs.select.addEventListener(
      'click',
      this.onClickAddToSelected.bind(this),
    );

    this._view.refs.delSlider.addEventListener(
      'click',
      this.onclickDelSlider.bind(this),
    );
    this._view.refs.form.addEventListener(
      'submit',
      this.onClickSearch.bind(this),
  ); 
  }

  slide() {
    const slides = document.querySelectorAll('.slider__list-item');
    slides.forEach((slide, i) => {
      slide.style.zIndex = slide.length - i;
    });
  }

  viewFirstSlideAfterClick(target) {
    const slides = document.querySelectorAll('.slider__list-item');
    const listItem = target.closest('.list__img-card');
    const imgId = listItem.dataset.id;
    listItem.scrollIntoView();
    slides.forEach((slide, i) => {
      if (imgId === slide.dataset.id) {
        slide.classList.add('active');
      }
    });
  }

  findActiveSlide() {
    const activElem = document.querySelector('.active');
    const id = Number(activElem.dataset.id);
    const previewURL = activElem.firstElementChild.dataset.preview;
    const largeImageURL = activElem.firstElementChild.getAttribute('src');
    const alt = activElem.firstElementChild.getAttribute('alt');
    const selectedItem = {
      id,
      selected: true,
      previewURL,
      largeImageURL,
      alt,
    };

    return selectedItem;
  }

  onclickNext(evt) {
    this.slide();
    const activeEl = document.querySelector('.active');
    
    if (activeEl.nextElementSibling) {
      activeEl.style.left = '-100%';
      activeEl.classList.remove('active');
      activeEl.nextElementSibling.classList.add('active');
      this._view.refs.select.classList.remove('activated');
    }
  }

  onclickPrew(evt) {
    this.slide();
    const activeEl = document.querySelector('.active');

    if (activeEl.previousElementSibling) {
      activeEl.previousElementSibling.style.left = '0%';
      activeEl.classList.remove('active');
      activeEl.previousElementSibling.classList.add('active');
      this._view.refs.select.classList.remove('activated');
    }
  }

  // onClickFormSubmit(evt){
  //   evt.preventDefault();
  //   const inputValue = this._view.refs.input.value.trim();
  //   this.request.query = inputValue;

  //   this._model.getImages(this.request).then(data => {
  //     this._view.createTemplate(data);
  //     this._view.refs.form.reset();
  //     this._view.refs.ShowMoreBtn.classList.add('visible');
  //   });

  // }

  onClickSearch(evt) {
      const inputValue = this._view.refs.input.value.trim();
      evt.preventDefault();
      this.request.query = inputValue;

      if (!this.isEnteredValueValid(inputValue)) {
      this._view.refs.form.reset();
      return;
    }

      this._view.clearPage();
      this._model.getImages(this.request).then(data => {

      this._view.createTemplate(data);
      this._view.refs.form.reset();
      this._view.refs.ShowMoreBtn.classList.add('visible');
    });
  }

  onClickImagesInContainer({ target }) {
    const action = target.dataset.action;

    console.log(target)

    switch (action) {
      case 'showModal':
        this.showSlider(target);
        break;
      case 'del':
        this.delImageFromSelected(target);
        break;
    }
  }

  onClickShowMore({ target }) {
    const action = target.dataset.action;
    if (target.nodeName !== 'BUTTON' || action !== 'show') return;

    this.request.incrementPage();
    this._model.getImages(this.request).then(data => {
      this._view.createTemplate(data);
      this._view.refs.form.reset();
    });
  }

  showSlider(target) {
    const nodeName = target.nodeName;
    const fullview = target.dataset.fullview;

    if (nodeName !== 'DIV') return;

    this._view.createSliderTemplate(this._model.allItems);
    this.viewFirstSlideAfterClick(target);
    this._view.refs.page.classList.add('show-slider');
  }

  onClickAddToSelected() {
    const selectArrItem = this.findActiveSlide();

    this._view.refs.select.classList.add('activated');

    this._model.addToSelected(selectArrItem);
  }

  onClickShowSelectedImage() {
    this._view.clearPage();
    this._view.deleteSlide();
    this._view.refs.ShowMoreBtn.classList.remove('visible');

    this._view.insertSelected();

    this._view.createTemplate(this._model._selecteds);
    this._model.setAllItems(this._model._selecteds);
  }

  onclickDelSlider() {
    this._view.deleteSlide();
  }

  delImageFromSelected(target) {
    const listItem = target.closest('.list__img-card');
    const imgId = Number(listItem.dataset.id);

    this._model.deleteFromSelected(imgId);
    this._view.clearPage();
    this._view.createTemplate(this._model._selecteds);
  }

  isEnteredValueValid(inputValue) {
    const value = /^[a-zA-Z0-9]/.test(inputValue);

    if (inputValue === '') {
      alert('Вы ничего не ввели');
      return false;
    }
    if (!value) {
      alert('Ваш поисковый запрос не корректный');
      return false;
    }
    return true;
  }
}
