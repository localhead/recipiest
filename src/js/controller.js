// importing files,
// we need to do this cuz parsel wont be able to show them in dist folder
// if we wont do that

// inside of contoller.js we dont put any DOM elements (no querySelectors & etc)
// contoller.js does not care about how UI is going to looks like

import * as model from './model.js';
// exporting this class
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// hot module reload
// this will tell parsel stop reloading the page after saveing code
/* 
if (module.hot) {
  module.hot.accept();
}
*/
///////////////////////////////////////

// Function which takes recipie from custom API:
// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
  try {
    // We are going to rotate spinner while getting data from API
    // however when we will get that data it will replase that spinner animation
    // with it own data in html
    recipeView.renderSpinner();

    // getting id of recipie from hash
    const id = window.location.hash.slice(1);

    // if we cant get hash then do nothing
    if (!id) return;

    // loading imported recipe function from model.js
    // we should use await cuz its async function
    await model.loadRecipe(id);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);

    model.loadSearchResults();
  } catch (err) {
    console.error(err);
    recipeView.renderError(`${err} (controlRecipe)`);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    console.log(query);
    if (query === undefined) return;

    await model.loadSearchResults(query);

    //resultsView.render(model.state.searchRecipes);
    resultsView.render(model.getResultsPerPage());
    console.log(model.state.searchRecipes);
    paginationView.render(model.state.searchRecipes);
  } catch (err) {
    //console.error(err);
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //paginationView.render(model.state.searchRecipes);
  // Rendering new results after clicking any of pagination btn-s
  resultsView.render(model.getResultsPerPage(goToPage));

  // rendering new pagination btn-s after click has happend
  paginationView.render(model.state.searchRecipes);
};

const controlServings = function () {
  // update recipe servings
  recipeView.render(model.state.recipe);
};

const init = function () {
  // here is subscriber-publisher pattern
  // where addHandlerRender method is a publisher
  // and controlRecipe is a subscriber
  recipeView.addHandlerRecipe(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  //controlSearchResults();
};

init();
