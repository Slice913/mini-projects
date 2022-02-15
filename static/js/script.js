// chalenge 1: your age in days


function ageInDays() {
    let birthYear = prompt('What year were you born?');
    let ageInDayss = (2021 - birthYear) * 365;
    let h1 = document.createElement('h1');
    let textAnwser = document.createTextNode(`You are ${ageInDayss} days old`);
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnwser);
    document.getElementById('flex-box-result').appendChild(h1);
}


function reset() {   
    document.getElementById("ageInDays").remove();
}


// Challenge 2: generates cat image and display the image on the page.
 function generateCat() {
    let image = document.createElement('img');
    let div =  document.getElementById('flex-cat-gen');
    image.src = "https://placekitten.com/200/300";
    div.appendChild(image);
} 

// Challenge 3: Rock, Paper, Scissors
rpsGame = (yourChoice) => {
  console.log(yourChoice)
  let humanChoice, botChoice;
  humanChoice = yourChoice.id

  botChoice = numberToChoice(randToRpsInt()); // botChoice. random interger passed into numnberToChoice

  results = decideWinner(humanChoice, botChoice); // returns the winner of the game. [0, 1] human lost | bot won message
  console.log(results)

  botChoice = numberToChoice(randToRpsInt());
  console.log('Computer Choice:',botChoice);

  message = finalMessage(results) // returnes {'message': "you won!", color: 'green'}  
  console.log(message);

  rpsFrontEnd(yourChoice.id, botChoice, message);

}

// random number function for bot, picks between 0-2

randToRpsInt = () => {
  return Math.floor(Math.random() * 3);
}

numberToChoice = (number) => {
  return ['rock', 'paper', 'scissors'][number];
}

// 9 diffrent case, could use if then or could use switch case method
  /**
   * user pick rock, bot picks rock = draw(play again)
   * user pick rock, bot picks scissors = user wins
   * user pick rock, bot picks paper = bot wins
   * 
   * user pick paper, bot picks paper =  draw
   * user pick paper, bot picks  scissors = bot wins
   * user pick paper, bot picks rock = user wins
   * 
   * user pick scissors, bot picks scissors = draw(play again)
   * user pick scissors, bot picks rock = bot wins
   * user pick scissors, bot picks paper = user wins
   * 
   */


decideWinner = (yourChoice, computerChoice) => {
   let rpsDataBase = {
     'rock':{'scissors': 1, 'rock': 0.5, 'paper': 0},
     'paper':{'rock': 1, 'paper': 0.5, 'scissors': 0},
     'scissors':{'paper':1, 'scissors': 0.5, 'rock': 0}
   };

   let yourScore = rpsDataBase[yourChoice][computerChoice];
   let computerScore = rpsDataBase[computerChoice][yourChoice];

   return [yourScore, computerScore];
}  

// 1,0 "you won!", 0.5, 0.5 ("It's a tie"), 0.5 , 1 ("You lost!")
finalMessage = ([yourScore, computerScore]) => {
  if(yourScore === 0) {
    return {message: 'You lost!', 'color': 'red'};
  } else if (yourScore === 0.5){
    return {message: 'You tied', 'color': 'yellow'};  
  } else {
    return {message: 'You won!', 'color': 'green'};
  }
}

rpsFrontEnd = (humanImageChoice, botImageChoice, finalMessage) => {
  let imagesDatabase =  {
    "rock": document.getElementById('rock').src,
    "paper": document.getElementById('paper').src,
    "scissors": document.getElementById('scissors').src
  }

// remove all the images 
document.getElementById('rock').remove();
document.getElementById('paper').remove();
document.getElementById('scissors').remove();

// Only showing images selected by user and bot

let humanDiv = document.createElement('div');
let botDiv =  document.createElement('div');
let messageDiv = document.createElement('div');

humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "'height= 150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "'height= 150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding; 30px '>" + finalMessage['message'] + "</h1>"

document.getElementById('flex-box-rps-div').append(humanDiv);
document.getElementById('flex-box-rps-div').append(botDiv);
document.getElementById('flex-box-rps-div').append(messageDiv);
}


