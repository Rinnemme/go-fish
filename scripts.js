const deck = [
    {suit: 'spades', rank:2},
    {suit: 'spades', rank:3},
    {suit: 'spades', rank:4},
    {suit: 'spades', rank:5},
    {suit: 'spades', rank:6},
    {suit: 'spades', rank:7},
    {suit: 'spades', rank:8},
    {suit: 'spades', rank:9},
    {suit: 'spades', rank:10},
    {suit: 'spades', rank:"j"},
    {suit: 'spades', rank:"q"},
    {suit: 'spades', rank:"k"},
    {suit: 'spades', rank:"a"},
    {suit: 'hearts', rank:2},
    {suit: 'hearts', rank:3},
    {suit: 'hearts', rank:4},
    {suit: 'hearts', rank:5},
    {suit: 'hearts', rank:6},
    {suit: 'hearts', rank:7},
    {suit: 'hearts', rank:8},
    {suit: 'hearts', rank:9},
    {suit: 'hearts', rank:10},
    {suit: 'hearts', rank:"j"},
    {suit: 'hearts', rank:"q"},
    {suit: 'hearts', rank:"k"},
    {suit: 'hearts', rank:"a"},
    {suit: 'clubs', rank:2},
    {suit: 'clubs', rank:3},
    {suit: 'clubs', rank:4},
    {suit: 'clubs', rank:5},
    {suit: 'clubs', rank:6},
    {suit: 'clubs', rank:7},
    {suit: 'clubs', rank:8},
    {suit: 'clubs', rank:9},
    {suit: 'clubs', rank:10},
    {suit: 'clubs', rank:"j"},
    {suit: 'clubs', rank:"q"},
    {suit: 'clubs', rank:"k"},
    {suit: 'clubs', rank:"a"},
    {suit: 'diamonds', rank:2},
    {suit: 'diamonds', rank:3},
    {suit: 'diamonds', rank:4},
    {suit: 'diamonds', rank:5},
    {suit: 'diamonds', rank:6},
    {suit: 'diamonds', rank:7},
    {suit: 'diamonds', rank:8},
    {suit: 'diamonds', rank:9},
    {suit: 'diamonds', rank:10},
    {suit: 'diamonds', rank:"j"},
    {suit: 'diamonds', rank:"q"},
    {suit: 'diamonds', rank:"k"},
    {suit: 'diamonds', rank:"a"}
]
const askForCard = document.getElementById("ask-bot")
const botScoreBoard = document.getElementById("bot-score")
const cardImages = Array.from(document.querySelectorAll(".playing-card"))
const goFish = document.getElementById("go-fish")
const message = document.getElementById("message")
const modalOk = document.getElementById("modal-button")
const modalWindow = document.getElementById("modal")
const modalMessage = document.getElementById("modal-text")
const myTurn = document.getElementById("player-turn")
const okStart = document.getElementById("ok-start")
const playerScoreBoard = document.getElementById("player-score")
const rankButtons = Array.from(document.querySelectorAll(".rank-button"))
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k", "a"]
const scoreBoard = document.getElementById("score")
const startButton = document.getElementById("start-button")
const scoreHider = document.getElementById("score-button")
const turns = ["player","bot"]
const yourTurn = document.getElementById("bot-turn")

let botHand = []
let botScore = 0
let currentTurn = ""
let game = "on" /* May be used later for replay function */
let playerHand = []
let playerScore = 0
let playingDeck = deck;


/* Hides and unhides elements by toggling two classes simultaneously */

function toggleVisibility(element) {
    element.classList.toggle("visible")
    element.classList.toggle("invisible")
}

/* Toggles scoreboard */

scoreHider.addEventListener("click", function() {
    toggleVisibility(scoreBoard)
    if(scoreBoard.classList.contains("invisible")) {
        scoreHider.textContent="Show Score"
    } else {
        scoreHider.textContent="Hide Score"
    }
})

/* Enables player asking bot for specific cards using buttons */

function activateRankButtons() {
    rankButtons.forEach(button => {
        button.addEventListener("click", function() {
            askBot(button.id.slice(4))
        })
    })
}

/* Deals a hand of 5 to each player */

function dealHands() {
    for(let i=1;i<6;i++) {playerDraw()}
    for(let i=1;i<6;i++) {botDraw()}
}

/* Establishes who gets first turn */

function pickTurn() {
    currentTurn = turns[Math.floor(Math.random()*2)]
}

/* Makes it the bot's turn */

yourTurn.addEventListener("click", function() {
    botAsk()
})

/* Makes it the player's turn */

function playerTurn() {
    message.textContent = "Ask me for a card rank you've got!"
    toggleVisibility(askForCard)
}

myTurn.addEventListener("click", function() {
    playerTurn()
    toggleVisibility(myTurn)
})

/* Lets the player know, before the action, who is acting first */

startButton.addEventListener("click", function() {
    pickTurn()
    toggleVisibility(startButton)
    toggleVisibility(okStart)
    if (currentTurn==="bot") {
        message.textContent = "Looks like I'm up first!"
    }
    if (currentTurn==="player") {
        message.textContent = "Looks like you're up first!"
    }
})

