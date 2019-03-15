// Arithmetic Functions
calculateSum = (a,b) => {
  return a + b;
}

calculateDifference = (a,b) => {
  return a - b;
}

calculateMultiplication = (a,b) => {
  return a * b;
}

calculateDivision = (a,b) => {

  return (a / b).toFixed(2);
}

//display values
sendToDisplay = value => { displayDiv.textContent += value; }

//store values entered

const displayDiv = document.querySelector('.values');
const displayResult = document.querySelector('.result');
const screen = document.querySelector('.screen');
const equalsButton = document.getElementById('submit');
const resetButton = createResetButton();
let screenOptions = document.querySelectorAll('.options');
let allButtons = document.getElementsByTagName('button');
let toCalculate = [];

if (displayDiv.textContent.length == 0) {
  hideScreenOptions();
}

//Event Listeners
window.addEventListener('click', keysClicked);

function keysClicked(event) {
  let eventTarget = event.target;
  if (eventTarget.nodeName.toLowerCase() === 'button'){
     let valueClicked = eventTarget.getAttribute('data-value');
     sendToDisplay(valueClicked);
     saveValueEntered(valueClicked)
     for (option of screenOptions) option.style.display = 'inline-block';
  }

  if (eventTarget.nodeName.toLowerCase() === 'div') {
    let divOption = eventTarget.getAttribute('data-action');

    if (divOption == 'delete') {
      let currentContents = displayDiv.textContent;
      displayDiv.textContent = '';
      toCalculate.pop();

      sendToDisplay( currentContents.slice(0, currentContents.length-1) );

    }
    else if (divOption == 'clear') {
      toCalculate = [];
      sendToDisplay(displayDiv.textContent = '')
      for (option of screenOptions) option.style.display = 'none';
    }

  }
}

equalsButton.addEventListener('click', event => {
  window.removeEventListener('click', keysClicked);
  disableButtons();
  hideScreenOptions();
  displayResults();
  displayResetOption();
});

resetButton.addEventListener('click', () => {
  for (button of allButtons) button.disabled = false;
  toCalculate = [];
  sendToDisplay(displayDiv.textContent = '');
  sendToDisplay(displayResult.textContent = '');
  window.addEventListener('click', keysClicked);
  window.addEventListener('keydown', keysPressed);
  for (option of screenOptions) option.style.display = 'none';
  resetButton.style.display = 'none';
  });

function operate (array) {
  if (array) {
    let arguments = array.join('');
    let leftOperand = Number(arguments.match(/^\d+/));
    let rightOperand = Number(arguments.match(/\d+$/));
    let operator = arguments.match(/[+-\/x]/).toString();

    return result = determineOperation(operator, leftOperand, rightOperand);
  }
}

function createResetButton() {
  let button = document.createElement('div');
  button.textContent = 'reset';
  button.className = 'options';
  button.className += ' success';
  button.dataset.action = 'reset';
  return button;
}

function displayResetOption() {
  resetButton.style.display = 'inline-block';
  screen.prepend(resetButton);
}

function determineOperation (operator, leftOperand, rightOperand) {
  switch (operator) {
    case '+':
      return calculateSum(leftOperand, rightOperand);
      break;

    case '-':
      return calculateDifference(leftOperand, rightOperand);
      break;
    case 'x':
      return calculateMultiplication(leftOperand, rightOperand);
      break;
    case '/':
      return calculateDivision(leftOperand, rightOperand);
      break;
    default:
    console.log('Please select an operator');
    return 'Cannot perform operation';
  }
}

window.addEventListener('keydown', keysPressed);

function keysPressed (event) {
  let keyPressed = event.keyCode;
  if (  (keyPressed > 46 && keyPressed < 58) ||
        (keyPressed >95 && keyPressed < 106) ||
        (keyPressed == 106 || keyPressed == 107 || keyPressed == 109 || keyPressed == 111) ||
        (keyPressed == 191 || keyPressed == 189) ){
    let keyValue = event.key;
    if( keyPressed == 106) keyValue = 'x';
    sendToDisplay(keyValue);
    saveValueEntered(keyValue);
    displayScreenOptions();
  }
  if (keyPressed == 187 || keyPressed == 13) {
    window.removeEventListener('keydown', keysPressed);
    hideScreenOptions();
    disableButtons();
    displayResults();
    displayResetOption();
  }
}

function displayResults() {
  displayResult.textContent = operate(toCalculate);
}

function saveValueEntered(key) {
  toCalculate.push(key);
}

function displayScreenOptions() {
  for (option of screenOptions) option.style.display = 'inline-block';
}

function hideScreenOptions() {
  for (option of screenOptions) option.style.display = 'none';
}

function disableButtons () {
  for (button of allButtons) {
    button.disabled = true;
  }
}
