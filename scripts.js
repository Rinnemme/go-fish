const deck = [
    {suit: 'spades', rank:"2"},
    {suit: 'spades', rank:"3"},
    {suit: 'spades', rank:"4"},
    {suit: 'spades', rank:"5"},
    {suit: 'spades', rank:"6"},
    {suit: 'spades', rank:"7"},
    {suit: 'spades', rank:"8"},
    {suit: 'spades', rank:"9"},
    {suit: 'spades', rank:"t"},
    {suit: 'spades', rank:"j"},
    {suit: 'spades', rank:"q"},
    {suit: 'spades', rank:"k"},
    {suit: 'spades', rank:"a"},
    {suit: 'hearts', rank:"2"},
    {suit: 'hearts', rank:"3"},
    {suit: 'hearts', rank:"4"},
    {suit: 'hearts', rank:"5"},
    {suit: 'hearts', rank:"6"},
    {suit: 'hearts', rank:"7"},
    {suit: 'hearts', rank:"8"},
    {suit: 'hearts', rank:"9"},
    {suit: 'hearts', rank:"t"},
    {suit: 'hearts', rank:"j"},
    {suit: 'hearts', rank:"q"},
    {suit: 'hearts', rank:"k"},
    {suit: 'hearts', rank:"a"},
    {suit: 'clubs', rank:"2"},
    {suit: 'clubs', rank:"3"},
    {suit: 'clubs', rank:"4"},
    {suit: 'clubs', rank:"5"},
    {suit: 'clubs', rank:"6"},
    {suit: 'clubs', rank:"7"},
    {suit: 'clubs', rank:"8"},
    {suit: 'clubs', rank:"9"},
    {suit: 'clubs', rank:"t"},
    {suit: 'clubs', rank:"j"},
    {suit: 'clubs', rank:"q"},
    {suit: 'clubs', rank:"k"},
    {suit: 'clubs', rank:"a"},
    {suit: 'diamonds', rank:"2"},
    {suit: 'diamonds', rank:"3"},
    {suit: 'diamonds', rank:"4"},
    {suit: 'diamonds', rank:"5"},
    {suit: 'diamonds', rank:"6"},
    {suit: 'diamonds', rank:"7"},
    {suit: 'diamonds', rank:"8"},
    {suit: 'diamonds', rank:"9"},
    {suit: 'diamonds', rank:"t"},
    {suit: 'diamonds', rank:"j"},
    {suit: 'diamonds', rank:"q"},
    {suit: 'diamonds', rank:"k"},
    {suit: 'diamonds', rank:"a"}
]
const doesBotHaveAny = document.getElementById ("do-you-have")
const botScoreBoard = document.getElementById ("bot-score")
const cardImages = Array.from (document.querySelectorAll (".playing-card"))
const goFishButton = document.getElementById ("go-fish")
const message = document.getElementById ("message")
const modalOk = document.getElementById ("modal-button")
const playAgainButton = document.getElementById ("play-again-button")
const modalWindow = document.getElementById ("modal")
const modalMessage = document.getElementById ("modal-text")
const playerTurnButton = document.getElementById ("player-turn")
const firstTurnOk = document.getElementById ("first-turn-ok")
const playerScoreBoard = document.getElementById ("player-score")
const rankButtons = Array.from (document.querySelectorAll (".rank-button"))
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k", "a"]
const scoreboard = document.getElementById ("score")
const startButton = document.getElementById ("start-button")
const scoreboardToggleButton = document.getElementById ("score-button")
const botTurnButton = document.getElementById ("bot-turn")

let convertedRank = ""
let botHand = []
let botScore = 0
let firstTurn = ""
let playerHand = []
let playerScore = 0
let playingDeck = deck;


/* Hides and unhides elements by toggling two classes simultaneously */

function toggleVisibility (element) {
    element.classList.toggle ("visible")
    element.classList.toggle ("invisible")
}

/* Toggles scoreboard */

function toggleScoreboard () {
    toggleVisibility (scoreboard)
    if (scoreboard.classList.contains ("invisible")) {
        scoreboardToggleButton.textContent = "Show Score"
    } else {
        scoreboardToggleButton.textContent = "Hide Score"
    }
}

/* Deals a hand of 5 when any player has 0 cards, including at the beginning of the game */
/* If deck has fewer than 5 cards, it will deal until the deck hits 0 */

