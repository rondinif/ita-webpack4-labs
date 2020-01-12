import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  
  element.innerHTML = _.join(['Hello', 'webpack', 'lab', '05'], ' ');
  element.classList.add('hello');
  return element;
}

document.body.append(component());
