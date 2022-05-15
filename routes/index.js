const router = require('express').Router()
const packRoute = require('./packRoutes')
const lotTraitsRoute = require("./lotTraitsRoute")
const simsTraitRoute = require("./simsTraitsRoutes")
const ambitionsRoute = require("./ambitionsRoute")
const skillRoute = require("./skillsRoute")
const colorRoute = require("./colorRoute")

router.use("/sims-packs", packRoute)
router.use("/lot-traits", lotTraitsRoute)
router.use("/sim-traits", simsTraitRoute)
router.use("/ambitions", ambitionsRoute)
router.use("/skills", skillRoute)
router.use("/colors", colorRoute)

module.exports = router;