const db = require('../models')

// ========== Strict Lot Traits Queries ============ //

const getAllLotTraits = (req, res) => {
    try {
        db.Pack.find()
        .then(packs => {
            let traitsArr = []
            packs.map(pack => {
                lotTraits = pack.lot_traits
                if(lotTraits.length) traitsArr.push(lotTraits)
            })
            
           dbSuccess(res, traitsArr.flat(), "successfully found all traits")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

const getPackLotTraits = (req, res) => {
    try {
        let packName = req.params.pack
        db.Pack.find({"lot_traits.$.pack": packName})
        .then(packs => {
            let traitsArr = []
            packs.map(pack => {
                lotTraits = pack.lot_traits
                if(lotTraits.length && lotTraits[0].pack.includes(packName)) traitsArr.push(lotTraits)
            })
            dbSuccess(res, traitsArr.flat(), "Successful find of traits for a pack")
        })
        .catch(err => dbFail(res, err))

    } catch (err) {catchFail(res, err)}
}

const getSpecificLotTrait = (req, res) => {
    try {
        let traitName = req.params.traitName
        db.Pack.find({"lot_traits.trait": traitName})
        .then(pack => {
            let trait = pack[0].lot_traits.find(t => t.trait === traitName)
            dbSuccess(res, trait, "Successful find of unique trait")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

// This includes an optional ?n=int in query
const getRandomLotTrait = async (req, res) => {
    try {
        // bring in pack array from body
        if (req.query.n) {
            let num = parseInt(req.query.n)
            let randPacks = await db.Pack.aggregate(
                [
                    {$match: 
                        // set up a match where "name" $in [pack array]
                        {"lot_traits": {$exists: true, $not: {$size: 0}}}
                    },
                    {$sample: {size:num}}
                ] 
            );
            let traits = []
            for (let i=0; i < randPacks.length; i++){
                let randNumber = Math.floor(Math.random() * randPacks[i].lot_traits.length)
                let packTrait = randPacks[i].lot_traits[randNumber]
                console.log(packTrait, "PACK TRAIT")
                traits.push(packTrait)
            }   
            return dbSuccess(res, traits, 'Random Traits Found')
        }
        await db.Pack.aggregate(
            [
                {$match: {"lot_traits": {$exists: true, $not: {$size: 0}}}},
                {$sample: {size:1}}
            ] 
            )
        .then(pack => {
            let traitArr = pack[0].lot_traits
            let randNumber = Math.floor(Math.random() * traitArr.length)
            let trait = traitArr[randNumber]
            dbSuccess(res, trait, 'Random Trait Found')
        })
        .catch(err => dbFail(res, err))

    }catch (err) {catchFail(res, err)}
}

// ========== Strict Lot Challenges Queries ============ //

const getAllLotChallenges = (req, res) => {
    try {
        db.Pack.find()
        .then(packs => {
            let challengeArr = []
            packs.map(pack => {
                lotChallenges = pack.lot_challenges
                if(lotChallenges.length) challengeArr.push(lotChallenges)
            })
            
           dbSuccess(res, challengeArr.flat(), "successfully found all traits")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

const getPackLotChallenges = (req, res) => {
    try {
        let packName = req.params.pack
        db.Pack.find({"lot_challenges.$.pack": packName})
        .then(packs => {
            
            let challengeArr = []
            packs.map(pack => {
                lotChallenges = pack.lot_challenges
                if(lotChallenges.length && lotChallenges[0].pack.includes(packName)){ challengeArr.push(lotChallenges)}
            })
            dbSuccess(res, challengeArr.flat(), "Successful find of traits for a pack")
        })
        .catch(err => dbFail(res, err))

    } catch (err) {catchFail(res, err)}
}

const getSpecificLotChallenge = (req, res) => {
    try {
        let challengeName = req.params.challengeName
        db.Pack.find({"lot_challenges.trait": challengeName})
        .then(pack => {
            let trait = pack[0].lot_challenges.find(t => t.trait === challengeName)
            dbSuccess(res, trait, "Successful find of trait")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

// This includes an optional ?n=int in query
const getRandomLotChallenge = async (req, res) => {
    try {
        // bring in pack array from body
        if (req.query.n) {
            let num = parseInt(req.query.n)
            let randPacks = await db.Pack.aggregate(
                [
                    {$match: 
                        // set up a match where "name" $in [pack array]
                        {"lot_challenges": {$exists: true, $not: {$size: 0}}}
                    },
                    {$sample: {size:num}}
                ] 
            );
            let traits = []
            for (let i=0; i < randPacks.length; i++){
                let randNumber = Math.floor(Math.random() * randPacks[i].lot_challenges.length)
                let packTrait = randPacks[i].lot_challenges[randNumber]
                console.log(packTrait, "PACK TRAIT")
                traits.push(packTrait)
            }   
            return dbSuccess(res, traits, 'Random Traits Found')
        }
        await db.Pack.aggregate(
            [
                {$match: {"lot_challenges": {$exists: true, $not: {$size: 0}}}},
                {$sample: {size:1}}
            ] 
            )
        .then(pack => {
            console.log(pack)
            let traitArr = pack[0].lot_challenges
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
    // lot traits
    getAllLotTraits, 
    getPackLotTraits, 
    getSpecificLotTrait,
    getRandomLotTrait,
    // lot challenges
    getAllLotChallenges,
    getPackLotChallenges,
    getSpecificLotChallenge,
    getRandomLotChallenge
}