import './css/webfont.css';
import './css/pulsantiera.css';
import './css/style.css';


import Icon from './images/icon.png'
import {getState, setState} from './lib/state.js'
import commitedState from './store/commited-state.json'

const COUNT_UP = "COUNT_UP";
const COUNT_DOWN = "COUNT_DOWN";

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

// Reducer

function reducer(state, action) {
  actions.push(action)
  switch (action.type) {
    case COUNT_UP:
      return { counter: state.counter + action.payload.increase };
    case COUNT_DOWN:
      return { counter: state.counter - action.payload.increase };
    default:
      return state
  }
}

// State Store

let state = {"counter":0}; // Initial state
let actions = [];

document.addEventListener('action', function(e) {
    state = reducer(state, e.detail);
    document.dispatchEvent(new CustomEvent('state'));
}, false);

// UI state change method

function render() {
  let $counter = document.querySelector('#counter');
  $counter.innerHTML = state.counter;
  let $actions = document.querySelector('#actions');
  $actions.innerHTML = `we got ${actions.length} actions: <br/>`;
  actions.forEach( action => { $actions.innerHTML += `action.type:${action.type}<span>${JSON.stringify(action.payload)}</span><br/>`; } );
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
    console.log("state changed", state);
});






