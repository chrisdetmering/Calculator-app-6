let savedOperator = ""
let currentValue = ""
let firstValue = ""
let secondValue = ""
let memoryValue = "0"
let calculatorState = "default"

document.querySelectorAll(".numeric").forEach(numberButton => {
  numberButton.addEventListener('click', event => {
    const number = event.target.id;
    handleNumberButtenPress(number);
    renderDisplay();
  });
});

function handleNumberButtenPress(number) {
  if (isCalculatorState("default")) { setCalculatorState("firstvalue") };
  if (isCalculatorState("operator")) { setCalculatorState("secondvalue") };
  if (isCalculatorState("calculated") || isCalculatorState("error")) {
    resetValues();
    setCalculatorState("firstvalue")
  };

  if (number === "0") {
    handleZeroPress()
    return;
  }

  if (number === '.') {
    handleDecimalPress()
    return
  }
  currentValue += number
}



document.querySelectorAll(".operator").forEach(operatorButton => {
  operatorButton.addEventListener('click', event => {
    const operator = event.target.id;
    handleOperatorPress(operator);
    renderDisplay();
  });
});

function handleOperatorPress(operator) {
  const operators = {
    'add': '+',
    'subtract': '-',
    'multiply': 'x',
    'divide': '/',
    'exponent': '^'
  }

  if (isCalculatorState("default")) {
    alert('Error: operator requires input value')
  }
  if (isCalculatorState("error")) {
    resetValues();
  } else {
    if (isCalculatorState("firstvalue") || isCalculatorState("calculated")) {
      resetCalculator()
    }
    if (isCalculatorState("secondvalue")) {
      calculate();
      resetCalculator()
    }
    savedOperator = operators[operator]
  }
}



function calculate() {
  switch (calculatorState) {
    case "calculated": firstValue = currentValue; break;
    case "secondvalue": calculatorState = "calculated"; secondValue = currentValue; break;
    case "operator": calculatorState = "calculated"; secondValue = firstValue; break;
  };

  switch (savedOperator) {
    case "+":
      setCurrentValue(add(firstValue, secondValue));
      break;
    case "-":
      setCurrentValue(subtract(firstValue, secondValue));
      break;
    case "x":
      setCurrentValue(multiply(firstValue, secondValue));
      break;
    case "/":
      setCurrentValue(divide(firstValue, secondValue));
      break;
    case "^":
      setCurrentValue(expononent(firstValue, secondValue));
      break;
  }
  setCurrentValue(currentValue.toLocaleString('en-US', { maximumFractionDigits: 16, useGrouping: false }));
}


document.getElementById("backspace").addEventListener('click', () => {
  setCurrentValue(currentValue.substring(0, currentValue.length - 1));
  renderDisplay();
});

document.getElementById("clear-entry").addEventListener('click', () => {
  setCurrentValue('')
  renderDisplay();
});

document.getElementById("clear-content").addEventListener('click', () => {
  resetValues();
  renderDisplay();
});

document.getElementById("equals").addEventListener('click', () => {
  if (isCurrentValue("NaN") || isCalculatorState("∞")) {
    resetValues()
  } else {
    calculate();
  }
  renderDisplay();
});

function resetValues() {
  savedOperator = "";
  currentValue = "";
  firstValue = "";
  secondValue = "";
  calculatorState = "default"
  renderDisplay();
}

function renderDisplay() {
  displayLimiter();
  document.getElementById('new-input').value = currentValue;
  document.getElementById('output').value = `${firstValue} ${savedOperator} ${secondValue}`;
}


function displayLimiter() {
  const numberArray = currentValue.split("");
  const decimalIndex = numberArray.indexOf(".")
  const numberLength = numberArray.length

  if (decimalIndex == -1) {
    if (numberLength > 15) {
      setCurrentValue("Overflow")
      setCalculatorState("error")
    }
    return
  }

  if (decimalIndex >= 15) {
    setCurrentValue("Overflow")
    setCalculatorState("error")
    return
  }

  if (decimalIndex <= 14) {
    setCurrentValue(numberArray.join("").substring(0, 15))
  }
}

