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

//(STOPPED HERE) Challenge 3: Rock, Paper, Scissors part 2 : TIME STAMP 55:10