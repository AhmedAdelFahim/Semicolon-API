const axios = require('axios');
const cheerio = require('cheerio');
const {getCurrentTimeInSeconds, convertDateToTimestampInSeconds} = require('../utils');

const URL = 'https://devpost.com/hackathons?page=';
const PLATFORM = 'hackathons';
let pageNum = 0;
let result = [];

const extractContestData = async (hackathon) => {
    let item = {};
    item['name'] = hackathon.find('div').find('article.challenge-listing ').find('a.clearfix').find('div').find('section').find('div').find('h2').text().trim();
    item['url'] = hackathon.find('div').find('article.challenge-listing ').find('a.clearfix').attr('href').toString().split('.devpost.com')[0] + '.devpost.com';
    item['platform'] = PLATFORM;
    item['description'] = hackathon.find('div').find('article.challenge-listing ').find('a.clearfix').find('div').find('section').find('div').find('p.challenge-description').text().trim();
    item['location'] = hackathon.find('div').find('article.challenge-listing ').find('a.clearfix').find('div').find('section').find('div').find('p.challenge-location').text().trim();
    item['rounds'] = await extractRoundsData(item.url + '/details/dates');
    return item;
};

const extractRoundsData = async (URL) => {
    //console.log(URL)
    const res = await axios.get(URL);
    const $ = cheerio.load(res.data);
    const tables = $('table.no-borders');
    const roundsRow = tables.find('tbody').find('tr');
    rounds = [];
    //console.log(roundsRow.length + '   '+rounds+"   "+URL)
    for (i = 0; i < roundsRow.length; ++i) {
        rounds.push({
            name: roundsRow.eq(i).find('td').eq(0).text().trim(),
            startTime: roundsRow.eq(i).find('td').eq(1).text().trim(),
            endTime: roundsRow.eq(i).find('td').eq(2).text().trim()
        });
    }

    return rounds;
};


const getContests = async () => {
    try {
        const res = await axios.get(URL + (++pageNum));
        const $ = cheerio.load(res.data);
        const pagesNumber = $('div.pagination').find('a').length;
        const hackathons = $('div.challenge-results');
        if (pageNum > pagesNumber) {
            return result;
        }
        const hackathonsNumber = hackathons.eq(0).find('div.row').length;

        for (i = 0; i < hackathonsNumber; ++i) {
            extractContestData(hackathons.eq(0).find('div.row').eq(i)).then((res) => {
                result.push(res);
            }).catch((e) => {
                throw new Error(e)
            })
        }
        return await getContests();
    } catch (e) {
        console.log('Error : ' + PLATFORM + ' ' + e)
        return []
    }

};
module.exports = getContests;
