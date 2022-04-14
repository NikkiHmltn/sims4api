const db = require('../models')

// ========== Strict Sims Ambitions Queries ============ //

const getAllSimsAmbitions = (req, res) => {
    try {
        db.Pack.find()
        .then(packs => {
            let ambitionsArr = []
            packs.map(pack => {
                ambitions = pack.ambitions
                if(ambitions.length) ambitionsArr.push(ambitions)
            })
            
           dbSuccess(res, ambitionsArr.flat(), "successfully found all ambitions")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

const getPackSimAmbitions = (req, res) => {
    try {
        let rawName = req.params.pack.toLowerCase()
        const cleanName = rawName.split(' ').map(capitalize).join(' ')
        db.Pack.find({"ambitions.$.name": cleanName})
        .then(packs => {
            let ambitionsArr = []
            packs.map(pack => {
                ambitions = pack.ambitions
                if(ambitions.length && ambitions[0].pack.includes(cleanName)) ambitionsArr.push(ambitions)
            })
            dbSuccess(res, ambitionsArr.flat(), "Successful find of ambitions for a pack")
        })
        .catch(err => dbFail(res, err))

    } catch (err) {catchFail(res, err)}
}

const getSpecificSimsAmbition = (req, res) => {
    try {
        let rawName = req.params.ambitionName.toLowerCase()
        const cleanName = rawName.split(' ').map(capitalize).join(' ')
        db.Pack.find({ambitions: {$elemMatch: {name: cleanName}}})
        .then(pack => {
            let ambitions = pack[0].ambitions
            let ambition = ambitions.find(t => t.name === cleanName)
            dbSuccess(res, ambition, "Successful find of unique ambition")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

// This includes an optional ?n=int in query
const getRandomSimsAmbition = async (req, res) => {
    try {
        // bring in pack array from body
        if (req.query.n) {
            let num = parseInt(req.query.n)
            let randPacks = await db.Pack.aggregate(
                [
                    {$match: 
                        // set up a match where "name" $in [pack array]
                        {"ambitions": {$exists: true, $not: {$size: 0}}}
                    },
                    {$sample: {size:num}}
                ] 
            );
            let ambitions = []
            for (let i=0; i < randPacks.length; i++){
                let randNumber = Math.floor(Math.random() * randPacks[i].ambitions.length)
                let ambition = randPacks[i].ambitions[randNumber]
                ambitions.push(ambition)
            }   
            return dbSuccess(res, ambitions, 'Random Ambition Found')
        }
        await db.Pack.aggregate(
            [
                {$match: {"ambitions": {$exists: true, $not: {$size: 0}}}},
                {$sample: {size:1}}
            ] 
            )
        .then(pack => {
            let ambitionsArr = pack[0].ambitions
            let randNumber = Math.floor(Math.random() * ambitionsArr.length)
            let ambitions = ambitionsArr[randNumber]
            dbSuccess(res, ambitions, 'Random Ambitions Found')
        })
        .catch(err => dbFail(res, err))

    }catch (err) {catchFail(res, err)}
}


// ========== Error Handling and Success ============ //

const dbSuccess = (res, data, msg) => {
    if (!data) {
        return res.status(404).json({message: "No results for that query in the database. Try searching something else."})
    }
    return res.status(200).json({data: data, message: msg})
}

const dbFail = (res, err) => {
    console.log(err)
    return res.status(400).json({err: err})
}

const catchFail = (res, err) => {
    console.error(err)
    res.status(500).json({err: err})
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

module.exports = {
    getAllSimsAmbitions,
    getPackSimAmbitions,
    getRandomSimsAmbition,
    getSpecificSimsAmbition
}