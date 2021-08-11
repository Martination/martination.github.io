import _ from 'lodash';
import './sass.scss';
import 'bootstrap';
import Icon from './icon.jpg';
import printMe from './print.js';
import index from './index.html';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work


  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML += _.join(['Hello', 'Weebs'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  btn.className = 'btn btn-danger';
  element.appendChild(btn);


  return element;
}

function mainIndex() {
  const element = document.createElement('div');
  element.innerHTML = index;

  return element;
}
// document.getElementById("root").innerHTML = index;

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);
// document.body.appendChild(mainIndex());

// console.log("Index below");
// console.log(index);

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    element = component(); // Re-render the "component" to update the click handler
    document.body.appendChild(element);
  })
}


/*
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>Output Management</title>
  <script src="./print.bundle.js"></script>
</head>

<body>
  <script src="./index.bundle.js"></script>
  <br>Hello other asset world.
  <br><button class="btn btn-primary btn-large">This is a large button.</button>
</body>

</html>
*/
