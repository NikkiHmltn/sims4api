require('dotenv').config();

const db = require('./models')
const fs = require('fs')

const packSeeds = JSON.parse(fs.readFileSync(`${__dirname}/simspacks.json`))

const removePackInfo = async() => {
    try {
        await db.Pack.deleteMany()
        .then(()=> console.log("Deleted All Packs"))
        .catch((err) => console.log(err))
    }
    catch(err){
        console.log(err)
    }
}

removePackInfo()

const addPackInfo = async() => {
    try {
        await db.Pack.insertMany(packSeeds)
        .then(() => {
            console.log("success")
        })
        .catch((err) => console.log(err))
    }catch (err) {
        console.log(err)
    }
}

addPackInfo()