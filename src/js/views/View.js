// Creating parent class for View Instances classes which appear in other files
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    console.log(data);
    if (!data) return this.renderError();
    this._data = data;

    const html = this._generateHTML();

    // Clear up an old html render for the new html render to come up!
    this._clear();
    // Lets insert that HTML in parent container
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    if (!data) return this.renderError();
    this._data = data;

    const newHtml = this._generateHTML();

    // this newDOM will create a virtual DOM object
    const newDOM = document.createRange().createContextualFragment(newHtml);
  }

  _clear() {
    // for now we can render innerHTML from here
    // cuz we have data that we can paste into it
    //console.log(this._parentElement);
    this._parentElement.innerHTML = '';
  }
  // render spinner is not a private method - so it can be executed not only inside of this class
  renderSpinner = function () {
    const html = `        
    <div class="spinner">
      <svg>
        <use href="${icons}.svg#icon-loader"></use>
      </svg>
    </div>
    `;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  };

  renderError(message = this._errorMessage) {
    const html = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}.svg#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderSuccess(message = this._successMessage) {
    const html = `
    <div class="message">
        <div>
            <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>
    `;
  }
}

// Here we do not exprot new View(), cuz we will not create its instances many times
// as we did for other view classes in other files
