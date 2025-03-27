const header = document.getElementById("header");
const start = document.getElementById("start");
const cells = document.querySelectorAll(".cell");
const timerDisplay = document.querySelector(".timer");
const text1 = "Tic Tac Toe Game";
const text2 = "Play your move within the time";
let move = 1;
let win = 0;
let timerInterval;
let cellCount = 0;
let count = 0;
let begin = 0;
let select=0;
let flag=0;
let idx=0;

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
  document.querySelector(".winner").innerHTML = "Winner";
  timerDisplay.innerHTML = 0;
  startTimer();

  cells.forEach((cell) => {
    cell.querySelector(".cross").style.display = "none";
    cell.querySelector(".circle").style.display = "none";
  });

});

document.getElementById("selection").addEventListener('change', () => {
  const select_val = document.getElementById("selection").value;
  console.log(select_val);
  
  let difficulty = document.getElementById("difficulty");
  select=1;

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
});

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
  if (begin === 1 && win === 0 && select===1) {
    let cell = event.target.closest(".cell");
    if (!cell) return;

    let cross = cell.querySelector(".cross");
    let circle = cell.querySelector(".circle");
    if (cross.style.display === "block" || circle.style.display === "block")
      return;

    cellCount++;

    if (move === 1) {
      cross.style.display = "block";
      move = 2;
    } else {
      circle.style.display = "block";
      move = 1;
    }

    count = 0;
    clearInterval(timerInterval);
    startTimer();
    checkWinner();
  }
  else if(select===0)
  {
    alert("Select the difficulty mode");
  }
  else if(begin===0)
  {
    alert("Click the start button to start")
  }
}

function startTimer() {
  clearInterval(timerInterval);
  count = 0;
  let selectedTime = Number(document.getElementById("selection").value);
  if (selectedTime !== 0) {
    timerInterval = setInterval(() => {
      timerDisplay.innerHTML = count;
      if (count > selectedTime) {
        move = move === 1 ? 2 : 1;
        count = 0;
        timerDisplay.innerHTML = count;
      }
      count++;
    }, 1000);
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    let crossA = cells[a].querySelector(".cross").style.display;
    let crossB = cells[b].querySelector(".cross").style.display;
    let crossC = cells[c].querySelector(".cross").style.display;
    let circleA = cells[a].querySelector(".circle").style.display;
    let circleB = cells[b].querySelector(".circle").style.display;
    let circleC = cells[c].querySelector(".circle").style.display;

    if (crossA === "block" && crossB === "block" && crossC === "block") {
      win = 1;
      document.querySelector(".winner").innerHTML = "Player1";
      document.querySelector(".winner").style.backgroundColor = "goldenrod";
      clearInterval(timerInterval);
      document.getElementById("start").innerHTML = "Reset & Start";
      return;
    }
    if (circleA === "block" && circleB === "block" && circleC === "block") {
      win = 2;
      document.querySelector(".winner").innerHTML = "Player2";
      document.querySelector(".winner").style.backgroundColor = "goldenrod";
      document.querySelector;
      clearInterval(timerInterval);
      document.getElementById("start").innerHTML = "Reset & Start";
      return;
    }
    // if (cellCount == 9 && win!=1 && win!=2) {
    //   document.querySelector(".winner").innerHTML = "Draw";
    //   document.querySelector(".winner").style.backgroundColor = "goldenrod";
    //   clearInterval(timerInterval);
    //   document.getElementById("start").innerHTML = "Reset & Start";
    //   return;
    // }
  }
}
