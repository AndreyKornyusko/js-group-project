
import { queryImages } from './services/pixabayApi.js';
import { LOCALSTORAGE } from './services/localStorage.js';

export default class Model {
  constructor(items = []) {
    this._items = items;
    this._selecteds = LOCALSTORAGE.get('selected') ? LOCALSTORAGE.get('selected') : [];
    this._allItems  = [];
  }

  get items() {
  	return this._items;
  }

  get selecteds() {
  	return this._selecteds;
  }

  get allItems() {
    return this._allItems;
  }

  setAllItems(items) {
    this._allItems = items;
  }

  getImages({ query = '', page = 1 }) {
    return queryImages(query, page)
    .then(data => {
    	this._items = data;
      
      data.forEach(obj => this._allItems.push(obj));
      console.log("ALL ITEMS:", this._allItems)
    	console.log('data',data)
      
    	return data;
    })
  }

  addToSelected(item) {
    if(this._selecteds.some(obj => obj.id === item.id)) {
      alert("this picture in selecteds");
      return;
    }
    
    this._selecteds.push(item);
  	LOCALSTORAGE.set('selected', this._selecteds);

  	return this._selecteds;
  }

  deleteFromSelected(id) {
    const filteredArr = this._selecteds.filter(obj => obj.id !== id);
  
    this._selecteds = filteredArr;
  	LOCALSTORAGE.set('selected', this._selecteds);

  	return this._selecteds;
  }

  clearSelecteds() {
  	LOCALSTORAGE.clear();
  	this._selecteds = []; 
  }

}
