function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1/num2;
}

let num1 = 0;
let operator = ""
let num2 = 0;

function operate(num1, operator, num2) {
  if (operator == "+") {
    return add(num1, num2);
  }
  else if (operator == "*") {
    return multiply(num1, num2);
  }
  else if (operator == "-") {
    return subtract(num1, num2);
  }
  else if (operator == "/") {
    if (num2 == 0) {
      alert("Can't divide by 0, you fool");
      return;
    }
    return divide(num1, num2);
  }
}

// Creating the display
const btn_arr = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
const container = document.querySelector(".container");
const rect = container.getBoundingClientRect();
const width = rect.width;
const height = rect.height;
const text = document.querySelector(".display h1");
const clear = document.querySelector(".clear");

decimal_click = false;
resetDisplay = false;

for (let i = 0; i < 16; ++i) {
  const btn = document.createElement("button");
  btn.textContent = btn_arr[i];
  btn.style.width = `${width/4}px`;
  btn.style.height = `${height/5}px`;
  btn.style.backgroundColor = "#b491c8";

  container.appendChild(btn);
  if (btn_arr[i] != "+" && btn_arr[i] != "-" && btn_arr[i] != "*" && btn_arr[i] != "/" && btn_arr[i] != "=") {
    btn.addEventListener("click", () => {if (!decimal_click && btn.textContent == ".") {decimal_click = true;} 
    else if (decimal_click && btn.textContent == ".") {return;}
    if (resetDisplay) {
      text.textContent = "";
      resetDisplay = false;
    }
    text.textContent = text.textContent + btn.textContent;
    if (operator == "") {
      num1 = parseFloat(text.textContent);
     }
     else {
      num2 = parseFloat(text.textContent);
     }
    });
  }
  if (btn_arr[i] == "+" || btn_arr[i] == "-" || btn_arr[i] == "*" || btn_arr[i] == "/") {
    btn.addEventListener("click", () => {if (num1 != 0 && num2 != 0) {
      text.textContent = (operate(num1, operator, num2)).toString(); num1 = parseFloat(text.textContent);
      num2 = 0; operator = btn.textContent; resetDisplay = true;
    }
    else {
      operator = btn.textContent;
      decimal_click = false;
      resetDisplay = true;
    }
    });
  }
  if (btn_arr[i] == "=") {
    btn.addEventListener("click", () => {text.textContent = (operate(num1, operator, num2)).toString();
      operator = "";
      decimal_click = false;
      num1 = parseFloat(text.textContent);
      num2 = 0;
    }
    );
  }
}

clear.addEventListener("click", () => {text.textContent = "";
  decimal_click = false;
  num1 = 0;
  num2 = 0;
  operator = "";
});


