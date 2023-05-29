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
    {suit: 'spades', rank:"jack"},
    {suit: 'spades', rank:"queen"},
    {suit: 'spades', rank:"king"},
    {suit: 'spades', rank:"ace"},
    {suit: 'hearts', rank:2},
    {suit: 'hearts', rank:3},
    {suit: 'hearts', rank:4},
    {suit: 'hearts', rank:5},
    {suit: 'hearts', rank:6},
    {suit: 'hearts', rank:7},
    {suit: 'hearts', rank:8},
    {suit: 'hearts', rank:9},
    {suit: 'hearts', rank:10},
    {suit: 'hearts', rank:"jack"},
    {suit: 'hearts', rank:"queen"},
    {suit: 'hearts', rank:"king"},
    {suit: 'hearts', rank:"ace"},
    {suit: 'clubs', rank:2},
    {suit: 'clubs', rank:3},
    {suit: 'clubs', rank:4},
    {suit: 'clubs', rank:5},
    {suit: 'clubs', rank:6},
    {suit: 'clubs', rank:7},
    {suit: 'clubs', rank:8},
    {suit: 'clubs', rank:9},
    {suit: 'clubs', rank:10},
    {suit: 'clubs', rank:"jack"},
    {suit: 'clubs', rank:"queen"},
    {suit: 'clubs', rank:"king"},
    {suit: 'clubs', rank:"ace"},
    {suit: 'diamonds', rank:2},
    {suit: 'diamonds', rank:3},
    {suit: 'diamonds', rank:4},
    {suit: 'diamonds', rank:5},
    {suit: 'diamonds', rank:6},
    {suit: 'diamonds', rank:7},
    {suit: 'diamonds', rank:8},
    {suit: 'diamonds', rank:9},
    {suit: 'diamonds', rank:10},
    {suit: 'diamonds', rank:"jack"},
    {suit: 'diamonds', rank:"queen"},
    {suit: 'diamonds', rank:"king"},
    {suit: 'diamonds', rank:"ace"}
]
const message = document.getElementById("message")
const startButton = document.getElementById("start-button")
const scoreBoard = document.getElementById("score")
const scoreHider = document.getElementById("score-button")
const askForCard = document.getElementById("ask-bot")
const okStart = document.getElementById("ok-start")
const turns = ["player","bot"]
const rankButtons = Array.from(document.querySelectorAll(".rank-button"))
const goFish = document.getElementById("go-fish")
const yourTurn = document.getElementById("bot-turn")
let currentTurn = ""
let playerHand = []
let botHand = []
let playingDeck = deck;

function activateRankButtons() {
    rankButtons.forEach(button => {
        button.addEventListener("click", function() {
            askBot(button.id.slice(4))
        })
    })
}

function playerDraw() {
    const pickIndex = Math.floor((Math.random()*playingDeck.length))
        const card = playingDeck[pickIndex]
        playerHand.unshift(card)
        playingDeck.splice(pickIndex, 1)
        const cardImage = document.getElementById(`${card.suit}`+`${card.rank}`)
        cardImage.style.display="flex"
}

function botDraw() {
    const pickIndex = Math.floor((Math.random()*playingDeck.length))
    const card = playingDeck[pickIndex]
    botHand.unshift(card)
    playingDeck.splice(pickIndex, 1) 
}

function toggleVisibility(element) {
    element.classList.toggle("visible")
    element.classList.toggle("invisible")
}

/* Kick off the game */

function dealHands() {
    for(let i=1;i<6;i++) {playerDraw()}
    for(let i=1;i<6;i++) {botDraw()}
}

function pickTurn() {
    currentTurn = turns[Math.floor(Math.random()*2)]
}

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

okStart.addEventListener("click", function() {
    dealHands()
    activateRankButtons()
    toggleVisibility(scoreBoard)
    toggleVisibility(scoreHider)
    toggleVisibility(okStart)
    if (currentTurn==="bot") {
        botAsk()
    }
    if (currentTurn==="player") {
        message.textContent = "Ask me for a card rank you've got!"
        toggleVisibility(askForCard)
    }
})

/* Ask bot for a card rank, bot loses, you get, cards appear */

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

function askBot(askRank) {
    let successful = "no"
    botHand.forEach (card => {
        if (card.rank == askRank) {
            const takenCard = botHand[botHand.indexOf(card)]
            botHand.splice(botHand.indexOf(card), 1)
            playerHand.unshift(takenCard)
            const takenCardImage = document.getElementById(`${takenCard.suit}`+`${takenCard.rank}`)
            takenCardImage.style.display="flex"
            message.textContent = "Darn, I do! Here you go, you rapscallion..."
            successful="yes"
        }
    })
    rankButtons.forEach(button => {
        if(button.classList.contains("visible")) {
            console.log(button)
            toggleVisibility(button)
        }
    })
    if (successful==="no") {
        message.textContent = "Nope! Looks like you gotta go fish."
        toggleVisibility(goFish)
    } else {
        toggleVisibility(yourTurn)
    }
}

/* Bot asks for a card, gets them, all relevant cards disappear from your hand */

function botAsk() {
    const askIndex = Math.floor((Math.random()*botHand.length))
    const askRank = botHand[askIndex].rank
    let successful = "no"
    playerHand.forEach (card => {
        if (card.rank === askRank) {
            const givenCard = playerHand[playerHand.indexOf(card)]
            console.log(playerHand[playerHand.indexOf(card)])
            playerHand.splice(playerHand.indexOf(card), 1)
            botHand.unshift(givenCard)
            const givenCardImage = document.getElementById(`${givenCard.suit}`+`${givenCard.rank}`)
            givenCardImage.style.display="none"
            successful = "yes"
            message.textContent = `I'll just go ahead and take any ${askRank} cards you have`
        }
    })
    if (successful === "no") {
        message.textContent = `I wanted at least ONE ${askRank}, but alas, I had to go fish.`
    }
}