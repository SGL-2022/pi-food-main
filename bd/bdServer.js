const express = require("express");
const data = require('./bd.json');
const server = express();

server.use(express.json());

server.get('/', (req, res)=>{
    res.status(200).json(data);
})

server.listen(3002, () => {
    console.log('%s listening at 3002'); // eslint-disable-line no-console
});