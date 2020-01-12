function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack', 'lab', '01'], ' ');
  
    return element;
  }
  
document.body.appendChild(component());