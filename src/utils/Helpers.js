const sumAll = (items, prop) => {
    return items.reduce(function (a, b) {
        return a + b[prop];
    }, 0);
};

function getShortDate(date) {
    const strDate = new Date(date.split(' ')[0]);
    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

    return strDate.getDate() + ' ' + months[strDate.getMonth()];
}

function getMonth(date) {
    const strDate = new Date(date.split(' ')[0]);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return months[strDate.getMonth()];
}

function keyToMonth(key) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return months[parseInt(key) - 1];
}

function getCurrentSeperator(seperator) {
    const thisYear = new Date().getFullYear();
    let year = seperator.slice(0, 4);
    const month = seperator.slice(4, 6);

    if (year == thisYear) {
        year = '';
    } else {
        year += ' ';
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return year + months[parseInt(month - 1)];
}

export default {
    getShortDate,
    getMonth,
    keyToMonth,
    getCurrentSeperator,
    sumAll
}
