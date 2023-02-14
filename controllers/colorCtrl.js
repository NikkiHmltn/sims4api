const colorPalette = require('nice-color-palettes/1000')

const getPalette = (req, res) => {

    const randomIdx = Math.floor(Math.random() * colorPalette.length)
    console.log(colorPalette[randomIdx])
    return res.status(200).json({data: colorPalette[randomIdx]})
}

module.exports = {
    getPalette
}