const axios = require('axios');
const {getCurrentTimeInSeconds, convertDateToTimestampInSeconds} = require('../utils');

const URL = 'https://clients6.google.com/calendar/v3/calendars/appirio.com_bhga3musitat85mhdrng9035jg@group.calendar.google.com/events?calendarId=appirio.com_bhga3musitat85mhdrng9035jg%40group.calendar.google.com&timeMin=2019-6-1T00%3A00%3A00-04%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs';
const PLATFORM = 'Topcoder';

const isContestActive = (contest) => convertDateToTimestampInSeconds(contest.end.dateTime) > getCurrentTimeInSeconds();

const extractContestData = contest => ({
    name: contest.summary,
    url: 'https://www.topcoder.com/',
    platform: PLATFORM,
    startTime: convertDateToTimestampInSeconds(contest.start.dateTime),
    endTime: convertDateToTimestampInSeconds(contest.end.dateTime)
});


const getContests = async () => {
    try {
        const result = await axios.get(URL);
        return result.data.items.filter(isContestActive).map(extractContestData);
    } catch (e) {
        console.log('Error : ' + PLATFORM + ' ' + e)
        return []
    }
};

//getContests()
module.exports = getContests;
