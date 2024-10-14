export default function getColorsByType(type: string) {
    let leaveColor = 'lightBlue'

    switch (type) {

        case "Sjuk":
            leaveColor = "red";

            break;
        case "Semester":
            leaveColor = "orange";
            break;
        case "Tjensteledighet":
            leaveColor = "gray";
            break;
        case "Vabb":
            leaveColor = "yellow";
            break;
        default:
            break;
    }
    return leaveColor
}