import *as sound from './sound.js';

const $cardContainer = document.querySelector(".card-container");
const $cards = document.querySelectorAll(".card");
const $startButton = document.querySelector(".start-button");
const $restartButton = document.querySelector(".restart-button");
const $gameInfo = document.querySelector(".info");
const $timerTime = document.querySelector(".timer-time");
const $stateEmblem = document.querySelector(".state-emblem");

$cardContainer.addEventListener("click", handleCardClick);
$startButton.addEventListener("click", handleStartClick);
$restartButton.addEventListener("click", handleRestartClick);
$startButton.addEventListener("mouseenter",function() {sound.playStart();});
$startButton.addEventListener("mouseleave",function() {sound.stopStart();});``

const defaultImage = "./img/hyundai.jpg"
const totalEmblem = 8;
let emblemOpened;
let isCardOpening = false;
const randomCardArray = [];
const cardsOpened = [];
let timer;
let timeLeft;

function randomImage() {
  randomCardArray.splice(0);
  for (let i = 0; i < 2; i++) {
    randomCardArray.push(["./img/lamborghini.jpg",Math.random()]);
    randomCardArray.push(["./img/ferrari.jpg",Math.random()]);
    randomCardArray.push(["./img/bugatti.jpg",Math.random()]);
    randomCardArray.push(["./img/porsche.jpg",Math.random()]);
    randomCardArray.push(["./img/rolls-royce.jpg",Math.random()]);
    randomCardArray.push(["./img/maserati.jpg",Math.random()]);
    randomCardArray.push(["./img/aston-martin.jpg",Math.random()]);
    randomCardArray.push(["./img/bentley.jpg",Math.random()]);
  }
  randomCardArray.sort((a,b) => {
    return a[1]-b[1];
  });
}

function handleStartClick() {
  sound.stopStart();
  sound.playClick();
  sound.playBg();
  emblemOpened = 0
  timeLeft = 30;
  randomImage();

  $startButton.classList.toggle("hidden");
  $restartButton.classList.toggle("hidden");
  $gameInfo.classList.toggle("hidden"); 
  $cardContainer.style.background = 'none';
  $cards.forEach((card) => {
    card.src = defaultImage
    card.classList.remove("hidden");
    card.classList.remove("open");
  })
  
  $timerTime.textContent = timeLeft;
  $stateEmblem.textContent = totalEmblem - emblemOpened;
  
  timer = setInterval(function request() {
    if(timeLeft <= 0){
      failGame();
      return
    }
    timeLeft -= 1;
    $timerTime.textContent = timeLeft;
  },1000);
}

function endGame(){
  sound.stopBg();
  clearTimeout(timer);
  $cardContainer.style.background ="";
  $cards.forEach((card) => {
    card.classList.add("hidden");
  })
}

function failGame() {
  sound.playFail();
  endGame();
  $cardContainer.classList.add("gameover");
}

function handleRestartClick() {
  sound.stopWin();
  sound.stopBg();
  sound.playClick();
  clearTimeout(timer);
  $cards.forEach((card) => {
    card.classList.add("hidden");
  })
  $cardContainer.style.background = "";
  $startButton.classList.toggle("hidden");
  $restartButton.classList.toggle("hidden");
  $gameInfo.classList.toggle("hidden");
  $cardContainer.classList.remove("gameover");
  $cardContainer.classList.remove("win");
}

function handleCardClick(event) {
  if(event.target.className !== "card") {
    return
  }
  if(isCardOpening) {
    return
  }

  event.target.classList.toggle("open");
  event.target.src = randomCardArray[event.target.id][0];
  cardsOpened.push(event.target);
  checkCards();
}

function checkCards() {
  if(cardsOpened.length !== 2) {
    return
  }
  
  isCardOpening = true;
  
  if(cardsOpened[0].src !== cardsOpened[1].src) {
    sound.playWrong();
    setTimeout(() => {
      $cards[cardsOpened[0].id].src = defaultImage;
      $cards[cardsOpened[0].id].classList.toggle("open");
      $cards[cardsOpened[1].id].src = defaultImage;
      $cards[cardsOpened[1].id].classList.toggle("open");
      cardsOpened.splice(0,2);
      isCardOpening = false;
    },500);
    return
  }

  sound.playCorrect();
  isCardOpening = false;
  emblemOpened += 1;
  $stateEmblem.textContent = (totalEmblem - emblemOpened);
  cardsOpened.splice(0);
  
  if(totalEmblem - emblemOpened === 0) {
    setTimeout(() => {
      endGame();
      $cardContainer.classList.add("win");
      sound.playWin();
    },300);
  }
}
