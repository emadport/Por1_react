import moment from "moment";

function convertToLocalDateString(dateString: string) {
    const returnDate = new Date(dateString);
    const formated = moment(returnDate)
    formated.set("minutes", formated.minutes() + returnDate.getTimezoneOffset())
    return `${formated.format("DD-MM HH:mm")}`;
}


function convertToLocalTimeString(dateString: string) {
    const returnDate = new Date(dateString);
    returnDate.setMinutes(returnDate.getMinutes() + returnDate.getTimezoneOffset());
    return returnDate.toLocaleTimeString('sw-SW');
}

export { convertToLocalDateString, convertToLocalTimeString }