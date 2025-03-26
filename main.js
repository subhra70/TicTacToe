const header = document.querySelector("h2");
const start = document.getElementById("start");
const cells = document.querySelectorAll(".cell");
const text1 = "Tic Tac Toe Game";
const text2 = "Play your move within the time";

let boxes = [
  [10, 11, 12],
  [13, 14, 15],
  [16, 17, 18],
];

let time = 0;
let idx = 0;
let flag = 0;
let move = 1;
let begin = 0;
let count = 0;
let win = 0;
let cellCount = 0;
let timerInterval;

function typeHeader() {
  if (flag == 0 && idx == text1.length) {
    flag = 1;
    idx = 1;
    setTimeout(() => {
      header.innerHTML = "P";
      typeHeader();
    }, 1500);
    return;
  } else if (flag == 1 && idx == text2.length) {
    flag = 0;
    idx = 1;
    setTimeout(() => {
      header.innerHTML = "T";
      typeHeader();
    }, 1500);
    return;
  }
  header.innerHTML += flag == 0 ? text1[idx] : text2[idx];
  idx++;
  setTimeout(typeHeader, 100);
}
typeHeader();

start.addEventListener("click", () => {
  begin = 1;
  win = 0; 
  cellCount = 0; 
  move = 1; 
  count = 0;
  clearInterval(timerInterval); 

  // Default board setting
  boxes = [
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18],
  ];

  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("filled"); 
  });

  const select_val = document.getElementById("selection").value;
  let difficulty = document.getElementById("difficulty");

  if (select_val == 0) {
    difficulty.innerHTML = "Easy";
    difficulty.style.backgroundColor = "Green";
    difficulty.style.color = "Black";
  } else if (select_val == 7) {
    difficulty.innerHTML = "Medium";
    difficulty.style.backgroundColor = "Yellow";
    difficulty.style.color = "Black";
  } else {
    difficulty.innerHTML = "Hard";
    difficulty.style.backgroundColor = "Red";
    difficulty.style.color = "Black";
  }

  startTimer();

  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
});

function handleCellClick(event) {
  if (begin === 1 && win === 0 && event.target.innerHTML === "") {
    let cellNo = parseInt(event.target.getAttribute("data-index"));
    cellCount++;

    if (move == 1) {
      event.target.innerHTML = "X";
      move = 2;
      boxes[Math.floor(cellNo / 3)][cellNo % 3] = 1;
    } else {
      event.target.innerHTML = "O";
      move = 1;
      boxes[Math.floor(cellNo / 3)][cellNo % 3] = 2;
    }

    count = 0;
    clearInterval(timerInterval); // clearing the interval s.t. running timer should stopped
    startTimer();

    if (!checkWinner() && cellCount < 9) {
      document.querySelector(".timer").innerHTML = 0;
    }
  }
}

function startTimer() {
  clearInterval(timerInterval);
  count = 0;
  let selectedTime = Number(document.getElementById("selection").value);

  if (selectedTime !== 0) {
    timerInterval = setInterval(() => {
      document.querySelector(".timer").innerHTML = count;

      if (count > selectedTime) {
        move = move === 1 ? 2 : 1;
        count = 0;
        document.querySelector(".timer").innerHTML = count;
      }
      count++;
    }, 1000);
  }
}

function checkWinner() {
  const winningCombos = [
    [boxes[0][0], boxes[0][1], boxes[0][2]],
    [boxes[1][0], boxes[1][1], boxes[1][2]],
    [boxes[2][0], boxes[2][1], boxes[2][2]],
    [boxes[0][0], boxes[1][0], boxes[2][0]],
    [boxes[0][1], boxes[1][1], boxes[2][1]],
    [boxes[0][2], boxes[1][2], boxes[2][2]],
    [boxes[0][0], boxes[1][1], boxes[2][2]],
    [boxes[0][2], boxes[1][1], boxes[2][0]],
  ];

  for (let combo of winningCombos) {
    if (combo[0] === combo[1] && combo[0] === combo[2]) {
      win = combo[0];
      clearInterval(timerInterval); // Stop timer when someone wins
      document.querySelector(".timer").innerHTML = 0;
      document.querySelector(".winner").innerHTML =
        win === 1 ? "Player1" : "Player2";
      document.querySelector(".winner").style.backgroundColor = "chocolate";
      return true;
    }
  }

  if (cellCount === 9) {
    clearInterval(timerInterval); // Stop timer on draw
    document.querySelector(".winner").innerHTML = "Draw";
    document.querySelector(".winner").style.backgroundColor = "chocolate";
    return true;
  }

  return false;
}
