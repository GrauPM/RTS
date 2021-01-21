const socket = io()

socket.emit('user-connected')

let userStats = []
let priceList

const goldP = document.getElementById('gold')
const woodP = document.getElementById('wood')
const stoneP = document.getElementById('stone')
const foodP = document.getElementById('food')
const ironP = document.getElementById('iron')

function sell(type, quantity) {
    if (quantity === 0) {
        quantity = userStats[type]
    }
    if (userStats[type] >= quantity) {
        userStats[type] -= quantity
        userStats.gold += quantity * priceList[type]
        console.log("Selling %c" + quantity + " %c" + type +" for %c" + quantity * priceList[type] + "%c. Now you have: " + "%c" + userStats[type], 
            "color: lightgreen"," color: white", "color: gold", "color: white", "color: lightgreen")
        socket.emit('sellToTown', type, quantity, userStats.id)
    }
    else {
        console.log("Can't sell!")
    }
    updateStats()
}

function getStats(data) {
    userStats = data
    console.log("tick")
    //console.log(userStats)
}

function updateStats() {
    goldP.innerText = userStats.gold
    woodP.innerText = userStats.wood
    stoneP.innerText = userStats.stone
    foodP.innerText = userStats.food
    ironP.innerText = userStats.iron
}
socket.on("greetings", (arg) => {
    console.log(arg); 
});

socket.on("printCityStats", (arg) => {
    console.log(arg)
})

socket.on("syncStatsInit", (arg, prices) => {
    priceList = prices
    getStats(arg)
    updateStats()
    //console.log(arg)
})
socket.on("syncStats", (arg) => {
    getStats(arg)
    updateStats()
    //console.log(arg)
})

// Chat service ------------------------------------------------

const chat = document.querySelector('.chat-form')
const chatInput = document.querySelector('.chat-input')

chat.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chat', chatInput.value)
    chatInput.value = ''
})

const chatDump = document.querySelector('.chat-dump')

const render = ({message, id}) => {
  const div = document.createElement('div')
  div.classList.add('chat-message')
  if (id === socket.id) { 
    div.classList.add('chat-message--user')
  }
  div.innerText = message
  chatDump.appendChild(div)
}

socket.on('chat', data => {
  render(data)
})