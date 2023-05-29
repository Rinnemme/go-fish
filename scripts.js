const deck = [
    {suit: 'spades', rank:'2'},
    {suit: 'spades', rank:'3'},
    {suit: 'spades', rank:'4'},
    {suit: 'spades', rank:'5'},
    {suit: 'spades', rank:'6'},
    {suit: 'spades', rank:'7'},
    {suit: 'spades', rank:'8'},
    {suit: 'spades', rank:'9'},
    {suit: 'spades', rank:'10'},
    {suit: 'spades', rank:'jack'},
    {suit: 'spades', rank:'queen'},
    {suit: 'spades', rank:'king'},
    {suit: 'spades', rank:'ace'},
    {suit: 'hearts', rank:'2'},
    {suit: 'hearts', rank:'3'},
    {suit: 'hearts', rank:'4'},
    {suit: 'hearts', rank:'5'},
    {suit: 'hearts', rank:'6'},
    {suit: 'hearts', rank:'7'},
    {suit: 'hearts', rank:'8'},
    {suit: 'hearts', rank:'9'},
    {suit: 'hearts', rank:'10'},
    {suit: 'hearts', rank:'jack'},
    {suit: 'hearts', rank:'queen'},
    {suit: 'hearts', rank:'king'},
    {suit: 'hearts', rank:'ace'},
    {suit: 'clubs', rank:'2'},
    {suit: 'clubs', rank:'3'},
    {suit: 'clubs', rank:'4'},
    {suit: 'clubs', rank:'5'},
    {suit: 'clubs', rank:'6'},
    {suit: 'clubs', rank:'7'},
    {suit: 'clubs', rank:'8'},
    {suit: 'clubs', rank:'9'},
    {suit: 'clubs', rank:'10'},
    {suit: 'clubs', rank:'jack'},
    {suit: 'clubs', rank:'queen'},
    {suit: 'clubs', rank:'king'},
    {suit: 'clubs', rank:'ace'},
    {suit: 'diamonds', rank:'2'},
    {suit: 'diamonds', rank:'3'},
    {suit: 'diamonds', rank:'4'},
    {suit: 'diamonds', rank:'5'},
    {suit: 'diamonds', rank:'6'},
    {suit: 'diamonds', rank:'7'},
    {suit: 'diamonds', rank:'8'},
    {suit: 'diamonds', rank:'9'},
    {suit: 'diamonds', rank:'10'},
    {suit: 'diamonds', rank:'jack'},
    {suit: 'diamonds', rank:'queen'},
    {suit: 'diamonds', rank:'king'},
    {suit: 'diamonds', rank:'ace'}
]

let playerHand = []
let botHand = []

let playingDeck = deck;

function humanDraw() {
    const pickIndex = Math.floor((Math.random()*playingDeck.length))
        const card = playingDeck[pickIndex]
        playerHand.unshift(card)
        playingDeck.splice(pickIndex, 1)
}

function botDraw() {
    const pickIndex = Math.floor((Math.random()*playingDeck.length))
        const card = playingDeck[pickIndex]
        botHand.unshift(card)
        playingDeck.splice(pickIndex, 1) 
}

function dealHands() {
    for(let i=1;i<8;i++) {humanDraw()}
    for(let i=1;i<8;i++) {botDraw()}
}

dealHands()