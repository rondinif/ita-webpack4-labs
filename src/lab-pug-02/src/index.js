import './css/webfont.css';
import './css/pulsantiera.css';
import './css/style.css';

import Icon from './images/icon.png'
import {getState, getActions} from './lib/store.js'
import {ADD, REMOVE} from './lib/actiontypes.js'
import './CardListComponent.js'
import './CommittedStateTogglerComponent.js'

// action creators functions 
function add(what) {
  return {
      type: ADD,
      payload: {
        id: what
      }
  };
}

function remove(what) {
  return {
      type: REMOVE,
      payload: {
        id: what
      }
  };
}

// UI state change method
function render() {
  // let $counter = document.querySelector('#counter');
  // $counter.innerHTML = getState().counter;
  let $actions = document.querySelector('#actions');
  $actions.innerHTML = `abbiamo: ${getActions().length} eventi actions: <br/>`;
  getActions().forEach( action => { $actions.innerHTML += `action.type:${action.type}<span>${JSON.stringify(action.payload)}</span><br/>`; } );
}

document.addEventListener('state', render);
render();

// UI event handler

let $buttonUp1 = document.querySelector('#addQ146212');
$buttonUp1.addEventListener("click", function() {
  document.dispatchEvent(
    new CustomEvent('action', { detail: add('Q146212')})
  );
});

let $buttonUp2 = document.querySelector('#addQ50829171');
$buttonUp2.addEventListener("click", function() {
  document.dispatchEvent(
    new CustomEvent('action', { detail: add('Q50829171')})
  );
});

let $buttonDown1 = document.querySelector('#removeQ11678009');
$buttonDown1.addEventListener("click", function() {
  document.dispatchEvent(
    new CustomEvent('action', { detail: remove('Q11678009')})
  );
});
