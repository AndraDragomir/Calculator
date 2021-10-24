const allNr = document.querySelectorAll('button.number-btn');
const displayedNumber = document.querySelector('.displayed-number');

const additionBtn =   document.querySelector('.add-btn');
const AcBtn = document.querySelector('.ac-btn');
const negateBtn = document.querySelector('.negate-displayed-number-btn');
const percentBtn = document.querySelector('.percent-btn');
const divideBtn = document.querySelector('.divide-btn');
const multiplyBtn = document.querySelector('.multiply-btn');
const substractBtn = document.querySelector('.substract-btn');
const addBtn = document.querySelector('.add-btn');
const equalBtn = document.querySelector('.equal-btn');
const commaBtn = document.querySelector('.comma');

const operationBtns = document.querySelectorAll('.operation-btn');

let currentNumber = 0;
let previousNumber = 0;
let sum = 0;
let operationSign = ''
let isCommaBtnClicked = false;
let countDecimals = 0;

AcBtn.addEventListener('click', () => {
  previousNumber = 0;
  currentNumber = 0;
  displayedNumber.innerText = 0;
  operationSign = '';
  resetDecimalNumber();
})

negateBtn.addEventListener('click', () => {
  currentNumber =  currentNumber * (-1);
  showDisplayedNumber(currentNumber);
  
}) 

commaBtn.addEventListener('click', () => {
  isCommaBtnClicked = true;
  showDisplayedNumber(currentNumber);

})

percentBtn.addEventListener('click',() => {
  currentNumber = currentNumber / 100;
  showDisplayedNumber(currentNumber);
  if(operationSign !== '') {
    previousNumber = previousNumber / 100;
    showDisplayedNumber(previousNumber);
  }

})


operationBtns.forEach(operation => 
  operation.addEventListener('click', () => {
    if (operationSign === '') { 
      previousNumber = currentNumber;
      operationSign = operation.innerText;
      showDisplayedNumber(previousNumber);
      resetDecimalNumber();
    } 
    else if (operationSign === '+') {
      previousNumber = currentNumber + previousNumber;
      operationSign = operation.innerText;
      showDisplayedNumber(previousNumber);
      resetDecimalNumber();
    } 

    else if (operationSign ==='-') {
      previousNumber = previousNumber - currentNumber;
      operationSign = operation.innerText;
      showDisplayedNumber(previousNumber);  
      resetDecimalNumber();
    } 

    else if (operationSign === 'x') {
      previousNumber = previousNumber * currentNumber;
      operationSign = operation.innerText;
      showDisplayedNumber(previousNumber);
      resetDecimalNumber();
    } 

    else if (operationSign === '/') {
      previousNumber = previousNumber / currentNumber;
      operationSign = operation.innerText;
      showDisplayedNumber(previousNumber);
      resetDecimalNumber();
    } 

    else if (operationSign === '=') {
      operationSign = operation.innerText;
      showDisplayedNumber(previousNumber);
      resetDecimalNumber();
        if(previousNumber === 0) {
          // cand apas pe un nr si dupa pe =  sa lase numarul ala si sa nu schimbe nimic
          showDisplayedNumber(currentNumber);
        }
    }
    
    currentNumber = 0;
})
)


allNr.forEach(number => 
  number.addEventListener('click', () => {
    if(isCommaBtnClicked === false){
      if (currentNumber >= 0){
        // 5 * 10 = 50 + 6 = 56 
        currentNumber = currentNumber * 10 +  Number(number.innerText);
      }else{
        // -5 * 10 = -50 - 6 = -56
        currentNumber = currentNumber * 10 -  Number(number.innerText);
      }
    }
    else{
      countDecimals++;
      if(currentNumber >= 0) {
        currentNumber = currentNumber + (Number(number.innerText) / Math.pow(10, countDecimals));
      } else{
        currentNumber = currentNumber - (Number(number.innerText) / Math.pow(10, countDecimals));
      }
    }
    showDisplayedNumber(currentNumber);
    
  })
)


  function resetDecimalNumber(){
    isCommaBtnClicked = false;
    countDecimals = 0;
  }

  function showDisplayedNumber(number) {
    // console.log('isCommaBtnClicked',isCommaBtnClicked);
    // console.log('countDecimals', countDecimals);
    if(isCommaBtnClicked === true && countDecimals === 0){
      displayedNumber.innerText = String(number) + ','
    }else{
      number = String(number).replace('.',',')
      displayedNumber.innerText = number;
    }
  }

