let savedOperator = ""
let currentValue = ""
let firstValue = ""
let secondValue = ""
let memoryValue = ""

function renderDisplay () {
  document.getElementById('new-input').value=currentValue;
  document.getElementById('output').value=`${firstValue} ${savedOperator} ${secondValue}`;
}

document.querySelectorAll(".numeric").forEach(numberButton => {
  numberButton.addEventListener('click', event => {
    validate();
    switch(event.target.id) {
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
    renderDisplay()
 });
});

function validate() {
  //account for previous equation state
}

document.querySelectorAll(".operator").forEach(operatorButton => {
  operatorButton.addEventListener('click', event => {
    if (currentValue=="0" || currentValue=="") {
      console.log('Error: operator requires input value')
    } else if (firstValue!="") {
      console.log("I'm calculating!")
      //calculate()
    } else {
      const newOperator=event.target.id
      addOperator(newOperator)
    }
    renderDisplay()
  });
});

function addOperator(newOperator) {
  switch(newOperator) {
    case "add": savedOperator = "+"; break;
    case "subtract": savedOperator = "-"; break;
    case "multiply": savedOperator = "x"; break;
    case "divide": savedOperator = "/"; break;
    case "exponent": savedOperator = "^"; break;
  }
  firstValue=currentValue;
  currentValue="";
}

//function calculate() {}

document.querySelectorAll(".action").forEach(actionButton => {
  actionButton.addEventListener('click', event => {
    if (currentValue !="") {
    switch(event.target.id) {
      case "fraction": firstValue=`1/${currentValue}`;
       currentValue = 1 / parseInt(currentValue);
       currentValue=currentValue.toString(); 
        break;
      case "square": firstValue=`sqr(${currentValue})`;
      currentValue = parseInt(currentValue)**2; 
      currentValue=currentValue.toString();
        break;
      case "square-root": firstValue=`sqrt(${currentValue})`;
      currentValue = Math.sqrt(parseInt(currentValue)); 
      currentValue=currentValue.toString();
      if (currentValue=="NaN") {console.log("Cannot take square root of a negative number")}
        break;
      case "positive-negative": currentValue.search("-")!=-1 ?  currentValue=currentValue.substring(1) : currentValue=`-${currentValue}`;
        break;
    }
    renderDisplay()
  }
 });
});

document.getElementById("backspace").addEventListener('click', () => {
  currentValue=currentValue.substring(0, currentValue.length - 1);
  renderDisplay()
});

document.getElementById("clear-entry").addEventListener('click', () => {
  savedOperator = ""; currentValue = ""; firstValue = ""; secondValue = "";
  renderDisplay();
});

document.getElementById("clear-content").addEventListener('click', () => {
  savedOperator = ""; currentValue = ""; firstValue = ""; secondValue = ""; memoryValue = "";
  renderDisplay()
});



















