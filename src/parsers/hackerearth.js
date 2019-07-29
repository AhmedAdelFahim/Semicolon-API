const axios = require('axios');
const {getCurrentTimeInSeconds, convertDateToTimestampInSeconds} = require('../utils');


const URL = 'https://www.hackerearth.com/chrome-extension/events/';
const PLATFORM = 'Hackerearth';

const isContestActive = (contest) => convertDateToTimestampInSeconds(contest.end_utc_tz) > getCurrentTimeInSeconds();

const extractContestData = contest => ({
    name: contest.title,
    url: contest.url,
    platform: PLATFORM,
    startTime: convertDateToTimestampInSeconds(contest.end_utc_tz),
    endTime: convertDateToTimestampInSeconds(contest.end_utc_tz)
});


const getContests = async () => {
    try {
        const result = await axios.get(URL);
        return result.data.response.map(extractContestData);

    } catch (e) {
        console.log('Error : ' + PLATFORM + ' ' + e)
        return []
    }
};

module.exports = getContests;
