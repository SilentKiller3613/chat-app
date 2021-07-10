const socket = io('http://localhost:8000');

// Get elements in respective Javascript variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio 
var audio = new Audio('sound.mp3');

// Function to append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        audio.play();
    }
}


// Ask new user and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// receive new user from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

// receive it message from server
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

// let others know, someone left
socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})