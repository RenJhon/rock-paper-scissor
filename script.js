const playerBtn = document.querySelectorAll('[data-button]');
const scoreVal = document.querySelector('.score');
const resetBtn = document.querySelector('.reset')
const score = JSON.parse(localStorage.getItem('score'))||{
  wins: 0,
  losses: 0,
  ties: 0
};
let isAutoPlaying = false;
let setIntervalID;
resetBtn.addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
})
const moveP = ['rock', 'paper', 'scissors'];
playerBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    playGame(moveP[index]);
  });
});
/*
playerBtn.forEach(button => {
  const value = button.dataset.button;
  button.addEventListener('click', () => {
    playGame(value);
  })
})
*/
function updateScore() {
  return scoreVal.innerHTML = `Wins : ${score.wins} Losses : ${score.losses} Ties : ${score.ties}`;
}
function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === computerMove) {
      result = 'It\'s a tie!'
    } else if (playerMove === 'rock' && computerMove === 'scissors') {
      result = 'You win!'
    } else if (playerMove === 'paper' && computerMove === 'rock') {
      result = 'You win!'
    } else if (playerMove === 'scissors' && computerMove === 'paper') {
      result = 'You win!'
    } else {
      result = 'You lose!'
    }
  if(result === 'You win!'){
    score.wins++
  }else if(result === 'You lose!'){
    score.losses++
  }else{
    score.ties++
  }
  document.querySelector('.moves').innerHTML = 
  `   you      
  
      <img src="${playerMove}.png" class="move-icon" alt="">
      <img src="${computerMove}.png" class="move-icon" alt="img/roc">
      computer `
  ;
  document.querySelector('.result').innerHTML = `Result : ${result}`
  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
}
function pickComputerMove() {
  const random = Math.floor(Math.random() * 3);
  let computerMove = '';
  if(random === 0){
    computerMove = 'rock';
  }else if(random === 1){
    computerMove = 'paper';
  }else if(random === 2){
    computerMove = 'scissors';
  }
  return computerMove;
}

function autoPlay(){
  if(!isAutoPlaying){
  setIntervalID = setInterval(function(){
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1000);
  isAutoPlaying = true;
  document.querySelector('.auto-play-btn').style.background = "orangered";
  }else {
    clearInterval(setIntervalID);
    isAutoPlaying = false;
    document.querySelector('.auto-play-btn').style.background = "limegreen";
  }
  return;
};