/*
  Game Rules:
 
 - The game has 2 players, playing in rounds.
 - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his Round 
 Score
 - BUT, if the player rolls a 1, all his Round score gets lost, After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his Round score gets added to his GLOBAL score.
After that, it's the next player's turn 
- The first player to reach 100 points on GLOBAL score wins the game. 
 
 */

var scores, roundScore, activePlayer, dice, gamePlaying;

// Initialization Function
init();
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;// First player is active
    gamePlaying = true;

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    
// To manipulate CSS
    document.querySelector('.dice').style.display = 'none';

}

// Event Handling

// one way of Doing with callback function
/*
function btn(){
    //Do Something Here
}

document.querySelector('.btn--roll').addEventListener('click',btn);
*/

// Another way of Doing with Anonymous function and it is the Perfect way of doing this.
document.querySelector('.btn--roll').addEventListener('click',function(){
  if(gamePlaying){
    // 1. Random number
    var dice = Math.floor(Math.random()*6) + 1; 

    // 2. display the result
       var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
    // See how we change img on click
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score If the rolled number was Not a 1.
    if(dice !== 1){
        //Add Score
        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    }
    else {
        // Next Player
        nextPlayer();
      }
  }
 
});

// Hold Button Function

document.querySelector('.btn--hold').addEventListener('click',function(){
   if(gamePlaying){
        // 1. Add current Score to Global Score
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        // 3. Check if player won the game
        if(scores[activePlayer] >= winScore){
             document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
             document.querySelector('.dice').style.display = 'none';
             document.querySelector('.player--' + activePlayer).classList.add('player--winner');
             document.querySelector('.player--' + activePlayer).classList.remove('player--active');
             gamePlaying = false;
        }
        else{
            // 4. Next Player
            nextPlayer();    
        }
   }
   
});

function nextPlayer(){
    activePlayer === 0? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
      
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
  
    // Removing and Adding an HTML class
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
      
    // document.querySelector('.player--0').classList.remove('player--active');
    // document.querySelector('.player--1').classList.add('player--active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);










