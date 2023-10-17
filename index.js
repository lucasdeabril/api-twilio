const express = require('express');
const app = express();
const url = require('url');
const PORT = 3000;
app.use(express.json());
app.listen(PORT, ()=>{
    console.log(`servidor rodando em http//${PORT}/`)
})



