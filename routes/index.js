const router = require('express').Router()
const packRoute = require('./packRoutes')
const lotTraitsRoute = require("./lotTraitsRoute")

router.use("/sims-packs", packRoute)
router.use("/lot-traits", lotTraitsRoute)

module.exports = router;