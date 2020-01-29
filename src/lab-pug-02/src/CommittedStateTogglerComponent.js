import Icon from './images/icon.png'

function componentImage() {
    const element = document.createElement('div');
    element.id = "toggler"
  
    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);    
    return element;
  }


document.body.appendChild(componentImage());
function toggleCommitedState() {
    document.querySelector('#ssr_cardlist').style.display = document.querySelector('#ssr_cardlist').style.display == 'none' ? 'block' : 'none';
  }
  
  let btnToggleText = document.querySelector('#toggler');
  btnToggleText.addEventListener('click', (e) => toggleCommitedState());
  
