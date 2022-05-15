const router = require('express').Router();
const {color} = require('../controllers')

// // ====== Sims Traits ====== //

router.get('/', color.getPalette)

module.exports = router;