function handCheck () {
    if (botHand.length === 0) {
        if (playingDeck.length < 5) {
            while (playingDeck.length > 0) {
                botDraw ()
            }
        }
        else {
            for (let i = 1; i < 6; i ++) {botDraw ()}
        }
    }
    if (playerHand.length === 0) {
        if (playingDeck.length < 5) {
            while (playingDeck.length > 0) {
                botDraw ()
            }
        }
        else {
            for (let i = 1; i < 6; i ++) {playerDraw ()}
        }
    }
}

function pickFirstTurn () {
    firstTurn = Math.floor (Math.random () * 2)
}

/* Makes it the bot's turn */

function makeBotTurn () {
    botAsk ()
    botPointCheck ()
}

/* Makes it the player's turn */

function makePlayerTurn () {
    message.textContent = "Ask me for a card rank you've got!"
    toggleVisibility (doesBotHaveAny)
    toggleVisibility (playerTurnButton)
}

/* Lets the player know, before the action, who is acting first */

function startGame () {
    handCheck ()
    toggleVisibility (scoreboard)
    toggleVisibility (scoreboardToggleButton)
    pickFirstTurn ()
    toggleVisibility (startButton)
    toggleVisibility (firstTurnOk)
    if (firstTurn === 0) {
        message.textContent = "Looks like I'm up first!"
    }
    if (firstTurn === 1) {
        message.textContent = "Looks like you're up first!"
    }
}

/* Actually kicks off the action */

function acknowledgeFirstTurn () {
    toggleVisibility (firstTurnOk)
    if (firstTurn === 1) {
        toggleVisibility (botTurnButton)
        botAsk ()
    }
    if (firstTurn === 0) {
        message.textContent = "Ask me for a card rank you've got!"
        toggleVisibility (doesBotHaveAny)
    }
}

/* Displays list of ranks you can ask for */

function doesBotHave () {
    toggleVisibility (doesBotHaveAny)
    rankButtons.forEach (button => {
        playerHand.forEach (card => {
            const checkRank = button.id
            if (checkRank === card.rank && !button.classList.contains ("visible")) {
            toggleVisibility (button)
            } 
        })
    })
}

/* Draws random cards into player's/bot's hands */

function playerDraw () {
    const pickIndex = Math.floor ((Math.random () * playingDeck.length))
        const card = playingDeck [pickIndex]
        playerHand.unshift (card)
        playingDeck.splice (pickIndex, 1)
        const cardImage = document.getElementById (`${card.suit}${card.rank}`)
        toggleVisibility (cardImage)
}

function botDraw () {
    const pickIndex = Math.floor ((Math.random () * playingDeck.length))
    const card = playingDeck [pickIndex]
    botHand.unshift (card)
    playingDeck.splice (pickIndex, 1) 
}

/* Converts names of face cards in instances where rank is displayed in writing */

function rankConvert (targetrank) {
    if (targetrank === "j") {convertedRank = "jack"}
    else if (targetrank === "q") {convertedRank = "queen"}
    else if (targetrank === "k") {convertedRank = "king"}
    else if (targetrank === "a") {convertedRank = "ace"}
    else if (targetrank === "t") {convertedRank = "10"}
}

/* Checks for empty hand, draws (up to) 5 cards */

function checkEmptyBotHand () {
    if (botHand.lengt === 0) {
        if (playingDeck.length >= 5) {
            for (let i = 1; i <= 5; i++) {
                playerDraw ()
            }

        } else {
            for (let i=1; i <= playingDeck.length; i++) {
                playerDraw ()
            }
        }
    }
}

function checkEmptyPlayerHand () {
    if (playerHand.length === 0) {
        if (playingDeck.length >= 5) {
            for (let i = 1; i <= 5; i++) {
                botDraw ()
            }

        } else {
            for(let i = 1; i <= playingDeck.length; i++) {
                botDraw ()
            }
        }
    }
}

/* Asks the bot for a card */

function askBotForCard (targetRank) {
    let successful = "no"
    botHand.forEach (card => {
        if (card.rank === targetRank) {
            playerHand.unshift (card)
            const takenCardImage = document.getElementById (`${card.suit}${card.rank}`)
            toggleVisibility (takenCardImage)
            successful = "yes"
        }
    })
    rankButtons.forEach (button => {
        if (button.classList.contains ("visible")) {
            toggleVisibility (button)
        }
    })
    if (successful === "no") {
        if (playingDeck.length === 0) {
            message.textContent = "Nope, and the deck's all gone! Guess it's my turn."
            toggleVisibility (botTurnButton)
            return;
        }
        message.textContent = "Nope! Looks like you gotta go fish."
        toggleVisibility (goFishButton)
    } else {
        message.textContent = "Darn, I do! Here you go, you rapscallion..."
        toggleVisibility (botTurnButton)
        playerPointCheck ()
        botHand = botHand.filter (card => card.rank !== targetRank)
        handCheck ()
    }
}

