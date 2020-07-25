const client = require("socket.io-client")
const socket = client.connect("http://localhost:3000")
const readline = require("readline")

let username = ""

var reader = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt:">>"
})


reader.question('What is your name? ', (answer) => {
    username = answer
    console.log(`Hi ${answer}`);
    socket.emit("joined",answer)
    reader.prompt()
});




socket.on("broadcast",function(data){
    console.log(data)
    reader.prompt()
})

socket.on("privateMsg",function(data){
    // console.log('asdkhasbj')
    console.log(data)
    reader.prompt()
})








reader.on("line",function(data){
    var arr = data.split(" ")
    
    if(arr[0] ==="private"){
        // console.log(arr[1]+" "+arr[2]+" ")
        let reciever = arr[1];
         arr.shift()
         arr.shift()
        data = arr.join(" ")
     socket.emit("privateL",username+"+"+reciever+"+"+data)
     

    }else{
    socket.emit("chatting","@"+username+":"+data)
    
    }

    reader.prompt()
    })
