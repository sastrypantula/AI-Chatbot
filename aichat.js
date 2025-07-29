// // const express=require('express');
// // const app=express();
// // const main=require('./sample.js');
// // app.use(express.json())
// // app.post('/chat', async (req, res) => {
// //   const promptText = req.body.msg; // pull the message string
// //   try {
// //     const answer = await main(promptText);
// //     res.send(answer);
// //   } catch (err) {
// //     res.status(500).send("Error: " + err.message);
// //   }
// // });
// // app.listen(5000,()=>{
// //     console.log("I am listiening...");
// // })

// // -------------------------------------------------------------------------------------------------
// const express = require('express');
// const app = express();
// const main = require("./sample.js")
// const Chat=require("./database")
// const mongoose=require('mongoose')

// async function connectDB() {
//   try {
//     await mongoose.connect("mongodb+srv://sivaramasastrypantula:Sastry%402097@codingadda.nuyhhmw.mongodb.net/Chatbot?retryWrites=true&w=majority");
//     console.log("✅ Connected to MongoDB");
//   } catch (error) {
//     console.error("❌ DB Connection Error:", error.message);
//   }
// }
// connectDB();


// app.use(express.json());



// // const chattingHistory = {
// //     1: [{role:'user', parts: [{text:"Hi, How are you"}]}, {role:'model', parts:[{text:"I am Good what about you "}]}],
// //     2: [],
// //     3:[],
// //     4:[],
// // }
// // We will install our user chat history here
// // key: value pair
// // key = id
// // value = array



// app.post('/chat', async(req,res)=>{
     
//     const {id, msg} = req.body;
//       if (!msg) return res.status(400).send("Message is required");


//      const chat = await Chat.findById(id); 
//      let History=[];
//     if(!chat){
//         const newChat = new Chat({ history: [] });
//        await newChat.save();
    
//       console.log(newChat._id); // Access the document’s unique ID
//     }
//     else{
//         History=chat.history;
//     }
     
//     // extract user history
  
// //  [] array of history

//     // History+current ; array

//     // [{},{},{},{}, {}]
//     const promptmessage = [...History , {
//         role:'user',
//         parts: [{text:msg}]
//     }]

//     const answer = await main(promptmessage);
    

//     // User question ko bhi insert karna hai
//     // model ke resonse ko bhi insert karna
//     History.push({role:'user', parts:[{text:msg}]})
//     History.push({role:'model', parts:[{text:answer}]});
//     res.send(answer);

// })

// // [{text:answer},{img:"hfjhasj"},{video:"iufhsahfsaf"}]



// app.listen(3000, ()=>{
//     console.log("Listening at port 3000");
// })

const express = require('express');
const mongoose = require('mongoose');
const Chat = require('./database');
const main = require('./sample.js');

const app = express();
app.use(express.json());

// 🔗 Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://sivaramasastrypantula:Sastry%402097@codingadda.nuyhhmw.mongodb.net/Chatbot?retryWrites=true&w=majority");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
}
connectDB();

// 🧠 Handle Chat Request
app.post('/chat', async (req, res) => {
  const { id, msg } = req.body;

  if (!msg || !msg.trim()) {
    return res.status(400).send("Message cannot be empty");
  }

  try {
    let chat = null;
    let History = [];

    // 🌐 Retrieve chat history if ID is provided and valid
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid chat ID format");
      }
      chat = await Chat.findById(id);
      if (chat) History = [...chat.history];
    }

    // 🧾 Append user message
    History.push({ role: "user", parts: [{ text: msg }] });

    // 🤖 Gemini AI response
    const answer = await main(History);

    // 🧾 Append model reply
    History.push({ role: "model", parts: [{ text: answer }] });

    // 💾 Save updated chat
    if (chat) {
      chat.history = History;
      await chat.save();
      res.send({ reply: answer, id: chat._id });
    } else {
      const newChat = new Chat({ history: History });
      await newChat.save();
      res.send({ reply: answer, id: newChat._id });
    }

  } catch (error) {
    console.error("❌ Chat error:", error.message);
    res.status(500).send("Server error");
  }
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("🚀 Listening on port 3000");
});