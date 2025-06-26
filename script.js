// Variables for calculations
let num1 = "";
let operator = "";
let num2 = "";

function addInput(a, b) {
  return a + b;
}

function subtractInput(a, b) {
  return a - b;
}

function multiplyInput(a, b) {
  return a * b;
}

function divideInput(a, b) {
  if (b === 0) {
    return "Error";
  } else {
    return a / b;
  }
}
