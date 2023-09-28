class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserButton = document.getElementById('locate-btn');
        locateUserButton.addEventListener('click', this.locateUserHandlers)
        addressForm.addEventListener('submit', this.findUserAddressHandler)
    }

    locateUserHandlers() {
        if (!navigator.geolocation) {
            alert('location feature in not available in your browser - Please some other mordern browser');
            return
        }
        navigator.geolocation.getCurrentPosition(successResult=>{
            const coordinates={
                lat:successResult.coords.latitude,
                long:successResult.coords.longitude
            }
            console.log(coordinates,"coordinates")
        },error=>{
            alert('Could not locate you unfortunately Please enter address manually')
        })
    }
    findUserAddressHandler() {

    }
}

const placeFinder= new PlaceFinder()