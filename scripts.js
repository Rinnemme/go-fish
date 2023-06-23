let deck = [
    {suit: 'spades', rank:"2"},
    {suit: 'spades', rank:"3"},
    {suit: 'spades', rank:"4"},
    {suit: 'spades', rank:"5"},
    {suit: 'spades', rank:"6"},
    {suit: 'spades', rank:"7"},
    {suit: 'spades', rank:"8"},
    {suit: 'spades', rank:"9"},
    {suit: 'spades', rank:"10"},
    {suit: 'spades', rank:"11"},
    {suit: 'spades', rank:"12"},
    {suit: 'spades', rank:"13"},
    {suit: 'spades', rank:"14"},
    {suit: 'hearts', rank:"2"},
    {suit: 'hearts', rank:"3"},
    {suit: 'hearts', rank:"4"},
    {suit: 'hearts', rank:"5"},
    {suit: 'hearts', rank:"6"},
    {suit: 'hearts', rank:"7"},
    {suit: 'hearts', rank:"8"},
    {suit: 'hearts', rank:"9"},
    {suit: 'hearts', rank:"10"},
    {suit: 'hearts', rank:"11"},
    {suit: 'hearts', rank:"12"},
    {suit: 'hearts', rank:"13"},
    {suit: 'hearts', rank:"14"},
    {suit: 'clubs', rank:"2"},
    {suit: 'clubs', rank:"3"},
    {suit: 'clubs', rank:"4"},
    {suit: 'clubs', rank:"5"},
    {suit: 'clubs', rank:"6"},
    {suit: 'clubs', rank:"7"},
    {suit: 'clubs', rank:"8"},
    {suit: 'clubs', rank:"9"},
    {suit: 'clubs', rank:"10"},
    {suit: 'clubs', rank:"11"},
    {suit: 'clubs', rank:"12"},
    {suit: 'clubs', rank:"13"},
    {suit: 'clubs', rank:"14"},
    {suit: 'diamonds', rank:"2"},
    {suit: 'diamonds', rank:"3"},
    {suit: 'diamonds', rank:"4"},
    {suit: 'diamonds', rank:"5"},
    {suit: 'diamonds', rank:"6"},
    {suit: 'diamonds', rank:"7"},
    {suit: 'diamonds', rank:"8"},
    {suit: 'diamonds', rank:"9"},
    {suit: 'diamonds', rank:"10"},
    {suit: 'diamonds', rank:"11"},
    {suit: 'diamonds', rank:"12"},
    {suit: 'diamonds', rank:"13"},
    {suit: 'diamonds', rank:"14"}
]

const botScoreBoard = document.getElementById ("bot-score")
const botTurnButton = document.getElementById ("bot-turn")
const cardImages = Array.from (document.querySelectorAll (".playing-card"))
const doesBotHaveAny = document.getElementById ("do-you-have")
const firstTurnOk = document.getElementById ("first-turn-ok")
const goFishButton = document.getElementById ("go-fish")
const message = document.getElementById ("message")
const modalMessage = document.getElementById ("modal-text")
const modalOk = document.getElementById ("modal-button")
const modalWindow = document.getElementById ("modal")
const playAgainButton = document.getElementById ("play-again-button")
const playerTurnButton = document.getElementById ("player-turn")
const playerScoreBoard = document.getElementById ("player-score")
const rankButtons = Array.from (document.querySelectorAll (".rank-button"))
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
const scoreboard = document.getElementById ("score")
const scoreboardToggleButton = document.getElementById ("score-button")
const startButton = document.getElementById ("start-button")

let botHand = []
let botScore = 0
let convertedRank = ""
let firstTurn = ""
let playerHand = []
let playerScore = 0

function pickFirstTurn () {
    emptyHandCheck ()
    firstTurn = Math.floor (Math.random () * 2)
    toggleVisibility (scoreboardToggleButton)
    toggleVisibility (startButton)
    toggleVisibility (firstTurnOk)
    if (firstTurn === 0) {
        message.textContent = "Looks like I'm up first"
    }
    else {
        message.textContent = "Looks like you're up first"
    }
}

