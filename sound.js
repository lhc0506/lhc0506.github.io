const startSound = new Audio('./audio/start.mp3');
const clickSound = new Audio('./audio/click.mp3');
const wrongSound = new Audio('./audio/wrong.mp3');
const correctSound = new Audio('./audio/correct.mp3');
const failSound = new Audio('./audio/fail.mp3');
const bgSound = new Audio('./audio/Mad-Max_ost.mp3');
const winSound = new Audio('./audio/win.mp3');

function playSound(sound) {
  sound.autoplay = true;
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

export function playStart() {
  startSound.volume = 0.5;
  playSound(startSound);
}

export function playClick() {
  playSound(clickSound);
}

export function playWrong() {
  wrongSound.currentTime = 2;
  wrongSound.play();
}

export function playFail() {
  playSound(failSound);
}

export function playCorrect() {
  correctSound.currentTime = 1;
  correctSound.play();
}

export function playBg() {
  playSound(bgSound);
}

export function playWin() {
  playSound(winSound);
}

export function stopBg() {
  bgSound.volume = 0.3;
  stopSound(bgSound);
}

export function stopStart() {
  stopSound(startSound);
}

export function stopWin() {
  stopSound(winSound);
}