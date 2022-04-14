const router = require('express').Router()
const packRoute = require('./packRoutes')
const lotTraitsRoute = require("./lotTraitsRoute")
const simsTraitRoute = require("./simsTraitsRoutes")

router.use("/sims-packs", packRoute)
router.use("/lot-traits", lotTraitsRoute)
router.use("/sim-traits", simsTraitRoute)

module.exports = router;