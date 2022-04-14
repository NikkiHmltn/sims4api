const router = require('express').Router();
const {simTraits} = require('../controllers')

// ====== Sims Traits ====== //
router.get('/', simTraits.getAllSimTraits)
router.get('/random', simTraits.getRandomSimsTrait)
router.get('/st/p/:pack', simTraits.getPackSimTraits)
router.get('/st/:traitName', simTraits.getSpecificSimsTrait)


module.exports = router;