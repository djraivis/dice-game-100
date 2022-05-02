'use strict'

// Selecting Elements
const player0El = document.querySelector('.player--0') // Active Color
const player1El = document.querySelector('.player--1') // Active Color
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice') // png
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing

// Starting conditions or Init
const init = function () {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true

    score0El.textContent = 0 // Initial player 1 score
    score1El.textContent = 0 // Initial player 2 score
    current0El.textContent = 0 // Current value player reset
    current1El.textContent = 0 // Current value player reset
    diceEl.classList.add('hidden') // dice png REMOVE  hidden

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    // btnNew.classList.add('hidden')
}
init()

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {

    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1
        // Display dice
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`
        console.log(dice)

        // 3 Check for rolled 1: if true, swith to next player
        if (dice !== 1) {
            // Add the dice to current score
            currentScore += dice // currentScore = currentScore + dice
            // current0El.textContent = currentScore // Change Later
            document.getElementById(`current--${activePlayer}`).textContent = currentScore

        } else {
            //Switch Players
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add cuurent score to active players score
        scores[activePlayer] += currentScore
        // scores[1] = scores[i] + currentScores

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer]

        // Check the score if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            playing = false // Finish the game
            diceEl.classList.add('hidden') // Hide Dice PNG
            btnNew.classList.remove('hidden')

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        } else {
            switchPlayer()
        }
    }
})

// New Game Reset to Zero Value
btnNew.addEventListener('click', init)

