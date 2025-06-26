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

console.log(operate(operator, num1, num2));

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const plusMinus = document.querySelector(".plus-minus");
const clear = document.querySelector(".clear");
const undo = document.querySelector(".undo");

let currentInput = document.querySelector(".current");
let previousInput = document.querySelector(".previous");

let inputValue = "";

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    inputValue += button.textContent;
    if (inputValue.length <= 15) {
      currentInput.textContent = inputValue;
    }
  });
});

// Converts symbol to a usable operator
function convertOperator(symbol) {
  if (symbol === "&#247;") {
    return "/";
  } else if (symbol === "&#215;") {
    return "*";
  } else if (symbol === "&#8722;") {
    return "-";
  } else if (symbol === "&#43;") {
    return "+";
  } else {
    return "Error: Operator";
  }
}
