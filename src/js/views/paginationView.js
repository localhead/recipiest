import View from './View';
import { state } from '../model';
import icons from 'url:../../img/icons.svg';

// Here we will take care of content which will be rendered
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    // event delegation
    this._parentElement.addEventListener('click', function (event) {
      event.preventDefault();
      // here we are trying to catch the right btn by analysing mouse position
      // closest will look up for the closest element to mouse position
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;

      // lets get an info from data attribute we created for btn, which contains info about where to
      // go after pushing btn
      const goToPage = +btn.dataset.goto;
      console.log('goto attribute ', goToPage);

      // this will run controlPagination on paginationView which will do
      // what we need from the click
      handler(goToPage);
    });
  }

  _generateHTML() {
    console.log('current page is ', this._data.page);
    const numPages = Math.ceil(
      this._data.searchResult.length / this._data.searchResultNumb
    );
    console.log(numPages);
    // We are at page 1. there are next pages
    if (this._data.page === 1 && numPages > 1)
      // Check data-goto custum attribute which will allow us to move to the next page!!!!
      return `
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;

    // Last page
    if (this._data.page === numPages && numPages > 1)
      return `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
    `;

    // middle pages 1
    if (this._data.page < numPages && this._data.page !== 1)
      return `
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
    `;
    // We are at page 1 and there are no other pages
    if (this._data.page === 1 && this._data.page === numPages) return '';
  }
}

export default new PaginationView();