/* Actually kicks off the action */

okStart.addEventListener("click", function() {
    dealHands()
    activateRankButtons()
    toggleVisibility(scoreBoard)
    toggleVisibility(scoreHider)
    toggleVisibility(okStart)
    if (currentTurn==="bot") {
        toggleVisibility(yourTurn)
        botAsk()
    }
    if (currentTurn==="player") {
        playerTurn()
    }
})

/* Displays list of ranks you can ask for */

askForCard.addEventListener ("click", function() {
    toggleVisibility(askForCard)
    rankButtons.forEach(button => {
        playerHand.forEach(card => {
            const checkRank = button.id.slice(4)
            if(checkRank==card.rank && !button.classList.contains("visible")) {
            toggleVisibility(button)
            } 
        })
    })
})

/* Draws random cards into player's/bot's hands */

function playerDraw() {
    const pickIndex = Math.floor((Math.random()*playingDeck.length))
        const card = playingDeck[pickIndex]
        playerHand.unshift(card)
        playingDeck.splice(pickIndex, 1)
        const cardImage = document.getElementById(`${card.suit}`+`${card.rank}`)
        toggleVisibility(cardImage)
}

function botDraw() {
    const pickIndex = Math.floor((Math.random()*playingDeck.length))
    const card = playingDeck[pickIndex]
    botHand.unshift(card)
    playingDeck.splice(pickIndex, 1) 
}

/* Asks the bot for a card */

function askBot(askRank) {
    let successful = "no"
    /* looping to bully this into functioning properly */
    for(let i=0;i<10;i++) {
    botHand.forEach (card => {
        if (card.rank == askRank) {
            const index = botHand.indexOf(card)
            const takenCard = botHand[index]
            botHand.splice(index, 1)
            playerHand.unshift(takenCard)
            const takenCardImage = document.getElementById(`${takenCard.suit}`+`${takenCard.rank}`)
            toggleVisibility(takenCardImage)
            message.textContent = "Darn, I do! Here you go, you rapscallion..."
            successful="yes"
            playerPointCheck()
        }
    })}
    rankButtons.forEach(button => {
        if(button.classList.contains("visible")) {
            toggleVisibility(button)
        }
    })
    if (successful==="no") {
        if (playingDeck.length===0) {
            message.textContent = "Nope, and the deck's all gone! Guess it's my turn."
            toggleVisibility(yourTurn)
            return;
        }
        message.textContent = "Nope! Looks like you gotta go fish."
        toggleVisibility(goFish)
    } else {
        toggleVisibility(yourTurn)
    }
}

/* Fishes for the player*/

goFish.addEventListener("click", function() {
    playerDraw()
    message.textContent = "Enjoy that new card!"
    toggleVisibility(goFish)
    toggleVisibility(yourTurn)
    playerPointCheck()
})

/* Has bot ask for a card and tell you how it went */

function botAsk() {
    const askIndex = Math.floor((Math.random()*botHand.length))
    const askRank = botHand[askIndex].rank
    let successful = "no"
    /* looping to bully this into functioning properly */
    for(let i=0;i<10;i++) {
    playerHand.forEach (card => {
        if (card.rank === askRank) {
            const index = playerHand.indexOf(card)
            const givenCard = playerHand[index]
            playerHand.splice(index, 1)
            botHand.unshift(givenCard)
            const givenCardImage = document.getElementById(`${givenCard.suit}`+`${givenCard.rank}`)
            toggleVisibility(givenCardImage)
            successful = "yes"
        }
    })}
    if (successful === "yes") {
        if (isNaN(askRank)) {
            if (askRank==="j") {
                message.textContent = `I'll just go ahead and take any jacks you have.`
            } else if (askRank==="q") {
                message.textContent = `I'll just go ahead and take any queens you have.`
            } else if (askRank==="k") {
                message.textContent = `I'll just go ahead and take any kings you have.`
            } else if (askRank==="a") {
                message.textContent = `I'll just go ahead and take any aces you have.`
            } 
        } else {
            message.textContent = `I'll just go ahead and take any ${askRank}'s you have.`
        }
    }
    if (successful === "no") {
        if (playingDeck.length===0) {
            if (isNaN(askRank)) {
                if (askRank==="j") {
                    message.textContent = `You have no jacks, and the deck is empty. Back to you!`
                } else if (askRank==="q") {
                    message.textContent = `You have no queens, and the deck is empty. Back to you!`
                } else if (askRank==="k") {
                    message.textContent = `You have no kings, and the deck is empty. Back to you!`
                } else if (askRank==="a") {
                    message.textContent = `You have no aces, and the deck is empty. Back to you!`
                } 
            } else {
                message.textContent = `You have no ${askRank}'s, and the deck is empty. Back to you!`
            }
            toggleVisibility(yourTurn)
            toggleVisibility(myTurn)
            return;
        }
        botDraw()
        if (isNaN(askRank)) {
            if (askRank==="j") {
                message.textContent = `I wanted at least ONE jack, but alas, I had to go fish.`
            } else if (askRank==="q") {
                message.textContent = `I wanted at least ONE queen, but alas, I had to go fish.`
            } else if (askRank==="k") {
                message.textContent = `I wanted at least ONE king, but alas, I had to go fish.`
            } else if (askRank==="a") {
                message.textContent = `I wanted at least ONE ace, but alas, I had to go fish.`
            } 
        } else {
            message.textContent = `I wanted at least ONE ${askRank}, but alas, I had to go fish.`
        }
        
    }
    toggleVisibility(yourTurn)
    toggleVisibility(myTurn)
    botPointCheck()
}

