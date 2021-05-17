let operator = ""
let currentValue = ""
let previousValue = ""
let memoryValue = ""


document.querySelectorAll(".numeric").forEach(numberButton => {
    numberButton.addEventListener('click', event => {
      switch(event.target.id) {
        case "1":
          currentValue += "1";
          break;
        case "2":
          currentValue += "2";
          break;
        case "3":
          currentValue += "3";
          break;
        case "4":
          currentValue += "4";
          break;
        case "5":
          currentValue += "5";
          break;
        case "6":
          currentValue += "6";
          break;
        case "7":
          currentValue += "7";
          break;
        case "8":
          currentValue += "8";
          break;
        case "8":
          currentValue += "8";
          break;
        case "9":
          currentValue += "9";
          break;
        case "0":
          currentValue == "" ? console.log("Error: No leading zero") : currentValue += "0"
          break;
        case ".":
          currentValue.indexOf('.') >= 0 ? console.log("Error: Already contains decimal") : currentValue += "."
          break;
        
        
      }

      renderDisplay()
 });
});

function addZero() {


}


function renderDisplay () {
  document.getElementById('new-input').value=currentValue;
  document.getElementById('output').value=previousValue;
}