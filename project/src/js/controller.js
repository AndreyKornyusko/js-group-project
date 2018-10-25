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

    this._view.refs.container.addEventListener(
      'click',
      this.onClickShowSlider.bind(this),
    );

    // this.slide();

    this._view.refs.prew.addEventListener('click', this.onclickPrew.bind(this));

    this._view.refs.next.addEventListener('click', this.onclickNext.bind(this));
  }

  slide() {
    const slides = document.querySelectorAll('.slider__list-item');

    // for (let i = 0; i < slides.length; i++) {
    //   slides[i].style.zIndex = slides.length - i;
    // }

    slides.forEach((slide, i) => {
      slide.style.zIndex = slide.length - i;
    })
  }

  viewFirstSlideAfterClick(target) {
    const slides = document.querySelectorAll('.slider__list-item');
    const listItem = target.closest('.list__img-card');
    const imgId = listItem.dataset.id;
   
    // for (let i = 0; i < slides.length; i++) {
    //   if(imgId === slides[i].dataset.id) {
    //     slides[i].classList.add('active')
    //   }
    //  }

    slides.forEach((slide, i) => {
      if(imgId === slide.dataset.id) {
        slide.classList.add('active');
      }
    })
  }
  

  onclickNext(evt) {
    this.slide();
    console.log('next');
    const activeEl = document.querySelector('.active');
    if (activeEl.nextElementSibling) {
      activeEl.style.left = '-100%';
      activeEl.classList.remove('active');
      activeEl.nextElementSibling.classList.add('active');
    }
  }

  onclickPrew(evt) {
    this.slide();
    console.log('prew');
    const activeEl = document.querySelector('.active');
    console.log(activeEl)
    if (activeEl.previousElementSibling) {
      activeEl.previousElementSibling.style.left = '0%';
      activeEl.classList.remove('active');
      activeEl.previousElementSibling.classList.add('active');
    }
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

  onClickShowSlider(event) {
    event.preventDefault();
    console.log('event', event);
    const target = event.target;
    const nodeName = target.nodeName;
    const fullview = target.dataset.fullview;

    if (nodeName !== 'IMG') return;

    console.log(fullview)
   
    console.log('slider open');
    this._view.createSliderTemplate(this._model.allItems);
    this.viewFirstSlideAfterClick(target)
    this._view.refs.page.classList.add('show-slider');
  }
}



// export default class Controller {
//   constructor(view, model) {
//     this._view = view;
//     this._model = model;
//     this.request = {
//       page: 1,
//       query: '',
//       resetPage() {
//         this.page = 1;
//       },
//       incrementPage() {
//         this.page += 1;
//       },
//     };
//     this._view.refs.searchBtn.addEventListener(
//       'click',
//       this.onClickSearch.bind(this),
//     );
//     this._view.refs.ShowMoreBtn.addEventListener(
//       'click',
//       this.onClickShowMore.bind(this),
//     );

//     this._view.refs.container.addEventListener(
//       'click',
//       this.onClickShowSlider.bind(this),
//     );

//     this._view.refs.prew.addEventListener('click', this.onclickPrew.bind(this));

//     this._view.refs.next.addEventListener('click', this.onclickNext.bind(this));
//   }

//   slide() {
//     const slides = document.querySelectorAll('.slider__list-item');
//     // for (let i = 0; i < this._view.refs.slides.length; i++) {
//     //   this._view.refs.slides[i].style.zIndex =
//     //     this._view.refs.slides.length - i;
//     // }
//     for (let i = 0; i < slides.length; i++) {
//       slides[i].style.zIndex = slides.length - i;
//     }
//   }

//   onclickNext(evt) {
//     this.slide();
//     const activeEl = document.querySelector('.active');
//     if (activeEl.nextElementSibling) {
//       activeEl.style.left = '-100%';
//       activeEl.classList.remove('active');
//       activeEl.nextElementSibling.classList.add('active');
//     }
//   }

//   onclickPrew(evt) {
//     this.slide();
//     const activeEl = document.querySelector('.active');
//     if (activeEl.previousElementSibling) {
//       activeEl.previousElementSibling.style.left = '0%';
//       activeEl.classList.remove('active');
//       activeEl.previousElementSibling.classList.add('active');
//     }
//   }

//   onClickSearch(evt) {
//     const target = evt.target;
//     const action = target.dataset.action;
//     if (target.nodeName !== 'BUTTON' || action !== 'search') return;
//     evt.preventDefault();
//     const inputValue = this._view.refs.input.value.trim();
//     this.request.query = inputValue;

//     this._model.getImages(this.request).then(data => {
//       this._view.createTemplate(data);
//       this._view.refs.form.reset();
//       this._view.refs.ShowMoreBtn.classList.add('visible');
//     });
//   }

//   onClickShowMore(evt) {
//     const target = evt.target;
//     const action = target.dataset.action;
//     if (target.nodeName !== 'BUTTON' || action !== 'show') return;
//     evt.preventDefault();
//     this.request.incrementPage();
//     this._model.getImages(this.request).then(data => {
//       this._view.createTemplate(data);
//       // this._view.refs.form.reset();
//       console.log('this._model._items', this._model._items);
//     });
//   }

//   onClickShowSlider(event) {
//     event.preventDefault();
//     console.log('event', event);
//     const target = event.target;
//     const nodeName = target.nodeName;
//     if (nodeName !== 'IMG') return;
//     console.log('event.target.parentNode.dataset.id',event.target.parentNode.dataset.id);
//     this._view.createSliderTemplate(this._model._allItems);
//     console.log('this._view.refs.slider', this._view.refs.slider);
//     this._view.refs.page.classList.add('show-slider');

//   }
// }
