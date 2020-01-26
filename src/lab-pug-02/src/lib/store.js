/* 
gli scopi dello `store` sono:
  - gestire lo `state` dell'applicazione 
  - informare i `subscribers` dell'avvenuto cambiamento di stato 

*/ 
import {COUNT_UP, COUNT_DOWN} from './actiontypes.js'
import commitedState from '../store/commited-state.json'
let state = commitedState.state;
let actions = [];

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

document.addEventListener('action', function(e) {
  setState(reducer(getState(), e.detail));
  document.dispatchEvent(new CustomEvent('state'));
}, false);

// notare che setState non viene esportato in quanto non deve mai essere chiamato da fuori
const setState = nextState => {
  state = nextState;
};

export const getState = () => state;
export const getActions = () => actions; // in pratica non servirebbe esportare questa funzione se non avessimo necessità di visualizzarle.
