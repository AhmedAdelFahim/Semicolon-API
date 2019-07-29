const getCurrentTimeInSeconds = () => new Date().getTime() / 1000;
const convertDateToTimestampInSeconds = (date) => {
    return new Date(date).getTime() / 1000
}
module.exports = {getCurrentTimeInSeconds, convertDateToTimestampInSeconds};
