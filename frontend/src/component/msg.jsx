import React, { useState } from 'react';
// import {socket} from '../component/socketIO'
import {io} from "socket.io-client"
import server from '../server';




const socket = io('http://localhost:3000'); 




//making the get request 

function displayMessage(message){
    const div = document.createElement("div");
    div.textContent=message;
    // console.log(div.textContent);
    document.getElementById("message-container").append(div);
}
socket.on('recieve-msg',message=>{
    console.log(message);
    displayMessage(message);
})

socket.on("enter-room",message=>{
    displayMessage(message)
})
export default function Msg(){
    ////////////////////////////
    //// setting msgState
    const [msg,setMsg] = useState("hello"); 
    const [room,setRoom] = useState("test"); 

    socket.on('connect',()=>{
        console.log(`you are connected with ${socket.id}`);
      })
      
      socket.on("enter-room",message=>{
        displayMessage(message)
    })
      ///////////////////// 
      // making the function to add the messege 
   
    
    return(
        <div>
        <div id='message-container'>
        </div>
        {msg}
        <form>
        <input type='text' value={msg} onChange={(e)=>{
            setMsg(e.target.value)
        }} ></input>
        <input type='text' value={room} onChange={(e)=>{
            setRoom(e.target.value)
        }} ></input>
        <button type='submit' onClick={(e)=>{
            e.preventDefault();
            /////////////////////////////////////
            ////// sending the messeges to rooms 
            ////// 
            const message = msg;
            const msg_room =room;
            if(message==="")return;
            displayMessage(message);
            socket.emit('send-msg',message,msg_room);
            // defining the event listner in the server 
            setMsg("");

            
        }}>send</button>
        <button onClick={(e)=>{
    //  we would need to tell the server that we are going to enter the room
    e.preventDefault();
    socket.emit('join-room',room,message=>{
        displayMessage(message);

    })
        }}>Join</button>
        <button onClick={(e)=>{
            e.preventDefault();
            socket.emit("get-alldata");
        }}>
        all data 
        </button>
        </form>
        
        </div>
    );
}