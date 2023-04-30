const mongoose =require('mongoose');
const io = require('socket.io')(3000,{
    cors:{
        origin:['http://localhost:5173']
    }
});
mongoose.set('strictQuery', false);
//connect to url 
mongoose.connect("mongodb://127.0.0.1:27017/chat");


// making the schema 
const chatSchema=new mongoose.Schema({
   room:String,
   nonce:Number,
   sender_id:String,
   chat:String, 
   time:Date
  })

const Chat =mongoose.model("chat",chatSchema);


io.on('connection',socket=>{
    // defining the event listner 
    socket.on('send-msg',(message,room)=>{
        console.log(message,room);
        if(room===""){
            socket.broadcast.emit('recieve-msg',message);  
        }
        else{
            socket.to(room).emit('recieve-msg',message);
        }
    })

    socket.on('join-room',(room,cb)=>{
        //  join the use in the room
        const chatone=new Chat({
            room:"test",
            nonce:2,
            sender_id:"qfFEpzmEhFPMKwB7AABD",
            chat:"hello",
        })
        chatone.save().then(r=>console.log(r)).catch(e=>console.log(e));
        socket.join(room);
        socket.to(room).emit("enter-room",`${socket.id} joined ${room}`)
        cb(`${socket.id} joined ${room}`)
     })
     socket.on('get-alldata',()=>{
        Chat.find().then(r=>{
            console.log(r)
        }).catch(e=>{
            console.log(e);
        })
     })
})