// ! Challenge 4: Change the color of all buttons
let all_buttons = document.getElementsByTagName('button');

// copys all the buttoms orginal value
let copyAllButtons = [];
for(let i = 0; i < all_buttons.length; i++ ) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}



buttonColorChange = (buttonThingy) => {
  if(buttonThingy.value === 'red') {
    buttonRed();
  } else if  (buttonThingy.value === 'green') {
    buttonGreen();
  } else if (buttonThingy.value === 'reset') {
    buttonColorReset();
  } else if  (buttonThingy.value === 'random')  {
    randomColors();
  }
}

buttonRed = () => {
  for(let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger'); 
  }
}

buttonGreen = () => {
  for(let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success'); 
  }
}

buttonColorReset = () => {
  for(let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]); 
  }
}

randomColors = () => {
  let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

  for(let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

// ! Challenge 5: Blackjack -------------------
let blackjackGame = {
  "you": {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
  "dealer": {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
  "cards": ['2', '3', '4', '5' , '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
  "cardsMap": {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1 ,11]},
  'wins': 0, 
  'losses': 0,
  'draws':0,
  'isStand': false,
  'turnsOver': false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const winSound = new Audio('/static/sounds/cash.mp3');
const hitSound = new Audio ('/static/sounds/swish.m4a');
const lossSound = new Audio ('/static/sounds/aww.mp3');

 document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

 document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

 document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

 function blackjackHit() {
  if (blackjackGame['isStand'] === false ) { 
   let card = randomCard();
   console.log(card);
   showCard(card, YOU);
   updateScore(card, YOU);
   showScore(YOU);
  }
 }

 function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

 function showCard( card, activePlayer ) { 
   if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `/static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
   }
 }

 function blackjackDeal() {
   if (blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    
    for(let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    
    document.querySelector('#your-blackjack-result').style.color = 'white';
    document.querySelector('#dealer-blackjack-result').style.color = 'white';

    document.querySelector('#blackjack-result').textContent = "Let's play!";
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = true;
  }
}

  function updateScore(card, activePlayer) {
   if (card === 'A') {
    // If adding 11 keeps me below 21, add 11. Otherwise, add 1.
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
   } else {
     activePlayer['score'] += blackjackGame['cardsMap'][card][0];
   } 

  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
   }
 }

 function showScore(activePlayer) {
   if(activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function dealerLogic() {
   blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand']=== true) {
    blackjackGame['isStand'] = true;
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
    }

     blackjackGame['turnsOver'] = true;
     let winner = computeWinner();
     showResult(winner);
  }


  // compute winner and return who just won
  // update the wins, losses and draws.
  function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
      // condition: higher score than dealer or when dealer busts but you're score is 21 or under.
      if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
        blackjackGame['wins']++;
        winner = YOU;

      } else if (YOU['score'] < DEALER['score']) {
        blackjackGame['losses']++;
        winner = DEALER;

      } else if  (YOU['score'] === DEALER['score']) {
        blackjackGame['draws']++;
      } 

      // condition: when users busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
      blackjackGame['losses']++;
      winner = DEALER;

      // condition: When you and the dealer busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
      blackjackGame['draws']++;
    }

    console.log(blackjackGame);
    return winner;
  }

  function showResult(winner) {
    let message, messageColor; 

    if (blackjackGame['turnsOver'] === true) {

      if (winner === YOU) {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You Won!';
        messageColor = 'green';
        winSound.play();

      } else if (winner === DEALER) {
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = 'You Lost!';
        messageColor = 'red';
        lossSound.play();

      } else {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'You Drew!';
        messageColor = 'black';
      }

      document.querySelector('#blackjack-result').textContent = message;
      document.querySelector('#blackjack-result').style.color = messageColor;
    }
  }
// (STOPPED HERE) TIMESTAMP : part 6 (javascript part): 
