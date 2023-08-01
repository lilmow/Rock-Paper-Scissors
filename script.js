let result;
let scores = JSON.parse(localStorage.getItem('scores')) || {
  wins: 0,
  losses: 0,
  draw: 0
}


// Get element from DOM
let resultElement = document.querySelector('.js-result'),
  moveElement = document.querySelector('.js-move'),
  scoreElement = document.querySelector('.js-score'),
  rockBtnElement = document.querySelector('.js-rock-btn'),
  paperBtnElement = document.querySelector('.js-paper-btn'),
  scissorsBtnElement = document.querySelector('.js-scissors-btn'),
  resetScoreElement = document.querySelector('.js-reset-score'),
  confirmationElement = document.querySelector('.js-reset-confirmation'),
  autoPlayElement = document.querySelector('.js-auto-play');
  optionElement = document.querySelectorAll('.option-btn');


// Add eventListener to Buttons
rockBtnElement.addEventListener('click', () => {
  playGame('rock')
})
paperBtnElement.addEventListener('click', () => {
  playGame('paper')
})
scissorsBtnElement.addEventListener('click', () => {
  playGame('scissors')
})
resetScoreElement.addEventListener('click', () => {
  showResetConfirmation()
  // reset()
})
autoPlayElement.addEventListener('click', () => {
  autoPlay()
})

// Loop through each option image element
optionElement.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    // Loop through each option image again
    optionElement.forEach((image2, index2) => {
      // If the current index doesn't match the clicked index
      // Remove the "active" class from the other option images
      index !== index2 && image2.classList.remove("active");
    });
})})


// Generating a Random Move
function pickComputerMove() {
  let randomNumber = Math.floor(Math.random() * 3);

  if (randomNumber <= 0) {
    computerMove = 'rock';
  } else if (randomNumber > 0 && randomNumber <= 1) {
    computerMove = 'paper';
  } else if (randomNumber > 1 && randomNumber <= 3) {
    computerMove = 'scissors';
  }

  return computerMove;
}


function playGame(playerMove) {
  let computerMove = pickComputerMove();

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result =  'Match Draw'
    } else if (computerMove === 'paper') {
      result =  'Computer Won!!'
    } else if (computerMove === 'scissors') {
      result =  'You Won!!'
    }
     
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result =  'You Won!!'
    } else if (computerMove === 'paper') {
      result =  'Match Draw'
    } else if (computerMove === 'scissors') {
      result =  'Computer Won!!'
    }

  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result =  'Computer Won!!'
    } else if (computerMove === 'paper') {
      result =  'You Won!!'
    } else if (computerMove === 'scissors') {
      result =  'Match Draw'
    }
  }


  setTimeout(() => {
    if (result ===  'You Won!!') {
      scores.wins +=1
    } else if ( result ===  'Computer Won!!') {
      scores.losses +=1
    } else if ( result ===  'Match Draw') {
      scores.draw +=1
    }
    saveScore()
    localStorage.setItem('scores', JSON.stringify(scores))

}, 1000)

  // Display  result
  resultElement.innerHTML = 'Wait...'
  setTimeout(() => {
    resultElement.innerHTML = result
  }, 1000)

  // Display move
  setTimeout(() => {
    moveElement.innerHTML = `User <img class="move-emoji" src="images/${playerMove}-emoji.png" alt="Paper Emoji"></img>
    <img class="move-emoji" src="images/${computerMove}-emoji.png" alt="Paper Emoji"></img> Computer`
  }, 1000)
}

// Display score
function saveScore() {
  scoreElement.innerHTML = `Wins: ${scores.wins} <br> Losses: ${scores.losses} <br> Draw: ${scores.draw}`
}
saveScore()

// Reset score
function reset() {
  scores.wins = 0
  scores.losses = 0
  scores.draw = 0
  saveScore()
  localStorage.removeItem('scores')
}

// Reset Confirmation
function showResetConfirmation() {
  confirmationElement.innerHTML = `
    Are you sure you want to reset the score?
    <button class="confirm-btn js-yes-btn">Yes</button>
    <button class="confirm-btn js-no-btn">No</button>
  `

  document.querySelector('.js-yes-btn').addEventListener('click', () =>{
    reset()
    hideResetConfirmation()
  })

  document.querySelector('.js-no-btn').addEventListener('click', () =>{
    hideResetConfirmation()
  })
}

// hide Confirmation
function hideResetConfirmation() {
  confirmationElement.innerHTML = ""
  
}

// AutoPlay
let isAutoPlay = false
let intervalId;

function autoPlay() {
if (!isAutoPlay) {
  intervalId = setInterval(() => {
  playerMove = pickComputerMove()
  playGame(playerMove);
}, 2000)
isAutoPlay = true

  autoPlayElement.innerHTML = 'Stop Playing'
} else {
  clearInterval(intervalId)
isAutoPlay = false

  autoPlayElement.innerHTML = 'Auto Play'
}
}