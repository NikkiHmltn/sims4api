const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log(`Connected at ${mongoose.connection.port}`)
    })
    .catch((err) => {
        console.log(`Error connecting to ${mongoose.connection.port}`, err)
    })
    
module.exports = {
    Pack: require('./Pack')
}