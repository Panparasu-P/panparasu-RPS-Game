document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissor');
  } else if (event.key === 'a') {
    autoPlay();
  }
});

let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
}
    const confirm = document.querySelector('.popUp');
      const unconfirm = document.querySelector('.js-reset');
      unconfirm.addEventListener('click', () => {
        confirm.innerHTML = `Are you sure you want to reset the score?    
        <button class='yesButton'>Yes</button> 
        <button class='noButton'>No</button>
    `;
     const yes = document.querySelector('.yesButton');
     yes.addEventListener('click',() => {
        score.Wins = 0;
        score.Losses = 0;
        score.Ties = 0;
        updateScore();
        localStorage.removeItem('score');
      if(yes.innerText === 'Yes'){
        confirm.innerText = '';
      }
     });
     const no = document.querySelector('.noButton');
     no.addEventListener('click',()=>{
      if(no.innerText === 'No'){
      confirm.innerText = '';
     }
     });
      });

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputermove();
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
const autoElement = document.querySelector('.js-autoPlay');

autoElement.addEventListener('click', () => {
  autoPlay()
  if (autoElement.innerText === 'Auto Play') {
    autoElement.innerText = 'Stop Play';
    autoElement.classList.add('stopPlay');
  } else {
    autoElement.innerText = 'Auto Play';
    autoElement.classList.remove('stopPlay');
  }
});


document.querySelector('.playRock').addEventListener('click', () => playGame('Rock'));
document.querySelector('.playPaper').addEventListener('click', () => playGame('Paper'));
document.querySelector('.playScissor').addEventListener('click', () => playGame('Scissor'));


function playGame(playerMove) {
  const computermove = pickComputermove();
  let result = '';
  if (playerMove === 'Rock') {
    if (computermove === 'Rock') {
      result = 'Tie';
    } else if (computermove === 'Paper') {
      result = 'You Lose';
    } else if (computermove === 'Scissor') {
      result = 'You Win';
    }
  } else if (playerMove === 'Paper') {
    if (computermove === 'Rock') {
      result = 'You Win';
    } else if (computermove === 'Paper') {
      result = 'Tie';
    } else if (computermove === 'Scissor') {
      result = 'You Lose';
    }
  } else if (playerMove === 'Scissor') {
    if (computermove === 'Rock') {
      result = 'You Lose';
    } else if (computermove === 'Paper') {
      result = 'You Win';
    } else if (computermove === 'Scissor') {
      result = 'Tie';
    }
  }
  if (result === 'You Win') {
    score.Wins += 1;
  } else if (result === 'You Lose') {
    score.Losses += 1;
  } else if (result === 'Tie') {
    score.Ties += 1;
  }

  updateScore();
  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = `${result}`;

  document.querySelector('.js-move').innerHTML = `
  You picked<img src="${playerMove}-emoji.png"> <img src="${computermove}-emoji.png">Computer picked 
  `;
}

function updateScore() {
  document.querySelector('.js-score').innerHTML = `Wins:${score.Wins}. Losses:${score.Losses}. Ties${score.Ties}`;
}

function pickComputermove() {
  let computermove = '';
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computermove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computermove = 'Paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computermove = 'Scissor';
  }
  return computermove;
}