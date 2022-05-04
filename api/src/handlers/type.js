const { getTypes, getTypesDb } = require("./funcions")

const getType = async (req, res, next) => {
    try {
        await getTypes()
        const typeInDB = await getTypesDb()
        res.status(200).json(typeInDB)
    } catch(err) {
        next(err)
    }
}

module.exports = {
    getType
}