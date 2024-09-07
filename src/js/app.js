const testModules = require('./test-module');
require('../css/app.css');

/** ******** Your code here! *********** */

console.log(testModules.hello);

const scrollContainer = document.querySelector('.scroll');
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');

leftBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
});

rightBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
});
