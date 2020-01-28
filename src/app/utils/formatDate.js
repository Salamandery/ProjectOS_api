import moment from 'moment-timezone';

module.exports = function formatDate(date) {
    date = moment.tz(date, process.env.TZ).format("DD/MM/YYYY HH:mm");
    return date;
};
