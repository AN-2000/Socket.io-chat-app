const socket = require("socket.io")
const http = require("http")
const chalk = require("chalk")

const obj = {}

const server = http.createServer(function(req,res){

})

const socketServer = socket(server)
socketServer.on("connect",function(socket){
    // console.log(socket.id)
    socket.on("joined",function(data){
        obj[data] = socket.id
        console.log(data+" has joined the server")
        console.log(obj)
        socket.broadcast.emit('broadcast',chalk.yellow( data+" has joined"));
    })

    socket.on("chatting",function(data){
        // console.log(data)
        socket.broadcast.emit('broadcast', chalk.green(data));
    })

    socket.on("privateL",function(data){
        var arr = data.split("+")
        // console.log(arr)
        var id = obj[arr[1]]
        // console.log(id)
        socketServer.to(`${id}`).emit('privateMsg',chalk.red("@"+arr[0]+":"+arr[2]));
    })



   
})



server.listen(3000,function(){
    console.log("server is listening at 3000")
})