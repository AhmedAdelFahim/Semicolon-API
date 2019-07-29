const axios = require('axios');
const cheerio = require('cheerio');
const {getCurrentTimeInSeconds, convertDateToTimestampInSeconds} = require('../utils');

const URL = 'https://csacademy.com/contests/';
const PLATFORM = 'Csacademy';

const isContestActive = (contest) => contest.endTime > getCurrentTimeInSeconds();

const extractContestData = contest => ({
    name: contest.longName,
    url: `https://csacademy.com/contest/${contest.name}`,
    platform: PLATFORM,
    startTime: contest.startTime,
    endTime: contest.endTime
});


const getContests = async () => {
    try {
        const result = await axios.get(URL, {
            headers: {
                'x-requested-with': 'XMLHttpRequest',
            }
        });

        return result.data.state.Contest.filter(isContestActive).map(extractContestData);
    } catch (e) {
        console.log('Error : ' + PLATFORM + ' ' + e)
        return []
    }


};

module.exports = getContests;
