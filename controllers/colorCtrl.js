const colorPalette = require('nice-color-palettes/1000')

const getPalette = (req, res) => {
    const randomIdx = Math.floor(Math.random() * colorPalette.length)
    return colorPalette[randomIdx]
}

module.exports = {
    getPalette
}