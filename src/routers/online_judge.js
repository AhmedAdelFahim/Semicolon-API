const express = require('express')
const router = new express.Router()
const OnlineJudge = require('../models/online_judge')

router.get('/onlineJudge', async (req, res) => {

    try {
        const info = await OnlineJudge.find({})
        res.send(info)
    } catch (e) {
        res.status(400).send(e)
    }


})


module.exports = router;