/* Checks point conditions for player */

function playerPointModal(rank) {
    if (isNaN(rank)) {
        if (rank==="j") {
            modalMessage.textContent="Wow, you've gathered all the jacks! They'll be taken out of play, and your score will be increased by 1."
        } else if (rank==="q") {
            modalMessage.textContent="Wow, you've gathered all the queens! They'll be taken out of play, and your score will be increased by 1."
        } else if (rank==="k") {
            modalMessage.textContent="Wow, you've gathered all the kings! They'll be taken out of play, and your score will be increased by 1."
        } else {
            modalMessage.textContent="Wow, you've gathered all the aces! They'll be taken out of play, and your score will be increased by 1."
        }
    } else {
        modalMessage.textContent=`Wow, you've gathered all the ${rank}'s! They'll be taken out of play, and your score will be increased by 1.`
    }
    toggleVisibility(modalWindow)
}

function playerPoint() {
    playerScore+=1
    playerScoreBoard.textContent=playerScore
    message.textContent = "Congrats on your point! Now, where were we?"
}

function playerPointCheck() {
    ranks.forEach(targetRank => {
        const checkingObject = playerHand.filter(card => card.rank==targetRank)
        if (checkingObject.length === 4) {
            gameCheck()
            /* Iterating 9 times beacuse it won't iterate thoroughly ever */
            for(let i=0;i<10;i++) {
            cardImages.forEach(image => {
                if (image.id.slice(-1)==targetRank && image.classList.contains("visible")) {
                    toggleVisibility(image)
                }
            })
            playerHand.forEach(item => {
                if (item.rank==targetRank) {
                    const index = playerHand.indexOf(item)
                    playerHand.splice(index,1)
                }
            })
        }
            playerPoint()
            playerPointModal(targetRank)
        }
    })
}


/* Checks point conditions for bot */

function botPointModal(rank) {
    if (isNaN(rank)) {
        if (rank==="j") {
            modalMessage.textContent="I've gathered all the jacks! They'll be taken out of play, and my score will be increased by 1."
        } else if (rank==="q") {
            modalMessage.textContent="I've gathered all the queens! They'll be taken out of play, and my score will be increased by 1."
        } else if (rank==="k") {
            modalMessage.textContent="I've gathered all the kings! They'll be taken out of play, and my score will be increased by 1."
        } else {
            modalMessage.textContent="I've gathered all the aces! They'll be taken out of play, and my score will be increased by 1."
        }
    } else {
        modalMessage.textContent=`I've gathered all the ${rank}'s! They'll be taken out of play, and my score will be increased by 1.`
    }
    toggleVisibility(modalWindow)
}

function botPoint() {
    botScore+=1
    botScoreBoard.textContent=botScore
    message.textContent = "Bet you didn't see that coming! Now, where were we?"
}

function botPointCheck() {
    ranks.forEach(targetRank => {
        const checkingObject = botHand.filter(card => card.rank==targetRank)
        if (checkingObject.length === 4) {
            gameCheck()
            /* Iterating 9 times beacuse it won't iterate thoroughly ever */
            for(let i=0;i<10;i++) {
            botHand.forEach(item => {
                if (item.rank==targetRank) {
                    const index = botHand.indexOf(item)
                    botHand.splice(index,1)
                }
            })
            }
            botPoint()
            botPointModal(targetRank)
        }
    })
}

/* Allows deactivating modal once it pops up and you've read its message (generally following a point) */

modalOk.addEventListener("click", function() {toggleVisibility(modalWindow)})

/* Checks if the game is over */

function gameCheck() {
    if (botScore+playerScore===13) {
        game = "done"
        if (botScore>playerScore) {
            modalMessage.textContent=`And that's game!<br>Looks like I won with ${botScore} sets of four to your ${playerScore}. Better luck next time!`
        } else {
            modalMessage.textContent=`And that's game!<br>Looks like you won with ${playerScore} sets of four to my ${botScore} - congratulations!`
        }
        toggleVisibility(modal)
        toggleVisibility(modalOk)
    }
}

/* for later, perhaps

    function resetgame() {
    playingDeck=deck
    currentTurn = ""
    playerHand = []
    botHand = []
    playingDeck = deck;
    playerScore = 0
    playerScoreBoard.textContent=0;
    botScore = 0
    botScoreBoard.textContent=0;
    game = "on"
    dealHands()
} */