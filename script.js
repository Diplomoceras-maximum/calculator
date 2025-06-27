// ================================
// Element Selectors
// ================================

// Number and operator buttons
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

// Special buttons
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const plusMinus = document.querySelector(".plus-minus");
const clear = document.querySelector(".clear");
const undo = document.querySelector(".undo");

// Display elements
const currentInput = document.querySelector(".current");
const previousInput = document.querySelector(".previous");

// ================================
// State Variables
// ================================
let inputValue = ""; // Current number being typed
let firstOperand = ""; // First number in the operation
let secondOperand = ""; // Second number in the operation
let operator = ""; // Javascript perator in the operation (+, -, *, /)
let operatorSymbol = ""; // Display operator (÷, x, -, +)

// ================================
// Number Button Click Listener
// ================================
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    // Do not exceed 12 characters when inputing numbers
    if (inputValue.length >= 12) {
      return;
    }

    // If inputValue is 0, replace it with a new input
    if (inputValue === "0") {
      inputValue = button.textContent;
    } else {
      inputValue += button.textContent;
    }
    currentInput.textContent = inputValue;
  });
});

// ================================
// Operator Button Click Listener
// ================================
operators.forEach((button) => {
  button.addEventListener("click", () => {
    // If no input then do nothing
    if (inputValue === "") {
      return;
    }

    // Save first number to firstOperand
    firstOperand = parseFloat(inputValue);

    // Convert symbol and save js friendly operator to operator
    operatorSymbol = button.textContent;
    operator = convertOperator(button.textContent);

    // Show on display
    previousInput.textContent = `${inputValue} ${button.textContent}`;
    currentInput.textContent = "";

    // Clear inputValue to type a fresh number
    inputValue = "";
  });
});

// ================================
// Equals Button Click Listener
// ================================
equals.addEventListener("click", () => {
  // If no input then do nothing
  if (inputValue === "" || operator === "") {
    return;
  }

  // Save second number to secondOperand
  secondOperand = parseFloat(inputValue);

  // Show on display
  previousInput.textContent = `${formatNumber(
    firstOperand
  )} ${operatorSymbol} ${formatNumber(secondOperand)}`;

  // Assign answer to currentInput and continue calculations
  const answer = operate(operator, firstOperand, secondOperand);

  // If divide by 0 display frown face, else format answer and display
  if (answer === "oh_no_you_didnt") {
    currentInput.textContent = "😖";
    inputValue = "0";
  } else {
    const formatAnswer = formatNumber(answer);
    inputValue = formatAnswer;
    currentInput.textContent = formatAnswer;
  }
});

// ================================
// Clear Button Click Listener
// ================================
clear.addEventListener("click", () => {
  // Reset state variables
  inputValue = "";
  firstOperand = "";
  secondOperand = "";
  operator = "";
  operatorSymbol = "";

  // Reset display elements
  currentInput.textContent = "0";
  previousInput.textContent = "0";
});

// ================================
// Undo/Delete Button Click Listener
// ================================
undo.addEventListener("click", () => {
  // If inputValue is longer than 1 charcacter remove 1 from the back
  if (inputValue.length > 1) {
    inputValue = inputValue.slice(0, -1);

    // If inputValue is "-" or empty, inputValue becomes 0
    if (inputValue === "-" || inputValue === "") {
      inputValue = "0";
      currentInput.textContent = inputValue;
      return;
    }
    currentInput.textContent = inputValue;
  } else {
    inputValue = "0";
    currentInput.textContent = inputValue;
  }
});

// ================================
// Plus-Minus Button Click Listener
// ================================
plusMinus.addEventListener("click", () => {
  if (inputValue.includes("-")) {
    inputValue = inputValue.slice(1); // If inputValue has a minus, remove it
  } else if (inputValue === "0" || inputValue === "") {
    return; // prevents toggle on empty and 0 inputValue
  } else {
    inputValue = "-" + inputValue; // Else convert inputValue to a minus
  }
  currentInput.textContent = inputValue;
});

// ================================
// Decimal Button Click Listener
// ================================
decimal.addEventListener("click", () => {
  // If inputValue doesnt have a decimal point and isnt empty, add a decimal point
  if (!inputValue.includes(".")) {
    if (inputValue === "") {
      inputValue = "0";
    } else {
      inputValue += ".";
    }
    currentInput.textContent = inputValue;
  }
});

// ================================
// Utility Functions
// ================================

// Convert display symbol to a javascript usable operator
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

// Calls the respective arithmetic function
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
    return "oh_no_you_didnt";
  } else {
    return a / b;
  }
}

// Format numbers to remove unnecessary 0s and limit length of long numbers including decimals
function formatNumber(num) {
  // Numbers more than 12 characters +/- are converted to exponential (4sf)
  if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-12 && num !== 0)) {
    return num.toExponential(4);
  } else {
    let str = parseFloat(num.toPrecision(12)).toString(); // Else format number to 12 characters

    // Trim trailing zeroes and decimals
    str = str.replace(/\.0+$|(\.\d*?)0+$/, "$1");

    // Ensure max 12 characters
    if (str.length > 12) {
      return str.slice(0, 12);
    } else {
      return str;
    }
  }
}
