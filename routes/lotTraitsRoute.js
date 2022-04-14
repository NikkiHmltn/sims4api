const router = require('express').Router();
const {lotTraits} = require('../controllers')

// ====== Lot Traits ====== //
router.get('/', lotTraits.getAllLotTraits)
router.get('/random', lotTraits.getRandomLotTrait)
router.get('/t/p/:pack', lotTraits.getPackLotTraits)
router.get('/t/:traitName', lotTraits.getSpecificLotTrait)

// ====== Lot Challenges ====== //
router.get('/c', lotTraits.getAllLotChallenges)
router.get('/c/random', lotTraits.getRandomLotChallenge)
router.get('/c/p/:pack', lotTraits.getPackLotChallenges)
router.get('/c/:challengeName', lotTraits.getSpecificLotChallenge)


module.exports = router;