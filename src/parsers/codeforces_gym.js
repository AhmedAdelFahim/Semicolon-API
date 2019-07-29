const axios = require('axios');

const date = new Date();

const URL = 'http://codeforces.com/api/contest.list?gym=true';
const PLATFORM = 'Codeforces';

const isContestActive = (contest) => contest.phase.trim() !== 'FINISHED';

const extractContestData = contest => ({
    name: contest.name,
    url: `http://codeforces.com/contests/${contest.id}`,
    platform: PLATFORM,
    startTime: contest.startTimeSeconds,
    endTime: (contest.startTimeSeconds + contest.durationSeconds),
});


const getContests = async () => {
    try {
        const result = await axios.get(URL);
        return result.data.result.filter(isContestActive).map(extractContestData);
    } catch (e) {
        console.log('Error : ' + PLATFORM + ' ' + e)
        return []
    }
};

module.exports = getContests;
