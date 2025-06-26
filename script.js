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
    // Do not exceed 12 characters when inputing numbers
    if (inputValue.length >= 12) {
      return;
    }

    if (inputValue === "0") {
      // If inputValue is 0, replace it with a new input
      inputValue = button.textContent;
    } else {
      inputValue += button.textContent;
    }
    currentInput.textContent = inputValue;
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
    previousInput.textContent = `${inputValue} ${button.textContent}`;
    currentInput.textContent = "";

    // Clear inputValue to type a fresh number
    inputValue = "";
  });
});

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

  // Assign anser to currentInput and continue calculations
  const answer = operate(operator, firstOperand, secondOperand);

  if (answer === "oh_no_you_didnt") {
    currentInput.textContent = "😖";
    inputValue = "0";
  } else {
    const formatAnswer = formatNumber(answer, false);
    inputValue = formatAnswer;
    currentInput.textContent = formatAnswer;
  }
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
    return "oh_no_you_didnt";
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

// Delete last character
undo.addEventListener("click", () => {
  if (inputValue.length > 1) {
    inputValue = inputValue.slice(0, -1);

    if (inputValue === "-" || inputValue === "") {
      inputValue = "0";
      currentInput.textContent = inputValue;
      return;
    }
    currentInput.textContent = inputValue;
  } else {
    inputValue = "";
    currentInput.textContent = "0";
  }
});

// Toggle between positive or negative number
plusMinus.addEventListener("click", () => {
  if (inputValue.includes("-")) {
    inputValue = inputValue.slice(1);
  } else if (inputValue === "0" || inputValue === "") {
    return; // prevents toggle on empty and 0 inputValue
  } else {
    inputValue = "-" + inputValue;
  }
  currentInput.textContent = inputValue;
});

// Add decimal point
decimal.addEventListener("click", () => {
  if (!inputValue.includes(".")) {
    if (inputValue === "") {
      inputValue = "0";
    } else {
      inputValue += ".";
    }
    currentInput.textContent = inputValue;
  }
});

// Format numbers to ensure no more than 6 decimal places show
function formatNumber(num) {
  if (!isFinite(num)) {
    return "Error";
  }

  let str = num.toString();

  if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-12 && num !== 0)) {
    return num.toExponential(4);
  } else {
    str = parseFloat(num.toPrecision(12)).toString();
  }

  // Trim trailing zeroes and decimals
  str = str.replace(/\.0+$|(\.\d*?)0+$/, "$1");

  // Ensure max 12 characters
  return str.length > 12 ? str.slice(0, 12) : str;
}
