import axios from 'axios';
export default class Model {
  constructor(items = []) {
    this._items = items;
  }
}
