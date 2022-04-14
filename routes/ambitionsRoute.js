const router = require('express').Router();
const {ambitions} = require('../controllers')

// // ====== Sims Traits ====== //

router.get('/', ambitions.getAllSimsAmbitions)
router.get('/random', ambitions.getRandomSimsAmbition)
router.get('/a/p/:pack', ambitions.getPackSimAmbitions)
router.get('/a/:ambitionName', ambitions.getSpecificSimsAmbition)

module.exports = router;