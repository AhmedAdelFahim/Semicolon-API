const axios = require('axios');
const {getCurrentTimeInSeconds, convertDateToTimestampInSeconds} = require('../utils');

const URL = 'https://www.kaggle.com/api/v1/competitions/list';
const PLATFORM = 'Kaggle';

const isContestActive = (contest) => convertDateToTimestampInSeconds(contest.deadline) > getCurrentTimeInSeconds();

const extractContestData = contest => ({
    name: contest.title,
    url: contest.url,
    platform: PLATFORM,
    startTime: convertDateToTimestampInSeconds(contest.enabledDate),
    endTime: convertDateToTimestampInSeconds(contest.deadline),
});


const getContests = async () => {

    try {
        const result = await axios.get(URL, {
            auth: {
                username: process.env.USERNAME_KAGGLE,
                password: process.env.KEY_KAGGLE,
            }
        });
        return result.data.filter(isContestActive).map(extractContestData);
    } catch (e) {
        console.log('Error : ' + PLATFORM + ' ' + e)
        return []
    }
};

//getContests()
module.exports = getContests;
