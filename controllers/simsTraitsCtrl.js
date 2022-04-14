const db = require('../models')

// ========== Strict Sims Traits Queries ============ //

const getAllSimTraits = (req, res) => {
    try {
        db.Pack.find()
        .then(packs => {
            let traitsArr = []
            packs.map(pack => {
                simsTraits = pack.sims_traits
                if(simsTraits.length) traitsArr.push(simsTraits)
            })
            
           dbSuccess(res, traitsArr.flat(), "successfully found all traits")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

const getPackSimTraits = (req, res) => {
    try {
        let rawName = req.params.pack.toLowerCase()
        let cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1)
        db.Pack.find({"sims_traits.$.pack": cleanName})
        .then(packs => {
            let traitsArr = []
            packs.map(pack => {
                simsTraits = pack.sims_traits
                if(simsTraits.length && simsTraits[0].pack.includes(cleanName)) traitsArr.push(simsTraits)
            })
            dbSuccess(res, traitsArr.flat(), "Successful find of traits for a pack")
        })
        .catch(err => dbFail(res, err))

    } catch (err) {catchFail(res, err)}
}

const getSpecificSimsTrait = (req, res) => {
    try {
        let rawName = req.params.traitName.toLowerCase()
        let cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1)
        db.Pack.find({"sims_traits.trait": cleanName})
        .then(pack => {
            let trait = pack[0].sims_traits.find(t => t.trait === cleanName)
            dbSuccess(res, trait, "Successful find of unique trait")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

// This includes an optional ?n=int in query
const getRandomSimsTrait = async (req, res) => {
    try {
        // bring in pack array from body
        if (req.query.n) {
            let num = parseInt(req.query.n)
            let randPacks = await db.Pack.aggregate(
                [
                    {$match: 
                        // set up a match where "name" $in [pack array]
                        {"sims_traits": {$exists: true, $not: {$size: 0}}}
                    },
                    {$sample: {size:num}}
                ] 
            );
            let traits = []
            for (let i=0; i < randPacks.length; i++){
                let randNumber = Math.floor(Math.random() * randPacks[i].sims_traits.length)
                let packTrait = randPacks[i].sims_traits[randNumber]
                console.log(packTrait, "PACK TRAIT")
                traits.push(packTrait)
            }   
            return dbSuccess(res, traits, 'Random Traits Found')
        }
        await db.Pack.aggregate(
            [
                {$match: {"sims_traits": {$exists: true, $not: {$size: 0}}}},
                {$sample: {size:1}}
            ] 
            )
        .then(pack => {
            let traitArr = pack[0].sims_traits
            let randNumber = Math.floor(Math.random() * traitArr.length)
            let trait = traitArr[randNumber]
            dbSuccess(res, trait, 'Random Trait Found')
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

module.exports = {
    getAllSimTraits,
    getPackSimTraits,
    getRandomSimsTrait,
    getSpecificSimsTrait
}