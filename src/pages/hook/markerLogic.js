export const markerLogic = (arrival, departure, currentDate) => {
    let iconUrl;

    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);

    const santaDropGifs = currentDate.getTime() - departureDate.getTime() > 0
    const santaIsHere = currentDate.getTime() - arrivalDate.getTime() > 0 && !santaDropGifs;

    if (santaDropGifs) {
        iconUrl = "leaflet/images/gift-marker-icon.png"
    } else if (santaIsHere) {
        iconUrl = "leaflet/images/santa-marker-icon.png"
    } else {
        iconUrl = "leaflet/images/tree-marker-icon.png"
    }
    return iconUrl
}
