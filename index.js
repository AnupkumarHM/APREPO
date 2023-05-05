const { log } = require("console");
const { Socket } = require("socket.io");
const { Configuration, OpenAIApi } = require("openai");
var dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "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",
});
const openai = new OpenAIApi(configuration);
const app = require("express")();
// const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const server = app.listen(port,'0.0.0.0');
const io = require("socket.io")(server);
app.get("/anup", (req, res) => {
  console.log("ii");
  res.sendFile("index.html", { root: __dirname });
});
app.get("/anup", (req, res) => {
  console.log("ii");
  res.sendFile("index.html", { root: __dirname });
});
app.get("/anup", (req, res) => {
  console.log("ii");
  res.sendFile("index.html", { root: __dirname });
});
var i = [];
io.on("connection", (socket) => {
  console.log(i);
  socket.emit("chatstater", i);
  console.log(socket.id);

  socket.on("chat message", async (msg) => {
    console.log(socket.id);
    var nm = msg.n1;
    var n = msg.n;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${nm}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text);
    var ress = response.data.choices[0].text;
    // console.log(nm);
    i.push(nm);
    io.emit("chat messag", { nm, ress });

    console.log(msg.n1 + "1");

    io.emit("chat messag", { nm, n });
  });
});

// // http.listen(port, () => {
// //   console.log(`Socket.IO server running at http://localhost:${port}/`);
// // });
// const express = require('express'); //requires express module
// const socket = require('socket.io'); //requires socket.io module
// const fs = require('fs');
// const app = express();
// var PORT = process.env.PORT || 3000;
// const server = app.listen(PORT); //tells to host server on localhost:3000

// //Playing variables:
// app.use(express.static('public')); //show static files in 'public' directory
// console.log('Server is running');
// const io = socket(server);

// var count = 0;

// //Socket.io Connection------------------
// io.on('connection', (socket) => {

//     console.log("New socket connection: " + socket.id)

//     socket.on('counter', () => {
//         count++;
//         console.log(count)
//         io.emit('counter', count);
//     })
// })
