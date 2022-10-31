// model.js - stand for processing data. It actually gets some data (from contoller.js) inside of its
// functions and then return data which then will be used in controller

// regenerator-runtime will polify ex6 async features for older versions of browsers
import { async } from 'regenerator-runtime';
import { API_URL, API_URL_SEARCH, RES_PER_PAGE, SERVINGS } from './config';
import { fetchJSON } from './helpers';
import recipeView from './views/recipeView';

// state contains all the that we need data
// recipe objects will contain info about one dish
export const state = {
  recipe: {},
  searchRecipes: {
    page: 1,
    query: '',
    searchResult: [],
    searchResultPerPage: [],
    searchResultNumb: RES_PER_PAGE,
  },
};

// this function gets data from API, waits till its recieved and then stor it in object called 'state'.
export const loadRecipe = async function (id) {
  try {
    const data = await fetchJSON(API_URL, id);

    // now lets create new obj where we will store all the needed info from fetched API request
    //console.log(data.recipe);
    const recipe = data.recipe;

    console.log(recipe);
    state.recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: 1,
      servingsOld: 1,
      cookingTime: 45,
      //cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
    // console.log(state.recipe);
  } catch (err) {
    console.error(err);
    //this throw will allow us to propage error from this fucntion
    throw err;
  }
};

// this fn will be called from contoller, so it will recive some data (str,obj etc)
export const loadSearchResults = async function (queryInput) {
  try {
    console.log(queryInput);
    state.searchRecipes.query = queryInput;

    if (!queryInput) return;

    const data = await fetchJSON(API_URL_SEARCH, queryInput);

    state.searchRecipes.searchResult = data.recipes.map(recipe => {
      return {
        id: recipe.recipe_id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
      };
    });
    console.log('here is all', state.searchRecipes);
  } catch (err) {
    throw err;
  }
};

// This will return state with limited amount of results on page
// instead of returning all the list of results
export const getResultsPerPage = function (page = state.searchRecipes.page) {
  state.searchRecipes.page = page;

  // Calculating the place in array from which first and last position starts
  // first page: [0 - 9], second page: [10 - 19] and so on
  const start = (page - 1) * state.searchRecipes.searchResultNumb;
  const end = page * state.searchRecipes.searchResultNumb;

  console.log(start, end);
  state.searchRecipes.searchResultPerPage =
    state.searchRecipes.searchResult.slice(start, end);
  return state.searchRecipes;
  //return state.searchRecipes.searchResult.slice(start, end);
};

export const updateServings = function () {};
