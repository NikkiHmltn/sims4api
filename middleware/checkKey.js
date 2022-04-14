const checkValidKey = (req, res, next) => {
    // check header for key
    let api_key = req.headers.api_key;
    if (api_key === process.env.API_KEY_ADMIN){
        next()
    } else {
       return res.status(403).json({msg: "Unauthorized to use API"})
    }
}

module.exports = {checkValidKey}