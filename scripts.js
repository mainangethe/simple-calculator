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
  return a / b;
}

//display values
sendToDisplay = value => { displayDiv.textContent += value; }

//store values entered
let toCalculate = [];

//Event Listeners
window.addEventListener('click', keysClicked);

function keysClicked(event) {
  let eventTarget = event.target;
  if (eventTarget.nodeName.toLowerCase() === 'button'){

     let valueClicked = eventTarget.getAttribute('data-value');
     sendToDisplay(valueClicked);
     toCalculate.push(valueClicked);
  }
}

const equalsButton = document.getElementById('submit');

equalsButton.addEventListener('click', event => {
  window.removeEventListener('click', keysClicked);
  let allButtons = document.getElementsByTagName('button');

  for (button of allButtons) {
    button.disabled = true;
  }

  const displayResult = document.querySelector('.result');
  displayResult.textContent = operate(toCalculate);
});

const displayDiv = document.querySelector('.values');


function operate (array) {
  if (array) {
    let arguments = array.join('');
    let leftOperand = Number(arguments.match(/^\d+/));
    let rightOperand = Number(arguments.match(/\d+$/).toString());
    let operator = arguments.match(/[+-\/x]/).toString();

    return result = determineOperation(operator, leftOperand, rightOperand);

    // console.log('what we need to calculate: ', arguments);
    console.log('left contents: ', leftOperand);
    console.log('right contents: ', rightOperand);
    console.log('and we want to do: ', operator);
  }
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
