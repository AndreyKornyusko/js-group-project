import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';
import styles from './sass/styles.scss';


const view = new View();

const model = new Model();

new Controller(view, model);

const request = {
  query: 'cat',
  page: 1
}

const item = {
  id: 2083492,
  largeImageURL: "https://pixabay.com/get/eb35b90c2cfd033ed1584d05fb1d4796e771e3d61cb00c4090f4c17ba6e5b2bade_1280.jpg",
  pageURL: "https://pixabay.com/en/cat-young-animal-curious-wildcat-animal--2083492/",
}

model.getImages(request)

console.log(model.selecteds);

model.addToSelected(item)

console.log(model.selecteds)

model.clearSelecteds()














// import greet from './greet';
// import './sass/styles.scss';
// greet('Webpack is awesome!');
