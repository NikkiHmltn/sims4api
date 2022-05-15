const axios = require('axios')
const parseString = require('xml2js').parseString


const getPalette = (req, res) => {
    axios.get('http://www.colourlovers.com/api/palettes/random')
    .then((response) => {
        parseString(response.data, (err, results) => {
            res.status(200).json({
                msg: "Palette retrieved", 
                imageUrl: results.palettes.palette[0].imageUrl
            })
        })
    })
}

module.exports = {
    getPalette
}