const router = require('express').Router()
const packRoute = require('./packRoutes')
const lotTraitsRoute = require("./lotTraitsRoute")
const simsTraitRoute = require("./simsTraitsRoutes")
const ambitionsRoute = require("./ambitionsRoute")
const SkillRoute = require("./skillsRoute")

router.use("/sims-packs", packRoute)
router.use("/lot-traits", lotTraitsRoute)
router.use("/sim-traits", simsTraitRoute)
// router.use("ambitions", ambitionsRoute)
router.use("/skills", SkillRoute)

module.exports = router;