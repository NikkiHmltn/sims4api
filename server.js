require('dotenv').config();
const e = require('express');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const routes = require('./routes')
const apiCheck = require('./middleware/checkKey')

app.use("/test", (req, res) =>{
    res.send("Test")
})

app.use("/api/v1", apiCheck.checkValidKey, routes)

app.use((req,res) => {
    res.status(404).json({message: "Not a proper route."})
})

app.listen(process.env.PORT, (req, res) =>{
    console.log(`Server running on port:${process.env.PORT}`)
})