function emptyHandCheck () {
    if (botHand.length === 0) {
        if (deck.length < 5) {
            while (deck.length > 0) {
                botDraw ()
            }
        }
        else {
            for (let i = 1; i < 6; i ++) {botDraw ()}
        }
    }
    if (playerHand.length === 0) {
        if (deck.length < 5) {
            while (deck.length > 0) {
                playerDraw ()
            }
        }
        else {
            for (let i = 1; i < 6; i ++) {playerDraw ()}
        }
    }
}

function toggleVisibility (element) {
    element.classList.toggle ("visible")
    element.classList.toggle ("invisible")
}

function playerDraw () {
    const pickIndex = Math.floor ((Math.random () * deck.length))
    const card = deck [pickIndex]
    playerHand.unshift (card)
    deck.splice (pickIndex, 1)
    const cardImage = document.getElementById (`${card.suit}${card.rank}`)
    toggleVisibility (cardImage)
}

function botDraw () {
    const pickIndex = Math.floor ((Math.random () * deck.length))
    const card = deck [pickIndex]
    botHand.unshift (card)
    deck.splice (pickIndex, 1) 
}

function initiateFirstTurn () {
    toggleVisibility (firstTurnOk)
    if (firstTurn === 0) {
        message.style.backgroundColor = "rgb(215, 215, 215)"
        toggleVisibility (botTurnButton)
         // ^ included because botAskPlayerforCard also toggles, so this cancels it out
        botAskPlayerForCard ()
    }
    else {
        message.textContent = "Ask me for a card rank you've got"
        toggleVisibility (doesBotHaveAny)
    }
}

function initiatePlayerTurn () {
    message.style.backgroundColor = "rgb(255, 173, 173)"
    message.textContent = "Ask me for a card rank you've got"
    toggleVisibility (doesBotHaveAny)
    toggleVisibility (playerTurnButton)
}

function displayHeldRanks () {
    toggleVisibility (doesBotHaveAny)
    rankButtons.forEach (button => {
        playerHand.forEach (card => {
            if (button.id === card.rank && !button.classList.contains ("visible")) {
                toggleVisibility (button)
            } 
        })
    })
}

function askBotForCard (targetRank) {
    let botHasCard = false
    botHand.forEach (card => {
        if (card.rank === targetRank) {
            playerHand.unshift (card)
            const takenCardImage = document.getElementById (`${card.suit}${card.rank}`)
            toggleVisibility (takenCardImage)
            botHasCard = true
        }
    })
    rankButtons.forEach (button => {
        if (button.classList.contains ("visible")) {
            toggleVisibility (button)
        }
    })
    if (!botHasCard) {
        if (deck.length === 0) {
            message.textContent = "Nope, and the deck's all gone, so you can't go fish!"
            toggleVisibility (botTurnButton)
            return;
        }
        message.textContent = "Nope - go fish!"
        toggleVisibility (goFishButton)
    } else {
        message.textContent = "I do! Here you go"
        toggleVisibility (botTurnButton)
        playerPointCheck ()
        botHand = botHand.filter (card => card.rank !== targetRank)
        emptyHandCheck ()
    }
}

function goFish () {
    playerDraw ()
    let rankname = playerHand [0].rank
    convertedRank = rankname
    rankConvert (rankname)
    message.textContent = `You got the ${convertedRank} of ${playerHand [0].suit}`
    toggleVisibility (goFishButton)
    toggleVisibility (botTurnButton)
    playerPointCheck ()
    emptyHandCheck ()
}

function rankConvert (targetrank) {
    if (targetrank === "11") {convertedRank = "jack"}
    else if (targetrank === "12") {convertedRank = "queen"}
    else if (targetrank === "13") {convertedRank = "king"}
    else if (targetrank === "14") {convertedRank = "ace"}
    else if (targetrank === "10") {convertedRank = "10"}
}

