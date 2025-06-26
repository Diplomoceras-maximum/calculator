// Variables for calculations
let num1 = 5;
let operator = "+";
let num2 = 3;

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

function operate(operator, a, b) {
  if (operator === "+") {
    return addInput(a, b);
  } else if (operator === "-") {
    return subtractInput(a, b);
  } else if (operator === "*") {
    return multiplyInput(a, b);
  } else if (operator === "/") {
    return divideInput(a, b);
  } else {
    return "Error";
  }
}

console.log(operate(operator, num1, num2));
