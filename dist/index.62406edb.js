const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
///////////////////////////////////////
// Function which takes recipie from custom API:
// https://forkify-api.herokuapp.com/v2
const getRecipie = async function() {
    try {
        const res = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcac4");
        // https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcac4
        // https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc8fd
        // https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcebc
        const data = await res.json();
        console.log(res);
        console.log(data);
        if (res.ok === false) throw Error(`${res.status} ${res.statusText}`);
        // now lets create new obj where we will store all the needed info from fetched API request
        let { recipe  } = data.data;
        console.log(recipe);
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        // for now we can render innerHTML from here
        // cuz we have data that we can paste into it
        const recipeHTML = `
    <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map((ing)=>{
            return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="src/img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
              `;
        }).join("")}

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
        recipeContainer.innerHTML = "";
        // Lets insert that HTML in parent container
        recipeContainer.insertAdjacentHTML("afterbegin", recipeHTML);
    } catch (err) {
        console.error(err.message);
    }
};
getRecipie();

//# sourceMappingURL=index.62406edb.js.map
