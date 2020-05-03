module.exports.socketServe = function(socketServer){
    const io = require('socket.io')(socketServer); 
    var messages = []; 
    io.on('connection', (socket)=>{
        socket.on('disconnect', ()=>{
            
        }); 
        socket.on('joinRoom', function(data){
            socket.join(data.roomName); 
            let msgs = messages.filter((element)=>{
                return element.roomName == data.roomName; 
            }); 
            io.to(socket.id).emit('sJoin', msgs);  
        }); 
        socket.on('message', (data)=>{
            console.log(messages); 
            data.message = data.message.trim(' ');  
            messages.push(data); 
            if(!data.message == ''){
                io.in(data.roomName).emit('message', data); 
            }
        })
    }); 

}