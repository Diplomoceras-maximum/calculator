// // Variables for calculations
// let num1 = 5;
// let operator = "+";
// let num2 = 3;

// function addInput(a, b) {
//   return a + b;
// }

// function subtractInput(a, b) {
//   return a - b;
// }

// function multiplyInput(a, b) {
//   return a * b;
// }

// function divideInput(a, b) {
//   if (b === 0) {
//     return "Error";
//   } else {
//     return a / b;
//   }
// }

// function operate(operator, a, b) {
//   if (operator === "+") {
//     return addInput(a, b);
//   } else if (operator === "-") {
//     return subtractInput(a, b);
//   } else if (operator === "*") {
//     return multiplyInput(a, b);
//   } else if (operator === "/") {
//     return divideInput(a, b);
//   } else {
//     return "Error";
//   }
// }

// console.log(operate(operator, num1, num2));

// Variables
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const plusMinus = document.querySelector(".plus-minus");
const clear = document.querySelector(".clear");
const undo = document.querySelector(".undo");

const currentInput = document.querySelector(".current");
const previousInput = document.querySelector(".previous");

let inputValue = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";
let operatorSymbol = "";

// Event Listeners
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    inputValue += button.textContent;
    if (inputValue.length <= 15) {
      currentInput.textContent = inputValue;
    }
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    // If no input then do nothing
    if (inputValue === "") {
      return;
    }

    // Save first number to firstOperand
    firstOperand = parseFloat(inputValue);

    // Convert symbol and save operator to operator
    operatorSymbol = button.textContent;
    operator = convertOperator(button.textContent);

    // Show on display
    previousInput.textContent = `${firstOperand} ${button.textContent}`;
    currentInput.textContent = "";

    // Clear inputValue to type a fresh number
    inputValue = "";
  });
});

equals.addEventListener("click", () => {
  // If no input then do nothing
  if (inputValue === "") {
    return;
  }
  if (operator === "") {
    return;
  }

  // Save second number to secondOperand
  secondOperand = parseFloat(inputValue);

  // Show on display
  previousInput.textContent = `${firstOperand} ${operatorSymbol} ${secondOperand}`;

  // Assign anser to currentInput and continue calculations
  const answer = operate(operator, firstOperand, secondOperand);
  currentInput.textContent = answer;
  inputValue = answer.toString();
});

// Symbol Converter Function (converts symbols to operators js understands)
function convertOperator(symbol) {
  if (symbol === "÷") {
    return "/";
  } else if (symbol === "x") {
    return "*";
  } else if (symbol === "-") {
    return "-";
  } else if (symbol === "+") {
    return "+";
  } else {
    return "Error: Operator";
  }
}

// Operation Function (calls the respective arithmetic function)
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
    return "Error: Calling operator functions";
  }
}

// Addition Function
function addInput(a, b) {
  return a + b;
}

// Subtraction Function
function subtractInput(a, b) {
  return a - b;
}

// Multiplication Function
function multiplyInput(a, b) {
  return a * b;
}

// Division Function
function divideInput(a, b) {
  if (b === 0) {
    return "0";
  } else {
    return a / b;
  }
}

// Clear everything and reset to initial state
clear.addEventListener("click", () => {
  // Reset variables
  inputValue = "";
  firstOperand = "";
  secondOperand = "";
  operator = "";
  operatorSymbol = "";

  // Reset display
  currentInput.textContent = "0";
  previousInput.textContent = "0";
});
