var mainPage = document.getElementById('mainPage');
var calcPage = document.getElementById('calcPage');
var mainLink = document.getElementById('mainLink');
var calcLink = document.getElementById('calcLink');

function goToMainPage() {
  if (mainPage.style.display !== 'block') {
    calcPage.style.display = 'none';
    calcLink.style.display = 'inline';

    mainPage.style.display = 'block';
    mainLink.style.display = 'none';
  }
}

function goToCalc() {
  if (calcPage.style.display !== 'block') {
    mainPage.style.display = 'none';
    mainLink.style.display = 'inline';

    calcPage.style.display = 'block';
    calcLink.style.display = 'none';
  }
}