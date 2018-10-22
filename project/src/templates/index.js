import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';
import styles from './sass/styles.scss';
import TestGitHub from './js/dima.js'


const view = new View();

const model = new Model();

new Controller(view, model);

const test = new TestGitHub('Git hab test worked');

test.consoleDimaText();













// import greet from './greet';
// import './sass/styles.scss';
// greet('Webpack is awesome!');