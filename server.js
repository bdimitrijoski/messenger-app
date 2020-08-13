var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");

app.use(express.static('src'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var users = {};
var connections = {};


io.on("connection", function(client) {
    console.log("Connection established");
    client.on("signin", function(e) {
        
        var userId = e.id;
        
        if(!users.hasOwnProperty(userId)){
            return;
        }

        client.user_id = userId;
        console.log("User  has connected!", client.user_id );

        if(!connections.hasOwnProperty(userId)){
            connections[userId] = client;
        }

        broadcast(userId, "userConnected", users[userId].user);
        
    });

    client.on("message", function(e) {
        let targetId = e.to;
        let sourceId = client.user_id;

        var message = {
            time: new Date().getTime(),
            to: users[targetId].user.name,
            from: users[sourceId].user.name,
            message: e.message
        };

        if(targetId && connections[targetId]) {
            
            connections[targetId].emit("message", message);
            users[targetId].history.push(message);
        }
    
        if(sourceId && connections[sourceId]) {
            connections[sourceId].emit("message", message);
            users[sourceId].history.push(message);
        }
      });
    
      client.on("disconnect", function() {
        console.log("User  has disconnected !", client.user_id);
        if (!client.user_id || !connections[client.user_id]) {
          return;
        }
        var connectionId = client.user_id;
        delete connections[connectionId];
        broadcast(connectionId, "userDisconnected", users[connectionId].user);
      });
});

app.get("/api/users", (req, res) => {
    var usersList = Object.keys(users).map(userId=>users[userId].user);
    res.send(usersList);
});

app.get("/api/history/:userId", (req, res) => {
    var userId = req.params.userId;
    if(!users.hasOwnProperty(userId)){
        res.status(404).send({ data: 'User does not exist!' });
        return;
    }

    res.send(users[userId].history);
});

// Serve landing page
app.get('/', function (req, res) {
    res.sendFile(__dirname + "index.html");
});

app.post('/api/authenticate', function (req, res) {
  
    var userId = Buffer.from(req.body.name+'_'+req.body.username).toString("base64");

    if(users.hasOwnProperty(userId)){
        res.status(200).send({ data: 'User already created' });
        return;
    }

    users[userId] = {
        history: [],
        user: req.body
    };
    res.status(201).send({ data: 'user created in db' });

});

function broadcast(curUserId, messageType, data) {
    for (var userId in connections) {
        if(userId===curUserId){
            continue;
        }
        connections[userId].emit(messageType, data);
    }
}

server.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});