var pages = {
  main: document.getElementById('mainPage'),
  calc: document.getElementById('calcPage'),
  ico: document.getElementById('icoPage'),
};

var links = {
  main: document.getElementById('mainLink'),
  calc: document.getElementById('calcLink'),
  ico: document.getElementById('icoLink'),
};

function hideAllPagesExcept(pageKey) {
  Object.keys(pages).forEach(function (page) {
    pages[page].style.display = page === pageKey ? 'block' : 'none';
  });
}

function showAllLinksExcept(linkKey) {
  Object.keys(links).forEach(function (link) {
    links[link].style.display = (link === linkKey ? 'none' : 'block');
  });
}

function navigateTo(key) {
  hideAllPagesExcept(key);
  showAllLinksExcept(key);
}

window.goToMainPage = function() { navigateTo('main'); };
window.goToCalc = function() { navigateTo('calc'); };
window.goToIco = function() { navigateTo('ico'); };