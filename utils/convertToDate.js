const convertToDate = (targetDate) => {
    let date = new Date(targetDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day.toString();
    }
    if (month < 10) {
        month = '0' + month.toString();
    }

    return [day, month, year].join('-');
};

export default convertToDate;
