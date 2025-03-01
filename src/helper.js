const formatDate = (date) => {
    const _date = new Date(date);
    return `${formateDateNumber(_date.getDate())}/${formateDateNumber(_date.getMonth() + 1)}/${_date.getFullYear()}`;
}
const formateDateNumber = (number) => number > 10 ? number : `0${number}`

export {
    formatDate, formateDateNumber
}