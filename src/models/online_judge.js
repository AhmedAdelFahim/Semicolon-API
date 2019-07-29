const mongoose = require('mongoose')

const ojSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    image: {
        type: Buffer
    },
    description: {
        type: String
    }
})

ojSchema.methods.toJSON = function () {
    const onlineJudge = this
    const onlineJudgeObject = onlineJudge.toObject()
    delete onlineJudgeObject._id

    return onlineJudgeObject

}
const OnlineJudge = mongoose.model('OnlineJudge', ojSchema)

module.exports = OnlineJudge
