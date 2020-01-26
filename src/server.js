const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocked } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocked(server);

mongoose.connect('mongodb+srv://oministack10:oministack10@oministack10-llh6x.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);