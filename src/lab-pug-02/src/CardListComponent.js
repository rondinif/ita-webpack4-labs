import './css/cardlistcomponent.css';
import {getState, getActions} from './lib/store.js'

// vedi: ./mixin/card.pug
// <li class="card" id="Q38859-1"><div class="name">basilico</div></li>

// UI state change method
function render() {
  let $cardlist = document.querySelector('#csr_cardlist');
  if ($cardlist) {
    $cardlist.innerHTML = ''; // https://stackoverflow.com/a/3955238/1657028

    getState().cards.forEach(card => {
      const elCard = document.createElement('li');
      elCard.classList.add('card');
      elCard.classList.add(card.type);
      elCard.id = card.id;
      const elName = document.createElement('div');
      elName.classList.add('name');
      const textnode = document.createTextNode(card.name);
      elName.appendChild(textnode);  
      elCard.appendChild(elName);
      $cardlist.appendChild(elCard);
    })
    $cardlist.style.display = 'block';
    $cardlist.style.border = 'solid';
    
    document.querySelector('#ssr_cardlist').style.display = 'none';


  }
}
  
document.addEventListener('state', render);
render();