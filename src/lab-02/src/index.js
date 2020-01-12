import _ from 'lodash';
import './style.css';
import Icon from './images/icon.png'

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack', 'lab', '02'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;
    console.log(myIcon.src);
    element.appendChild(myIcon);    
    return element;
  }
  
document.body.appendChild(component());