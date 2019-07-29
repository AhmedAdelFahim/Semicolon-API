const axios = require('axios');
const cheerio = require('cheerio');
const {getCurrentTimeInSeconds, convertDateToTimestampInSeconds} = require('../utils');

const URL = 'http://www.codechef.com/contests';
const PLATFORM = 'Codechef';
let result = [];

const extractContestData = (contest) => {
    let item = {};
    item['name'] = contest.eq(1).text();
    item['url'] = `https://www.codechef.com/${contest.eq(0).text()}`;
    item['platform'] = PLATFORM;
    item['startTime'] = convertDateToTimestampInSeconds(contest.eq(2).attr("data-starttime"));
    item['endTime'] = convertDateToTimestampInSeconds(contest.eq(3).attr("data-endtime"));

    return item;
};


const getContests = async () => {
    try {
        const res = await axios.get(URL);
        const $ = cheerio.load(res.data);
        const tables = $('table .dataTable');
        const headings = $('h3');
        for (i = 0; i < headings.length; ++i) {
            if (headings.eq(i).text() !== 'Past Contests') {
                const contests = tables.eq(i).find('tbody').find('tr');
                for (j = 0; j < contests.length; ++j) {
                    result.push(extractContestData(contests.eq(j).find('td')));
                }
            }
        }
        return result;

    } catch (e) {
        console.log('Error : ' + PLATFORM + ' ' + e)
        return []
    }
};

module.exports = getContests;
