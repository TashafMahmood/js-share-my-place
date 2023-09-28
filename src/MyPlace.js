import { Map } from './UI/Map'

class LoadedPlace {
    constructor(coordinates, address) {
        new Map(coordinates);
        const headertitleEl = document.querySelector('header h1');
        headertitleEl.textContent = address;
    }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
    lat: parseFloat(queryParams.get('lat')),
    lng: +queryParams.get('lng')
}
const address = queryParams.get('address')

new LoadedPlace(coords, address); 