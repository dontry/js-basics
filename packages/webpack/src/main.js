require("./style.css"); //import style.css
const _ = require("lodash")
const pic = require("./7.png");
const show = require("./show.js");
const print = require('./print');

show("Webpack");

function component() {
  const element = document.createElement('div');
  const image = new Image();
  element.innerHTML  = _.join(['hello', 'webpack'], ' ');
  element.classList.add('hello')

  image.src = pic;
  // element.appendChild(image);


  const btn = document.createElement('button');
  console.log('xx')
  btn.innerHTML = 'click me and check the console';
  btn.onclick = print;
  element.appendChild(btn);

  return element; 
}

document.body.appendChild(component());

