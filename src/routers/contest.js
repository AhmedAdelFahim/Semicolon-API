const express = require('express')
const cache = require('memory-cache')


const router = new express.Router()

const manageResult = (result, options) => {
    //console.log(result.length)
    //console.log(result)
    if (options.sort === 'asc') {
        result.sort((a, b) => {
            if (a.startTime <= b.startTime) return -1
        })
    } else if (options.sort === 'desc') {
        result.sort((a, b) => {
            if (a.startTime >= b.startTime) return -1
        })
    }

    if (options.onlineJudge) {
        result = result.filter((contest) => options.onlineJudge.includes(contest.platform))
    }
    //console.log(result.length)
    return result
}
//  /contests/api/v1?sort=desc
//  /contests/api/v1?sort=asc
//  /contests/api/v1?onlineJudge=Codeforces,Hackerrank
router.get('/contests/api/v1', async (req, res) => {
    try {
        const options = {
            sort: req.query.sort || null,
            onlineJudge: null
        }

        if (req.query.onlineJudge) {
            options.onlineJudge = req.query.onlineJudge.split(',')
        }

        const result = cache.get('result')
        res.send({
            result: manageResult(result.result, options),
            info: result.info
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


module.exports = router;
