const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startButton = document.querySelector(".start-pause-button");

const logLeft = document.querySelectorAll(".log-left");
const logRight = document.querySelectorAll(".log-right");
const squares = document.querySelectorAll(".grid div");
const carLeft = document.querySelectorAll(".car-left");
const carRight = document.querySelectorAll(".car-right");

let currentInd = 76;
let width = 9;
let timerId;
let currentTime = 20
let outComeTimerId;



const moveFrog = (e) => {
  console.log(e);
  squares[currentInd].classList.remove("frog");
  switch (e.key) {
    case "ArrowLeft":
      if (currentInd % width !== 0) currentInd -= 1;
      break;
    case "ArrowRight":
      if (currentInd % width !== width - 1) currentInd += 1;
      break;
    case "ArrowUp":
      if (currentInd - width >= 0) currentInd -= width;
      console.log("move Up");
      break;
    case "ArrowDown":
      if (currentInd + width < width * width) currentInd += width;
      console.log("move down");
      break;
  }
  squares[currentInd].classList.add("frog");
};



function autoMoveElement() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime
  logLeft.forEach((logLeft) => moveLogLeft(logLeft));
  logRight.forEach((logRight) => moveLogRight(logRight));
  carLeft.forEach((carLeft) => moveCarLeft(carLeft));
  carRight.forEach((carRight) => moveLogRight(carRight));
  
}

function checkOutcomes(){
    lose()
    win()
}
function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}
function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;

    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;

    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;

    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;

    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
  }
}
function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;

    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;

    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");
      break;
  }
}
function moveLogRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");
      break;

    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;

    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
  }
}
function lose(){
    if(squares[currentInd].classList.contains('c1') ||
    squares[currentInd].classList.contains('l4') ||
    squares[currentInd].classList.contains('l5')||
    currentTime <= 0){
        resultDisplay.textContent = 'You Lose!'
        clearInterval(timerId)
        clearInterval(outComeTimerId)
        squares[currentInd].classList.remove('frog')
        document.removeEventListener(("keyup", moveFrog))
    }
}

function win(){
    if(squares[currentInd].classList.contains('ending-block'))
    {
        resultDisplay.textContent = 'You Win!'
        clearInterval(timerId) 
        clearInterval(outComeTimerId)
        document.removeEventListener(("keyup", moveFrog))
    }
}

startButton.addEventListener('click',()=>{
    if(timerId){
        clearInterval(timerId)
        clearInterval(outComeTimerId)
        outComeTimerId = null
        timerId = null;
        document.removeEventListener("keyup", moveFrog)
    }else{
        timerId = setInterval(autoMoveElement, 1000)
        outComeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener("keyup", moveFrog)
    }
})



