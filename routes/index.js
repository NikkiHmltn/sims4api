const router = require('express').Router()
const packRoute = require('./packRoutes')
const lotTraitsRoute = require("./lotTraitsRoute")

router.use("/sims4packs", packRoute)
router.use("/simslottraits", lotTraitsRoute)

module.exports = router;