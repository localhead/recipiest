import View from './View';
import { state } from '../model';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _errorMessage = 'No recipes found. Please try again';
  _successMessage = '';

  _generateHTML() {
    // How can we see _data even though it was created in View?
    // cuz ResultsView inherits everything from it
    console.log(this._data.searchResult);
    return this._data.searchResultPerPage.map(this._generateHTMLItem).join('');
  }

  _generateHTMLItem(data) {
    return `
        <li class="preview">
            <a class="preview__link" href="#${data.id}">
                <figure class="preview__fig">
                    <img src="${data.image}" alt="${data.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${data.title}</h4>
                    <p class="preview__publisher">${data.publisher}</p>
                    
                </div>
            </a>
        </li>
    `;
  }
}

export default new ResultsView();
