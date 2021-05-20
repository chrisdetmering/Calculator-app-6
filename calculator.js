let savedOperator = ""
let currentValue = ""
let firstValue = ""
let secondValue = ""
let memoryValue = ""
let calculatorState = "default"

document.querySelectorAll(".numeric").forEach(numberButton => {
  numberButton.addEventListener('click', event => {
    const numberID=event.target.id;
    pressNumberButton(numberID);
    renderDisplay();
 });
});

function pressNumberButton(numberID) {
  if (calculatorState == "default") {calculatorState = "firstvalue"};
  if (calculatorState == "operator") {calculatorState = "secondvalue"};
  if (calculatorState == "calculated" || calculatorState == "error") {
    resetValues();
    calculatorState = "firstvalue"};

  switch(numberID) {
    case "1": currentValue += "1"; break;
    case "2": currentValue += "2"; break;
    case "3": currentValue += "3"; break;
    case "4": currentValue += "4"; break;
    case "5": currentValue += "5"; break;
    case "6": currentValue += "6"; break;
    case "7": currentValue += "7"; break;
    case "8": currentValue += "8"; break;
    case "8": currentValue += "8"; break;
    case "9": currentValue += "9"; break;
    case "0":
      currentValue == "" ? console.log("Error: No leading zero") : currentValue += "0";
      break;
    case ".":
      currentValue.indexOf('.') >= 0 ? console.log("Error: Already contains decimal") : currentValue += ".";
      break;
  }
}

document.querySelectorAll(".operator").forEach(operatorButton => {
  operatorButton.addEventListener('click', event => {
    const operatorID=event.target.id;
    pressOperatorButton(operatorID);
    renderDisplay();
  });
});

function pressOperatorButton(operatorID) {
  if (calculatorState=="default") {
    console.log('Error: operator requires input value')
  } 
  if (calculatorState=="error") {
    resetValues();
  } else {
    if (calculatorState=="firstvalue" || calculatorState=="calculated") {
      firstValue=currentValue;
      currentValue="";
      secondValue="";
      calculatorState="operator";
    }
    if (calculatorState=="secondvalue") {
      calculate();
      firstValue=currentValue;
      currentValue="";
      secondValue="";
      calculatorState="operator";
    }
    switch(operatorID) {
      case "add": savedOperator = "+"; break;
      case "subtract": savedOperator = "-"; break;
      case "multiply": savedOperator = "x"; break;
      case "divide": savedOperator = "/"; break;
      case "exponent": savedOperator = "^"; break;
    };
  } 
}

function calculate() {
  if (calculatorState == "calculated") {
    firstValue=currentValue;
  }
  if (calculatorState == "secondvalue") {
    calculatorState = "calculated"; secondValue=currentValue;
  }
  if (calculatorState == "operator") {
    calculatorState = "calculated";
    secondValue=firstValue;
  }
  switch(savedOperator) {
    case "+": currentValue=parseInt(firstValue)+parseInt(secondValue); break;
    case "-": currentValue=parseInt(firstValue)-parseInt(secondValue);  break;
    case "x": currentValue=parseInt(firstValue)*parseInt(secondValue); break;
    case "/": currentValue=parseInt(firstValue)/parseInt(secondValue); break;
    case "^": currentValue=parseInt(firstValue)**parseInt(secondValue);break;
  }
  currentValue=currentValue.toLocaleString('fullwide', {useGrouping:false});
}

document.getElementById("backspace").addEventListener('click', () => {
  currentValue=currentValue.substring(0, currentValue.length - 1);
  renderDisplay();
});

document.getElementById("clear-entry").addEventListener('click', () => {
  resetValues();
  renderDisplay();
});

document.getElementById("clear-content").addEventListener('click', () => {
  memoryValue = "";
  resetValues();
  renderDisplay();
});

document.getElementById("equals").addEventListener('click', () => {
  calculate();
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

function renderDisplay () {
  displayLimiter();
  console.log(`State: ${calculatorState}`);
  document.getElementById('new-input').value=currentValue;
  document.getElementById('output').value=`${firstValue} ${savedOperator} ${secondValue}`;
}

function displayLimiter() {
  const numberArray=currentValue.split("");
  const decimalIndex=numberArray.indexOf(".")
  const numberLength=numberArray.length
  
  switch (true) {
    case (decimalIndex == -1): 
      if (numberLength > 15) {
        currentValue="Overflow"; calculatorState="error";
      } else {
        currentValue=numberArray.join("");
      }; break;
    
    case (decimalIndex >= 15): 
      currentValue="Overflow"; calculatorState="error"; break;
    
    case (decimalIndex <= 14 ):
      currentValue=numberArray.join("");
      currentValue=currentValue.substring(0,15)
  }
}

/*document.querySelectorAll(".action").forEach(actionButton => {
  actionButton.addEventListener('click', event => {
    if (currentValue !="") {
    switch(event.target.id) {
      case "fraction": secondValue=`1/${currentValue}`;
       currentValue = 1 / parseInt(currentValue);
       currentValue=currentValue.toString(); 
        break;
      case "square": secondValue="sqr("+currentValue+")";
      currentValue = parseInt(currentValue)**2; 
      currentValue=currentValue.toString();
        break;
      case "square-root": secondValue=`sqrt(${currentValue})`;
      currentValue = Math.sqrt(parseInt(currentValue)); 
      currentValue=currentValue.toString();
      if (currentValue=="NaN") {console.log("Cannot take square root of a negative number")}
        break;
      case "positive-negative": currentValue.search("-")!=-1 ?  currentValue=currentValue.substring(1) : currentValue=`-${currentValue}`;
        break;
    }
    renderDisplay();
  }
 });
});*/