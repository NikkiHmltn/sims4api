const db = require('../models')

// ============= Pack Controllers ============== // 

const getAllPacks = async (req, res) => {
    try{

        if(req.query.t){
            return getAllTypePacks(req, res)
        }
        await db.Pack.find({})
        .then((packs) => {
            dbSuccess(res, packs, 'Found all packs')
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

const getOnePack = async (req, res) => {
    try{
        let rawName = req.params.name.toLowerCase()
        let cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1)
        await db.Pack.find({'name': cleanName})
        .then((pack) => {
            dbSuccess(res, pack, 'Found pack')
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

const getRandomPack = async (req, res) => {
    try{
        await db.Pack.find({}) 
        .then((packs) => {
            let randNumber = Math.floor(Math.random() * packs.length)
            console.log(packs[randNumber])
            dbSuccess(res, packs[randNumber], 'Found all packs')
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

// ========== Pack Type Sorters ============ //

const getAllTypePacks = async (req, res) => {
    // ?t=type
    try{
        let rawPType = req.query.t
        let packType = rawPType.toLowerCase()
        let propType = packType.charAt(0).toUpperCase() + packType.slice(1)
        await db.Pack.find({'type': propType})
        .then(packs => {
            dbSuccess(res, packs, `Found all packs by type: ${packType}`)
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
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

module.exports = {
    getAllPacks,
    getOnePack,
    getRandomPack,
    // filtering packs
    getAllTypePacks,
}