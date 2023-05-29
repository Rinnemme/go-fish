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
const message = document.getElementById("message")
const startButton = document.getElementById("start-button")
const scoreBoard = document.getElementById("score")
const scoreHider = document.getElementById("score-button")
const askForCard = document.getElementById("ask-bot")
const okStart = document.getElementById("ok-start")
const turns = ["player","bot"]
const rankButtons = Array.from(document.querySelectorAll(".rank-button"))
const cardImages = Array.from(document.querySelectorAll(".playing-card"))
const goFish = document.getElementById("go-fish")
const yourTurn = document.getElementById("bot-turn")
const myTurn = document.getElementById("player-turn")
const playerScoreBoard = document.getElementById("player-score")
const botScoreBoard = document.getElementById("bot-score")
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k", "a"]
const modalOk = document.getElementById("modal-button")
const modalWindow = document.getElementById("modal")
const modalMessage = document.getElementById("modal-text")
let currentTurn = ""
let playerHand = []
let botHand = []
let playingDeck = deck;
let playerScore = 0
let botScore = 0

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
        toggleVisibility(cardImage)
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

function playerTurn() {
    message.textContent = "Ask me for a card rank you've got!"
    toggleVisibility(askForCard)
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
        toggleVisibility(myTurn)
    }
    if (currentTurn==="player") {
        playerTurn()
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
            toggleVisibility(takenCardImage)
            message.textContent = "Darn, I do! Here you go, you rapscallion..."
            successful="yes"
        }
    })
    rankButtons.forEach(button => {
        if(button.classList.contains("visible")) {
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

/* Player goes fish */

goFish.addEventListener("click", function() {
    playerDraw()
    message.textContent = "Enjoy that new card!"
    toggleVisibility(goFish)
    toggleVisibility(yourTurn)
})

/* Make it bot's turn */

yourTurn.addEventListener("click", function() {
    botAsk()
    toggleVisibility(yourTurn)
    toggleVisibility(myTurn)
})

/* Make it player's turn */

myTurn.addEventListener("click", function() {
    playerTurn()
    toggleVisibility(myTurn)
})

/* Bot asks for a card, gets them, all relevant cards disappear from your hand */

function botAsk() {
    const askIndex = Math.floor((Math.random()*botHand.length))
    const askRank = botHand[askIndex].rank
    let successful = "no"
    playerHand.forEach (card => {
        if (card.rank === askRank) {
            const givenCard = playerHand[playerHand.indexOf(card)]
            playerHand.splice(playerHand.indexOf(card), 1)
            botHand.unshift(givenCard)
            const givenCardImage = document.getElementById(`${givenCard.suit}`+`${givenCard.rank}`)
            toggleVisibility(givenCardImage)
            successful = "yes"
            message.textContent = `I'll just go ahead and take any ${askRank}s you have`
        }
    })
    if (successful === "no") {
        botDraw()
        message.textContent = `I wanted at least ONE ${askRank}, but alas, I had to go fish.`
    }
}

/* Check point conditions */

function playerPointCheck() {
    ranks.forEach(rankCheck => {
        const checkingObject = playerHand.filter(card => card.rank==rankCheck)
        console.table(checkingObject)
        if (checkingObject.length === 4) {
            for (let i=0;i<playerHand.length;i++) {
                if (playerHand[i].rank===rankCheck) {
                    playerHand.splice(i,1)
                }
            }
            cardImages.forEach(image => {
                console.log(image)
                if (image.id.slice(-1)==rankCheck && image.classList.contains("visible")) {
                    toggleVisibility(image)
                }
            })
            playerScore+=1
            playerScoreBoard.textContent=playerScore
            if (isNaN(rankCheck)) {
                if (rankCheck==="j") {
                    modalMessage.textContent="Wow, you've gathered all the jacks! As such, they'll be taken out of your hand and your score will be increased by 1."
                } else if (rankCheck==="q") {
                    modalMessage.textContent="Wow, you've gathered all the queens! As such, they'll be taken out of your hand and your score will be increased by 1."
                } else if (rankCheck==="k") {
                    modalMessage.textContent="Wow, you've gathered all the kings! As such, they'll be taken out of your hand and your score will be increased by 1."
                } else {
                    modalMessage.textContent="Wow, you've gathered all the aces! As such, they'll be taken out of your hand and your score will be increased by 1."
                }
            } else {
                modalMessage.textContent=`Wow, you've gathered all the ${rankCheck}'s! As such, they'll be taken out of your hand and your score will be increased by 1.`
            }
            toggleVisibility(modalWindow)
        }
    })
}

function botPointCheck() {
    ranks.forEach(rankCheck => {
        const checkingObject = botHand.filter(card => card.rank==rankCheck)
        console.table(checkingObject)
        if (checkingObject.length === 4) {
            for (let i=0;i<botHand.length;i++) {
                if (botHand[i].rank===rankCheck) {
                    botHand.splice(i,1)
                }
            }
            botScore+=1
            botScoreBoard.textContent=botScore
            if (isNaN(rankCheck)) {
                if (rankCheck==="j") {
                    modalMessage.textContent="I've gathered all the jacks! As such, they'll be taken out of my hand and my score will be increased by 1."
                } else if (rankCheck==="q") {
                    modalMessage.textContent="I've gathered all the queens! As such, they'll be taken out of my hand and my score will be increased by 1."
                } else if (rankCheck==="k") {
                    modalMessage.textContent="I've gathered all the kings! As such, they'll be taken out of my hand and my score will be increased by 1."
                } else {
                    modalMessage.textContent="I've gathered all the aces! As such, they'll be taken out of my hand and my score will be increased by 1."
                }
            } else {
                modalMessage.textContent=`I've gathered all the ${rankCheck}'s! As such, they'll be taken out of my hand and my score will be increased by 1.`
            }
            toggleVisibility(modalWindow)
        }
    })
}

modalOk.addEventListener("click", function() {toggleVisibility(modalWindow)})