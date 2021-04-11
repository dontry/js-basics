import "./style.css"; //import style.css
import { join } from "lodash-es";
import pic from "./7.png";
import { show } from "./show";
import { printMe } from './print';
import { cube } from './math'

show("Webpack");

function component() {
  const div = document.createElement('div');
  const image = new Image();
  div.innerHTML = join(['hello', 'webpack'], ' ');
  div.classList.add('hello')

  image.src = pic;
  // element.appendChild(image);


  const btn = document.createElement('button');
  console.log('xx')
  btn.innerHTML = 'click me and check the console';
  btn.onclick = printMe;
  div.appendChild(btn);

  const pre = document.createElement('pre');
  pre.innerHTML = element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');

  return div;
}

document.body.appendChild(component());

