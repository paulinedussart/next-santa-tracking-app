export const getTimeFromObjectToString = (number) => {
    const currentDate = new Date(number);
    const hours = currentDate.getHours()
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const pmOrAm = hours >= 12 ? "PM" : "AM"
    const hoursAndMinutes = hours + ':' + minutes + ' ' + pmOrAm
    return hoursAndMinutes
}
