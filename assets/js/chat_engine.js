class ChatEngine{
    constructor(email){
        this.userEmail = email; 
        this.socket = io.connect('http://localhost:3000'); 
        this.connectionHandler(); 
    }
    connectionHandler(){
        this.socket.on('connect', ()=>{
            console.log('Sockets is successfully connected to server. '); 
        }); 
        this.socket.on('message', (data)=>{
            this.registerData(data); 
        }); 
    }
    joinRoom(roomName){
        this.socket.emit('joinRoom', {from: this.userEmail, roomName: roomName}); 
        this.socket.on('sJoin', (msgs)=>{
            if(msgs.length > 0){
                msgs.forEach(element=>{
                    this.registerData(element); 
                }); 
            }
            this.setCookie('room', roomName, 1); 
        }); 
    }
    sendMessage(data){
        data.from = this.userEmail;
        this.socket.emit('message', data); 
    }
    registerData(data){
        if(data.from == this.userEmail){
            let doc = $('<div class="self-container">'); 
            doc.append($('<p class="self">').text(data.from)); 
            doc.append($('<p class="self">').text(data.message)); 
            $('.chatbox').append(doc); 
            document.getElementsByClassName('chatbox')[0].scrollBy(0, 100); 

        }else{
            let doc = $('<div class="other-container">'); 
            doc.append($('<p class="other">').text(data.from)); 
            doc.append($('<p class="other">').text(data.message)); 
            $('.chatbox').append(doc); 
            document.getElementsByClassName('chatbox')[0].scrollBy(0, 100); 
        }
    }
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
} 