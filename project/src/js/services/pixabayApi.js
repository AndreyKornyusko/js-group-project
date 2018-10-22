import axios from 'axios';

const API_KEY = '10461351-8025d754d78552fcc3a395714';
const BaseURL = 'https://pixabay.com/api/?image_type=photo';

export const queryImages =((query, page) => {
	return axios.get(`${BaseURL}&q=${query}&key=${API_KEY}&per_page=9&page=${page}`)
	.then(response => response)
	.then(obj => obj.data.hits) 
	.catch(error => console.log(error))
});
