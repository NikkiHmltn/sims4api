const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const simsTraitsSchema = new Schema({
    trait: {type: String},
    icon: {type: String},
    description: {type: String},
    type: {type: String},
    pack: {type: String},
})

const lotChallengesSchema = new Schema({
    trait: {type: String},
    icon: {type: String},
    description: {type: String},
    effect: {type: String},
    pack: {type: String},
})

const lotTraitsSchema = new Schema({
    trait: {type: String},
    icon: {type: String},
    description: {type: String},
    effect: {type: String},
    pack: {type: String},
})


const skillsSchema = new Schema({
    name: {type: String},
    icon: {type: String},
    pack: {type: String},
    description: {type: String},
})

const ambitionsSchema = new Schema({
    name: {type: String}, 
    icon: {type: String},
    description: {type: String},
    type: {type: String},
    pack: {type: String}
})

const packSchema = new Schema({
    name: {type: String, required: true},
    icon: {type: String, required: true}, 
    type: {type: String, required: true}, 
    ambitions: [ambitionsSchema],
    skills: [skillsSchema],
    lot_traits: [lotTraitsSchema],
    lot_challenges: [lotChallengesSchema],
    sims_traits: [simsTraitsSchema]

})

const Pack = mongoose.model("Pack", packSchema);

module.exports = Pack;