document.querySelectorAll(".action").forEach(actionButton => {
  actionButton.addEventListener('click', event => {
    switch (event.target.id) {
      case "fraction":
        handleFractionClick()
        break;
      case "square":
        handleSquareClick()
        break;
      case "square-root":
        handleSquareRootClick()
        break;
      case "positive-negative":
        handlePositiveToNagitiveClick()
        break;
    }
    setCurrentValue(currentValue.toLocaleString('en-US', { maximumFractionDigits: 16, useGrouping: false }));
    if (isCurrentValue("NaN") || isCurrentValue("∞")) { setCalculatorState("error") };
    renderDisplay();
  });
});

function handleFractionClick() {
  if (isCalculatorState("calculated")) {
    secondValue = "";
    savedOperator = "";
    setCalculatorState("firstvalue");
  }
  if (isCalculatorState("firstvalue")) {
    firstValue = `1/${currentValue}`;
    setCurrentValue(1 / parseFloat(currentValue));
    setCalculatorState("calculated")
  }
  if (isCalculatorState("secondvalue")) {
    secondValue = `1/${currentValue}`;
    setCurrentValue(1 / parseFloat(currentValue));
  }
}

function handleSquareClick() {
  if (calculatorState == "calculated") {
    secondValue = "";
    savedOperator = "";
    calculatorState = "firstvalue";
  }
  if (calculatorState == "firstvalue") {
    firstValue = "sqr(" + currentValue + ")";
    currentValue = parseFloat(currentValue) ** 2;
    calculatorState = "calculated"
  }
  if (calculatorState == "secondvalue") {
    secondValue = "sqr(" + currentValue + ")";
    currentValue = parseFloat(currentValue) ** 2;
  }
}


function handleSquareRootClick() {
  if (calculatorState == "calculated") {
    secondValue = "";
    savedOperator = "";
    calculatorState = "firstvalue";
  }
  if (calculatorState == "firstvalue") {
    firstValue = `sqrt(${currentValue})`;
    currentValue = Math.sqrt(parseFloat(currentValue));
    calculatorState = "calculated"
  }
  if (calculatorState == "secondvalue") {
    secondValue = `sqrt(${currentValue})`;
    currentValue = Math.sqrt(parseFloat(currentValue));
  }
}


function handlePositiveToNagitiveClick() {
  currentValue.search("-") != -1 ? currentValue = currentValue.substring(1) :
    currentValue = `-${currentValue}`;
}

document.querySelectorAll(".memory").forEach(memoryButton => {
  memoryButton.addEventListener('click', event => {
    const memoryType = event.target.id;
    pressmemoryButton(memoryType);
    renderDisplay();
  });
});

function pressmemoryButton(memoryType) {
  switch (memoryType) {
    case "memoryClear":
      memoryValue = "0";
      break;
    case "memoryRecall":
      setCurrentValue(memoryValue);
      break;
    case "memoryAdd":
      setMemoryValue(add(memoryValue, currentValue));
      setCalculatorState("calculated");
      break;
    case "memorySubtract":
      setMemoryValue(subtract(memoryValue, currentValue));
      setCalculatorState("calculated");
      break;
    case "memorySave":
      setMemoryValue(currentValue);
      setCalculatorState("calculated");
      break;
  }
  setMemoryValue(memoryValue.toLocaleString('fullwide', { useGrouping: false }));
};



//helper functions
function setMemoryValue(value) {
  memoryValue = value
}

function isCalculatorState(state) {
  return calculatorState === state
}

function setCalculatorState(newState) {
  calculatorState = newState
}

function handleZeroPress() {
  if (isCurrentValue('')) {
    alert("Error: No leading zero")
  } else {
    currentValue += "0"
  }
}

function handleDecimalPress() {
  if (currentValue.indexOf('.') >= 0) {
    alert("Error: Already contains decimal")
  } else {
    currentValue += '.'
  }
}


function isCurrentValue(value) {
  return currentValue === value
}

function resetCalculator() {
  firstValue = currentValue;
  currentValue = "";
  secondValue = "";
  calculatorState = "operator";
}

function setCurrentValue(newValue) {
  currentValue = newValue
}

function add(numOne, numTwo) {
  return parseFloat(numOne) + parseFloat(numTwo)
}

function subtract(numOne, numTwo) {
  return parseFloat(numOne) - parseFloat(numTwo)
}

function multiply(numOne, numTwo) {
  return parseFloat(numOne) * parseFloat(numTwo)
}

function divide(numOne, numTwo) {
  return parseFloat(numOne) / parseFloat(numTwo)
}

function expononent(numOne, numTwo) {
  return parseFloat(numOne) ** parseFloat(numTwo)
}