import icons from 'url:../../img/icons.svg';
// for better view of numbers in recipe we use this package which allows to convert 0.5 to this 1/2
// check ing.quantity to see where it is being used
import Fraction from 'fractional';
import View from './View';
import { state } from '../model';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');

  _errorMessage = 'Recipe is not found. Please try again.';
  _successMessage = '';

  addHandlerRecipe(handler) {
    // Here we trigger out recipie function with 2 events by using array method
    ['hashchange'].forEach(event => window.addEventListener(event, handler));
  }

  addHandlerUpdateServings(handler) {
    // event delegation
    this._parentElement.addEventListener('click', function (event) {
      event.preventDefault();
      const btn = event.target.closest('.btn--tiny');
      //console.log(btn);
      if (!btn) return;
      if (state.recipe.servings < 1) state.recipe.servings = 1;

      state.recipe.servingsOld = state.recipe.servings;
      console.log('old', state.recipe.servingsOld);
      state.recipe.servings = state.recipe.servings + +btn.dataset.updateTo;
      console.log('new', state.recipe.servings);
      // Change recipe.servings
      // guard close for clicking outside of btn-tiny

      if (state.recipe.servings > 0) handler();
    });
  }

  _generateHTML() {
    console.log(this._data);
    return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update-to="${-1}">
                <svg>
                  <use href="${icons}.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-to="${1}">
                <svg>
                  <use href="${icons}.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">

          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map(ing => {
              return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}.svg#icon-check"></use>
                </svg>
                <div class="recipe__description">
                  <span class="recipe__unit"></span>
                  ${this._extractUnits(ing)}
                </div>
              </li>
            `;
            })
            .join('')}

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This <span class="recipe__publisher">${
              this._data.title
            }</span> was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }

  // extracting number from ingredients string, storing them in unitsIngs,
  // then after servings change we will rerender them with new multiplicator
  // Serving wont be working fine because the ing is a string from which I extract and change quantity
  // So each time u increase or dercrease servings it always will change the quantity from the original
  // string, which is required to be converted to structured object with quntity units etc, if u want
  // to update it each time.
  // This requires a lot of time and work which I will not waste time on in terms of this educational project :)
  _extractUnits(ing) {
    //console.log('new', state.recipe.servings);
    //console.log('olddd', state.recipe.servingsOld);
    const res = ing
      .split(' ')
      .map(function (mov) {
        console.log(
          'aaa',
          Number(mov),
          state.recipe.servings,
          state.recipe.servingsOld
        );
        return isNaN(mov)
          ? mov
          : (
              (Number(mov) * state.recipe.servings) /
              state.recipe.servingsOld
            ).toFixed(0);
      })
      .join(' ');

    return res;
  }
}

/* 
// rendering ingidients old version
            ${this._data.ingredients
              .map(ing => {
                return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}.svg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${
                  ing.quantity === null
                    ? ''
                    : new Fraction.Fraction(ing.quantity).toString()
                }</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
              `;
              })
              .join('')}

*/

export default new RecipeView();
