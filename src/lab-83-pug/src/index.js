import _ from 'lodash';
import './style.css';
import Icon from './images/icon.png'

function componentImage() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['lab-83-pug', 'mix', 'lab-08', 'and', 'lab-03','and','pug'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);    
    return element;
  }

  const myIcon = new Image();
  myIcon.src = Icon;

// <div class="icons__item">
// <i class="webfont webfont-3x webfont-avatar"></i>
// </div>

function componentFont() {
    const element = document.createElement('div');
    element.className = 'icons__item';
    const myIcon = document.createElement('i');  // new HTMLElement();  // @see /Applications/Visual Studio Code.app/Contents/Resources/app/extensions/node_modules/typescript/lib/lib.dom.d.ts
    myIcon.classList.add('webfont');
    myIcon.classList.add('webfont-3x');
    myIcon.classList.add('webfont-avatar');
    element.appendChild(myIcon);    
    return element;
}


document.body.appendChild(componentImage());
document.body.appendChild(componentFont());

/* views/footer.pug */

function toggleText() {
  let el = document.querySelector('#dinamico');
  el.innerHTML = "un testo dinamico sotto alla carota"
  document.querySelector('#prova').style.display = 'none';
}

let btnToggleText = document.querySelector('#prova');
btnToggleText.addEventListener('click', (e) => toggleText());
