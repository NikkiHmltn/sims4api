const router = require('express').Router();
const {packCtrl} = require("../controllers")
console.log(packCtrl)

router.get('/', packCtrl.getAllPacks)
router.get('/r', packCtrl.getRandomPack)
router.get('/:name', packCtrl.getOnePack)


module.exports = router;