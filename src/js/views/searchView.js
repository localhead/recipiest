import View from './View';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _searchButton = document.querySelector('.search__btn');

  _errorMessage = 'No recipes found. !2112';
  _successMessage = '';

  getQuery() {
    const res = this._parentElement.querySelector('.search__field').value;

    // clearing input after search
    this._clearInput();
    return res;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
