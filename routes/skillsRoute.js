const router = require('express').Router();
const {skills} = require('../controllers')

// ====== Sims Traits ====== //
router.get('/', skills.getAllSimSkills)
router.get('/random', skills.getRandomSimsSkill)
router.get('/sk/p/:pack', skills.getPackSimSkills)
router.get('/sk/:skillName', skills.getSpecificSimsSkill)

module.exports = router;