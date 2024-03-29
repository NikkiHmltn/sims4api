require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

console.log(process.env.REACT_APP_HEROKU_URL)

/* ======== MIDDLEWARE ========= */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: process.env.REACT_APP_HEROKU_URL}))

/* ======== INTERNAL MIDDLEWARE ========= */
const routes = require('./routes')
const apiCheck = require('./middleware/checkKey')

/* ======== ROUTES ======== */
app.use("/test", (req, res) =>{
    res.send("Test")
})

app.use("/api/v1", apiCheck.checkValidKey, routes)

app.use((req,res) => {
    res.status(404).json({message: "Not a proper route."})
})

/* ======= LISTENER ======= */
app.listen(process.env.PORT, (req, res) =>{
    console.log(`Server running on port:${process.env.PORT}`)
})