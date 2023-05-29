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

let playerHand = []
let botHand = []
let turn = "player"

let playingDeck = deck;

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

function dealHands() {
    for(let i=1;i<6;i++) {playerDraw()}
    for(let i=1;i<6;i++) {botDraw()}
}

/* Ask bot for a card rank, bot loses, you get, cards appear */

function askBot(askRank) {
    botHand.forEach (card => {
        if (card.rank === askRank) {
            const takenCard = botHand[botHand.indexOf(card)]
            botHand.splice(botHand.indexOf(card), 1)
            playerHand.unshift(takenCard)
            const takenCardImage = document.getElementById(`${takenCard.suit}`+`${takenCard.rank}`)
            takenCardImage.style.display="flex"
        }
    })
}

/* Bot asks for a card, gets them, all relevant cards disappear from your hand */

function botAsk() {
    const askIndex = Math.floor((Math.random()*botHand.length))
    const askRank = botHand[askIndex].rank
    console.log("ask rank is " + askRank)
    playerHand.forEach (card => {
        if (card.rank === askRank) {
            const givenCard = playerHand[playerHand.indexOf(card)]
            console.log(playerHand[playerHand.indexOf(card)])
            playerHand.splice(playerHand.indexOf(card), 1)
            botHand.unshift(givenCard)
            const givenCardImage = document.getElementById(`${givenCard.suit}`+`${givenCard.rank}`)
            givenCardImage.style.display="none"
        }
    })
}



dealHands()