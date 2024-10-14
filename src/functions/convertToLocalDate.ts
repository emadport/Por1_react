function convertToLocalDate(dateString: Date) {
    const returnDate = new Date(dateString);
    returnDate.setMinutes(
        returnDate.getMinutes() + returnDate.getTimezoneOffset()
    );
    return returnDate;
}
export default convertToLocalDate