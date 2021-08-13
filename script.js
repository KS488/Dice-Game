'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0') // # is used to select ID in an element
const score1El = document.getElementById('score--1'); // bothways work in how to select an id you can use both routes some say the second is faster
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
     document.getElementById(`current--${activePlayer}`).textContent = 0;

        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
        player0El.classList.toggle('player--active'); // toggle checks if class is present if it is it removes it if itisnt it adds it 
        player1El.classList.toggle('player--active');
}

let scores, currentScore, activePlayer, playing;

//starting condtions

const init = function () {
    
     scores=[0, 0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;

    currentScore = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEL.classList.add('hidden');
}

init()
//Rolling a dice functionality 

btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate a  random dice roll
        const dice = (Math.trunc(Math.random() * 6)) + 1;
        // 2. Display dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;
        // 3.Check for rolled 1 : if true , switch to next player
        if (dice !== 1) {
            //Add dice to current score
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //Switch to next player
       
            switchPlayer();

        }
    }
})

btnHold.addEventListener('click', function () { 
    if (playing) {
        //1. Add current score to active players score
        scores[activePlayer] += currentScore;
        //Code above is equal to saying scores[1]=scores[1]+currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. Check if players score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game 
            playing = false
                    diceEL.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        } else {
            // Switch to next player
            switchPlayer();
        
        }   

    }

})

btnNew.addEventListener('click',init)
    //2. And the puttons will be active 