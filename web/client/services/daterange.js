module.exports = (range, unit) => {
    console.log('get range for last ' + range + ' ' + unit);
    let enddate = new Date();
    let startdate = new Date(enddate.getTime());
    if (unit == 'years') {
        startdate.setFullYear(startdate.getFullYear() - range);
    } else if (unit == 'months') {
        startdate.setMonth(startdate.getMonth() - range);
    } else {// if (unit == 'weeks')
        startdate.setDate(startdate.getDate() - (range * 7));
    }
    return {
        start: startdate,
        end: enddate
    };
}
