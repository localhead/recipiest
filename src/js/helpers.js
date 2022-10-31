import { API_URL } from './config';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const fetchJSON = async function (api, id) {
  try {
    console.log(api, id);
    // here we race two promises in order to limit time for fetch in bad internet connections
    // if request tooks too much time it will throw reject
    const res = await Promise.race([
      fetch(`${api}${id}`),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();

    // https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcac4
    // https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc8fd
    // https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcebc

    console.log(res);
    console.log(data);
    // if (res.ok === false) throw Error(`${res.status} ${res.statusText}`);
    if (res.status === 400) throw Error('No recipe found. Please try again');
    return data;
  } catch (err) {
    // this allows to convey error message out from helper function in order to catch it somewhere else
    throw err.message;
  }
};
