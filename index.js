const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(server)
app.use(
  express.static( path.join(__dirname, '/static') )
)

const stats = { gold: 50000, wood: 0, stone: 0, food: 0, iron: 0 }
const priceList = { wood: 1.5, stone: 2.5, food: 1, iron: 75 }

const users = []

var ticks=setInterval(raiseTick,6000);


io.on('connection', socket => {

  console.log(socket.id + ': client connected')
  
  socket.on('user-connected', msg => {  // Cuando se conecta le damos un paquete inicial y lo guardamos con su id en users
      let initialStats = {id: socket.id, wood: 100, stone: 100, food: 100, iron: 0, gold: 0}
      users.push(initialStats)
      
      io.to(socket.id).emit("syncStatsInit", initialStats,priceList)
      console.log(users)
    io.emit("greetings", "Greetings! User connected: " + socket.id)
  })

  socket.on('disconnecting', () => {    // Borramos la entrada de users del socket id que se va
    users.splice(users.findIndex(x => x.id === socket.id),1)
    //console.log(users)
    console.log(socket.id + " disconnected. Deleting his profile..."); 
  });

  socket.on('sellToTown', (type,quantity,seller) => {    // Vendemos quantity de X item desde seller
    stats.gold -= quantity * priceList[type]
    stats[type] += quantity

    seller = users.find(x => x.id === seller)
    seller[type] -= quantity
    seller.gold += quantity * priceList[type]
    console.log("Buying " + quantity + " " + type +  " for " + quantity * priceList[type] + " gold to: " + seller.id)
    io.emit("printCityStats", stats)
})

  socket.on('chat', message => {    // Chat
    io.emit('chat', {message, id: socket.id})
  })

})

function raiseTick() {
    getJobs()
}

function getJobs() {
    users.forEach(user => {
        user.wood += 20
        user.stone += 10
        user.food += 16
        user.iron += 1
        io.to(user.id).emit("syncStats", user)
    });
    //console.log(users)
}

const port = process.env.PORT || 3000
server.listen(port, ()=> {
  console.log('listening on: ', port)
})

