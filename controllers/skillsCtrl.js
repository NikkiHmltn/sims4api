const db = require('../models')

// ========== Strict Sims Skills Queries ============ //

const getAllSimSkills = (req, res) => {
    try {
        db.Pack.find()
        .then(packs => {
            let skillsArr = []
            packs.map(pack => {
                simSkills = pack.skills
                if(simSkills.length) skillsArr.push(simSkills)
            })
            
           dbSuccess(res, skillsArr.flat(), "successfully found all skills")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

const getPackSimSkills = (req, res) => {
    try {
        let rawName = req.params.pack.toLowerCase()
        let cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1)
        db.Pack.find({"skills.$.skills": cleanName})
        .then(packs => {
            let skillsArr = []
            packs.map(pack => {
                simSkills = pack.skills
                if(simSkills.length && simSkills[0].pack.includes(cleanName)) skillsArr.push(simSkills)
            })
            dbSuccess(res, skillsArr.flat(), "Successful find of skills for a pack")
        })
        .catch(err => dbFail(res, err))

    } catch (err) {catchFail(res, err)}
}

const getSpecificSimsSkill = (req, res) => {
    try {
        let rawName = req.params.skillName.toLowerCase()
        let cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1)
        db.Pack.find({skills: {$elemMatch: {name: cleanName}}})
        .then(pack => {
            let skills = pack[0].skills
            let skill = skills.find(t => t.name === cleanName)
            dbSuccess(res, skill, "Successful find of unique skill")
        })
        .catch(err => dbFail(res, err))
    } catch (err) {catchFail(res, err)}
}

// This includes an optional ?n=int in query
const getRandomSimsSkill = async (req, res) => {
    try {
        // bring in pack array from body
        if (req.query.n) {
            let num = parseInt(req.query.n)
            let randPacks = await db.Pack.aggregate(
                [
                    {$match: 
                        // set up a match where "name" $in [pack array]
                        {"skills": {$exists: true, $not: {$size: 0}}}
                    },
                    {$sample: {size:num}}
                ] 
            );
            let skills = []
            for (let i=0; i < randPacks.length; i++){
                let randNumber = Math.floor(Math.random() * randPacks[i].skills.length)
                let skill = randPacks[i].skills[randNumber]
                skills.push(skill)
            }   
            return dbSuccess(res, skills, 'Random Skill Found')
        }
        await db.Pack.aggregate(
            [
                {$match: {"skills": {$exists: true, $not: {$size: 0}}}},
                {$sample: {size:1}}
            ] 
            )
        .then(pack => {
            let skillsArr = pack[0].skills
            let randNumber = Math.floor(Math.random() * skillsArr.length)
            let skill = skillsArr[randNumber]
            dbSuccess(res, skill, 'Random Skill Found')
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
    getAllSimSkills,
    getPackSimSkills,
    getRandomSimsSkill,
    getSpecificSimsSkill
}