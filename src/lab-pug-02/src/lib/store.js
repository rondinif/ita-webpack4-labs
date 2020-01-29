/* 
gli scopi dello `store` sono:
  - gestire lo `state` dell'applicazione 
  - informare i `subscribers` dell'avvenuto cambiamento di stato 

*/ 
import {ADD, REMOVE} from './actiontypes.js'
import commitedState from '../store/commited-state.json'
let state = commitedState.state;
let actions = [];

function reducer(state, action) {
  actions.push(action)
  let cards = [];
  switch (action.type) {
    case ADD:
      let n = 0; 
      state.cards.forEach(card => {
        if (card.id.startsWith(`${action.payload.id}-`)) {
          n = parseInt(card.id.substring(action.payload.id.length+1))
        } 
        cards.push(card);
      }) 
      let name = (action.payload.id === 'Q50829171') ? 'cavolo cinese' : 'cavolo cappuccio'
      cards.push({id: `${action.payload.id}-${n+1}`, type: action.payload.id, name: name})
      return { cards: cards }
    case REMOVE:
      state.cards.forEach(card => {
        if (card.id.startsWith(`${action.payload.id}-`)) {
          // non lo aggiungo , quindi lo rimuovo
        } 
        else {
         cards.push(card)
        }
      });
      return { cards: cards }
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

/* 
* altri gestori evento di supporto alla diagnostica ( FACOLTATIVI )
*/

document.addEventListener('action', function(e) {
  console.log("action", e.detail);
});

document.addEventListener('state', function(e) {
  console.log("state changed", getState());
});

