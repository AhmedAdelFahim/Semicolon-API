const axios = require('axios');
const {getCurrentTimeInSeconds, convertDateToTimestampInSeconds} = require('../utils');

const URL = 'https://www.hackerrank.com/rest/contests/upcoming';
const PLATFORM = 'Hackerrank';

const isContestActive = (contest) => contest.epoch_endtime > getCurrentTimeInSeconds();

const extractContestData = contest => ({
    name: contest.name,
    url: `https://www.hackerrank.com/${contest.slug}`,
    platform: PLATFORM,
    startTime: contest.epoch_starttime,
    endTime: contest.epoch_endtime
});


const getContests = async () => {
    try {
        const result = await axios.get(URL);
        return result.data.models.filter(isContestActive).map(extractContestData);
    } catch (e) {
        console.log('Error : ' + PLATFORM + ' ' + e)
        return []
    }
};

module.exports = getContests;
