const router = require('express').Router();
const {getAllLotTraits, getPackLotTraits, getSpecificLotTrait} = require('../controllers')
// "/", GET, gets all the lot traits
// "/:pack", GET, gets all lot traits from that pack
// "/:traitName", GET, gets a specific lot trait


router.use('/', getAllLotTraits)
router.use('/:pack', getPackLotTraits)
router.use(':traitName', getSpecificLotTrait)

module.exports = router;