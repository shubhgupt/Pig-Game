/*
 Your 3 Challenges
Change the game to follow these rules:

1. A player looses his ENTIRE Score when he rolls two 6 in a row. After that , it's the next player's
turn. (Hint: Always save the previous dice roll in a separate variable)
"Completed"
2. Add an input field to the HTML where players can set the winning socore, so that they can change the
predefined score of 100. (HInt: you can read that value with the .value property in JavaScript. This
is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score
when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the 
CSS code for the first one. )

 */
var scores, roundScore, activePlayer, dice, gamePlaying, prevScore = -1;

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
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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
    var dice1 = Math.floor(Math.random()*6) + 1; 
    var dice2 = Math.floor(Math.random()*6) + 1; 

    // 2. display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    // See how we change img on click
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. Update the round score If the rolled number was Not a 1.
    if(dice1 !== 1 && dice2 !== 1){
        //Add Score
        roundScore += dice1 + dice2;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    }
    else {
        // Next Player
        nextPlayer();
      }/*
      if(dice === prevScore){
        //1. Make global Score zero.
        scores[activePlayer] = 0;

        //2. Update the UI
        document.querySelector("#score--"+activePlayer).textContent = scores[activePlayer];
        
        //3. Change the active Player
        nextPlayer();
        prevScore = -1 ;
      }else {
            if (dice === 6)
            {
                prevScore = 6;
            } else {
                prevScore = -1;
            }
        }*/
  }
 
});

// Hold Button Function

document.querySelector('.btn--hold').addEventListener('click',function(){
   if(gamePlaying){
        // 1. Add current Score to Global Score
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winScore;
        
        // undefined, 0, null and "" are COERCED to false
        if(input){
            winScore = input;
        }else{
            winScore = 100;
        }
        
        // 3. Check if player won the game
        if(scores[activePlayer] >= winScore){
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

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
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);