function executeBotTurn () {
    message.style.backgroundColor = "rgb(215, 215, 215)"
    botAskPlayerForCard ()
    botPointCheck ()
}

function botAskPlayerForCard () {
    const askIndex = Math.floor ((Math.random () * botHand.length))
    const targetRank = botHand [askIndex].rank
    let playerHasCard = false
    playerHand.forEach (card => {
        if (card.rank === targetRank) {
            botHand.unshift (card)
            const givenCardImage = document.getElementById (`${card.suit}${card.rank}`)
            toggleVisibility (givenCardImage)
            playerHasCard = true
        }
    })
    if (!playerHasCard) {
        if (deck.length === 0) {
            convertedRank = targetRank
            rankConvert (targetRank)
            message.textContent = `You have no ${convertedRank}s, and the deck is empty, so I can't go fish`
            toggleVisibility (botTurnButton)
            toggleVisibility (playerTurnButton)
            return;
        }
        botDraw ()
        convertedRank = targetRank
        rankConvert (targetRank)
        message.textContent = `You have no ${convertedRank}s, so I went fish`
    } else {
        convertedRank = targetRank
        rankConvert (targetRank)
        message.textContent = `I've taken any ${convertedRank}s you had`
        playerHand = playerHand.filter (card => card.rank !== targetRank)
    }
    toggleVisibility (botTurnButton)
    toggleVisibility (playerTurnButton)
    emptyHandCheck ()
}

function playerPointCheck () {
    ranks.forEach (targetRank => {
        const checkingObject = playerHand.filter(card => card.rank===targetRank)
        if (checkingObject.length === 4) {
            cardImages.forEach (image => {
                if (image.id.includes (targetRank) && image.classList.contains ("visible")) {
                    toggleVisibility (image)
                }
            })
            playerHand = playerHand.filter(card => card.rank !== targetRank)
            addPlayerPoint ()
             if (!modalMessage.textContent.includes (`that's game`)) {
                playerPointModal (targetRank)
            }
        }
    })
}

function playerPointModal (rank) {
    convertedRank = rank
    rankConvert (rank)
    modalMessage.textContent = `You've gathered all the ${convertedRank}s, and scored a point`
    toggleVisibility (modalWindow)
}

function addPlayerPoint () {
    playerScore += 1
    playerScoreBoard.textContent = playerScore
    message.textContent = "Congrats on your point!"
}

function botPointCheck () {
    ranks.forEach (targetRank => {
        const checkingObject = botHand.filter (card => card.rank === targetRank)
        if (checkingObject.length === 4) {
            botHand = botHand.filter (card => card.rank !== targetRank)
            addBotPoint ()
            if (!modalMessage.textContent.includes (`that's game`)) {
                botPointModal (targetRank)
            }
        }
    })
}

function botPointModal (rank) {
    convertedRank = rank
    rankConvert (rank)
    modalMessage.textContent = `I've gathered all the ${convertedRank}s, and scored a point`
    toggleVisibility (modalWindow)
}

function addBotPoint () {
    botScore += 1
    botScoreBoard.textContent = botScore
    message.textContent = "Now, where were we?"
}

function closeModal () {
    toggleVisibility (modalWindow)
    gameCheck ()
}

function gameCheck () {
    if (botScore + playerScore === 13) {
        game = "done"
        if (botScore > playerScore) {
            modalMessage.textContent = `And that's game! I won with ${botScore} sets of four to your ${playerScore}; Better luck next time!`
        } else {
            modalMessage.textContent = `And that's game! You won with ${playerScore} sets of four to my ${botScore}; Congratulations!`
        }
        toggleVisibility (modal)
        modalOk.classList.add ("invisible") 
        toggleVisibility (playAgainButton)
    }
}

function toggleScoreboard () {
    toggleVisibility (scoreboard)
    if (scoreboardToggleButton.textContent.includes ("Hide")) {
        scoreboard.style.display="none"
        scoreboardToggleButton.textContent = "Show Score"
    } else {
        scoreboard.style.display="flex"
        scoreboardToggleButton.textContent = "Hide Score"
    }
}