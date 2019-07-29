const codeforces = require('./parsers/codeforces');
const codeforcesGym = require('./parsers/codeforces_gym');
const hackerrank = require('./parsers/hackerrank');
const hackerearth = require('./parsers/hackerearth');
const codechef = require('./parsers/codechef');
const csacademy = require('./parsers/csacademy');
const hackathons = require('./parsers/hackathons');
const topcoder = require('./parsers/topcoder');
const kaggle = require('./parsers/kaggle');
const cache = require('memory-cache');
const OnlineJudge = require('./models/online_judge')
const {CronJob} = require('cron');
const pushNotification = require('./push_notification')

let result = []
let info = {}
const getOnlineJudgeInfo = async (name) => {
    try {
        const onlineJudge = await OnlineJudge.findOne({name})
        //console.log(onlineJudge)
        info[name] = onlineJudge.image
    } catch (e) {
        info[name] = ''
    }
}
const updateCache = async () => {
    result = []
    console.log('Cache Updated')
    const oldResult = cache.get('result')
    const codeforcesRes = await codeforces()
    result = result.concat(codeforcesRes)
    const codeforcesGymRes = await codeforcesGym()
    result = result.concat(codeforcesGymRes)
    const hackerrankRes = await hackerrank()
    result = result.concat(hackerrankRes)
    const hackerearthRes = await hackerearth()
    result = result.concat(hackerearthRes)
    const codechefRes = await codechef()
    result = result.concat(codechefRes)
    const csacademyRes = await csacademy()
    result = result.concat(csacademyRes)
    const topcoderRes = await topcoder()
    result = result.concat(topcoderRes)
    const kaggleRes = await kaggle()
    result = result.concat(kaggleRes)

    pushNotification(oldResult, result)
    cache.put('result', {
        result,
        info
    })

    console.log('Finish Update')
    return result

}

getOnlineJudgeInfo('Codeforces')
getOnlineJudgeInfo('Hackerrank')
getOnlineJudgeInfo('Hackerearth')
getOnlineJudgeInfo('Codechef')
getOnlineJudgeInfo('Csacademy')

// Update Cache every 5 minutes
new CronJob('*/3 * * * *', updateCache).start();


module.exports = updateCache
