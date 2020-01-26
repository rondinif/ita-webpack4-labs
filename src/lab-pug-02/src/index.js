import './css/webfont.css';
import './css/pulsantiera.css';
import './css/style.css';


import Icon from './images/icon.png'
import {getState, getActions} from './lib/store.js'
import {COUNT_UP, COUNT_DOWN} from './lib/actiontypes.js'


// action creator functions 

function countUp(n) {
  return {
      type: COUNT_UP,
      payload: {
        increase: n
      }
  };
}

function countDown(n) {
  return {
      type: COUNT_DOWN,
      payload: {
        increase: n
      }
  };
}


// UI state change method
function render() {
  let $counter = document.querySelector('#counter');
  $counter.innerHTML = getState().counter;
  let $actions = document.querySelector('#actions');
  $actions.innerHTML = `we got ${actions.length} actions: <br/>`;
  getActions().forEach( action => { $actions.innerHTML += `action.type:${action.type}<span>${JSON.stringify(action.payload)}</span><br/>`; } );
}

document.addEventListener('state', render);
render();

// UI event handler

let $buttonUp1 = document.querySelector('#up1');
$buttonUp1.addEventListener("click", function() {
  document.dispatchEvent(
    new CustomEvent('action', { detail: countUp(1)})
  );
});

let $buttonUp2 = document.querySelector('#up2');
$buttonUp2.addEventListener("click", function() {
  document.dispatchEvent(
    new CustomEvent('action', { detail: countUp(2)})
  );
});

let $buttonDown1 = document.querySelector('#down1');
$buttonDown1.addEventListener("click", function() {
  document.dispatchEvent(
    new CustomEvent('action', { detail: countDown(1)})
  );
});


document.addEventListener('action', function(e) {
    console.log("action", e.detail);
});

document.addEventListener('state', function(e) {
    console.log("state changed", getState());
});
