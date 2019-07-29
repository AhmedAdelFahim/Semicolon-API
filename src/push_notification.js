const fcm = require('fcm-notification');
const privateKey = JSON.parse(process.env.PRIVATE_KEY)
privateKey.private_key = privateKey.private_key.replace(/,/g, '\n')
const FCM = new fcm(privateKey);
const topicName = 'contests';
const pushNotification = (oldResult, newResult) => {
    if (!oldResult) {
        oldResult = []
    } else {
        oldResult = oldResult.result
    }
    newResult.forEach((newContest) => {
        const isNewContestExists = oldResult.every((oldContest) => oldContest.name === newContest.name)
        //console.log(isNewContestExists)
        if (isNewContestExists) {
            const message = {
                data: {
                    name: newContest.name,
                    url: newContest.url,
                    platform: newContest.platform
                },
                topic: topicName
            }
            FCM.send(message, function (err, response) {
                if (err) {
                    console.log('error found', err);
                } else {
                    console.log('response here', response);
                }
            })
        }
    })
}


module.exports = pushNotification
