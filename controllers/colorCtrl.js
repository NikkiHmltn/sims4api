const axios = require('axios')
const parseString = require('xml2js').parseString

const options = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

const getPalette = (req, res) => {
    axios.get('http://www.colourlovers.com/api/palettes/random?format=json', options)
    .then((response) => {
        console.log(response)
        parseString(response.data, (err, results) => {
            res.status(200).json({
                msg: "Palette retrieved", 
                imageUrl: results.palettes.palette[0].imageUrl
            })
        })
    })
    .catch((err) => console.log(err))
}

module.exports = {
    getPalette
}