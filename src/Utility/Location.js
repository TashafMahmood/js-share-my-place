export async function getCoordsFromtheAddress(address) {
    const urlAddress = encodeURI(address)
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=AIzaSyCJ881TLHH1lpMTbIiDUcAtjFkofcDeLEE`)
    if (!response.ok) {
        throw new Error('failed to fetch location')
    }
    const data = await response.json()
    if (data.error_message) {
        throw new Error(data.error_message)
    }
    console.log(data)
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

export async function getLinkOftheAddress(coords) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyCJ881TLHH1lpMTbIiDUcAtjFkofcDeLEE`)
    if (!response.ok) {
        throw new Error('failed to fetch address')
    }
    const data = await response.json()
    if (data.error_message) {
        throw new Error(data.error_message)
    }
    console.log(data)
    const address = data.results[0].formatted_address;
    return address;
}