/* Fishes for the player*/

function goFish () {
    playerDraw ()
    let rankname = playerHand [0].rank
    convertedRank = rankname
    rankConvert (rankname)
    message.textContent = `Enjoy that ${convertedRank} of ${playerHand [0].suit}!`
    toggleVisibility (goFishButton)
    toggleVisibility (botTurnButton)
    playerPointCheck ()
    handCheck ()
}

/* Has bot ask for a card and tell you how it went */

function botAsk () {
    const askIndex = Math.floor ((Math.random () * botHand.length))
    const targetRank = botHand [askIndex].rank
    let successful = "no"
    playerHand.forEach (card => {
        if (card.rank === targetRank) {
            botHand.unshift (card)
            const givenCardImage = document.getElementById (`${card.suit}${card.rank}`)
            toggleVisibility (givenCardImage)
            successful = "yes"
        }
    })
    // }
    if (successful === "yes") {
        convertedRank = targetRank
        rankConvert (targetRank)
        message.textContent = `I'll just go ahead and take any ${convertedRank}s you have.`
        playerHand = playerHand.filter (card => card.rank !== targetRank)
    }
    if (successful === "no") {
        if (playingDeck.length === 0) {
            convertedRank = targetRank
            rankConvert (targetRank)
            message.textContent = `You have no ${convertedRank}s, and the deck is empty. Back to you!`
            toggleVisibility (botTurnButton)
            toggleVisibility (playerTurnButton)
            return;
        }
        botDraw ()
        convertedRank = targetRank
        rankConvert (targetRank)
        message.textContent = `I wanted at least ONE ${convertedRank}, but alas, I had to go fish.`
        
    }
    toggleVisibility (botTurnButton)
    toggleVisibility (playerTurnButton)
    handCheck ()
}

/* Checks point conditions for player */

function playerPointModal (rank) {
    convertedRank = rank
    rankConvert (rank)
    modalMessage.textContent = `Wow, you've gathered all the ${convertedRank}s! That's one point for you!`
    toggleVisibility (modalWindow)
}

function playerPoint () {
    playerScore += 1
    playerScoreBoard.textContent = playerScore
    message.textContent = "Congrats on your point! Now, where were we?"
}

function playerPointCheck() {
    ranks.forEach (targetRank => {
        const checkingObject = playerHand.filter(card => card.rank===targetRank)
        if (checkingObject.length === 4) {
            cardImages.forEach (image => {
                if (image.id === targetRank && image.classList.contains("visible")) {
                    toggleVisibility(image)
                }
            })
            playerHand = playerHand.filter(card => card.rank !== targetRank)
            playerPoint ()
             if (!modalMessage.textContent.includes (`that's game`)) {
                playerPointModal (targetRank)
            }
        }
    })
}

/* Checks point conditions for bot */

function botPointModal (rank) {
    convertedRank = rank
    rankConvert (rank)
    modalMessage.textContent = `I've gathered all the ${convertedRank}s! That's one point for me!`
    toggleVisibility (modalWindow)
}

function botPoint () {
    botScore += 1
    botScoreBoard.textContent = botScore
    message.textContent = "Bet you didn't see that coming! Now, where were we?"
}

function botPointCheck () {
    ranks.forEach (targetRank => {
        const checkingObject = botHand.filter (card => card.rank === targetRank)
        if (checkingObject.length === 4) {
            botHand = botHand.filter (card => card.rank !== targetRank)
            botPoint()
            if (!modalMessage.textContent.includes (`that's game`)) {
                botPointModal (targetRank)
            }
        }
    })
}

/* Allows deactivating modal once it pops up and you've read its message (generally following a point) */

function closePointModal () {
    toggleVisibility (modalWindow)
    gameCheck ()
}

/* Checks if the game is over, throws up modal window if so */

function gameCheck () {
    if (botScore + playerScore === 13) {
        game = "done"
        if (botScore > playerScore) {
            modalMessage.textContent = `And that's game! Looks like I won with ${botScore} sets of four to your ${playerScore}. Better luck next time!`
        } else {
            modalMessage.textContent = `And that's game! Looks like you won with ${playerScore} sets of four to my ${botScore} - congratulations!`
        }
        toggleVisibility (modal)
        modalOk.classList.add ("invisible") 
        toggleVisibility (playAgainButton)
    }
}