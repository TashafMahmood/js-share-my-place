import { Modal } from './UI/modal'
import { Map } from './UI/Map'
import { getCoordsFromtheAddress, getLinkOftheAddress } from './Utility/Location'
class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserButton = document.getElementById('locate-btn');
        this.shareButn = document.getElementById('share-btn')
        locateUserButton.addEventListener('click', this.locateUserHandlers.bind(this))
        addressForm.addEventListener('submit', this.findUserAddressHandler.bind(this))
        this.shareButn.addEventListener('click',this.sharePlaceaHandler.bind(this))
    }

    sharePlaceaHandler(){
        const SharedLinkInput = document.getElementById('share-link')

        if(!navigator.clipboard){
            SharedLinkInput.select();
            return
        }
        navigator.clipboard.writeText(SharedLinkInput.value).then(()=>{
         
          window.open(SharedLinkInput.value, "_blank");
        }).catch((err)=>{
            SharedLinkInput.select();
        })
    }
    selectPlce(coordinates, address) {
        if (this.map) {
            this.map.render(coordinates)
        } else {
            this.map = new Map(coordinates)
        }
        this.shareButn.disabled = false
        const SharedLinkInput = document.getElementById('share-link')
        SharedLinkInput.value=`${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`
    }


     locateUserHandlers() {
        if (!navigator.geolocation) {
            alert('location feature in not available in your browser - Please some other mordern browser');
            return
        }
        const modal = new Modal('loading-modal-content', 'Loading content.. Please wait')
        modal.showModal()
        navigator.geolocation.getCurrentPosition(
            async successResult => {
 
            const coordinates = {
                lat: successResult.coords.latitude,
                lng: successResult.coords.longitude
            }

            const address = await getLinkOftheAddress(coordinates)
            modal.hideModal()
            this.selectPlce(coordinates, address)
            console.log(coordinates, "coordinates")
        }, error => {
            alert('Could not locate you unfortunately Please enter address manually')
        })
    }
    async findUserAddressHandler(event) {
        event.preventDefault()
        const address = event.target.querySelector('input').value;
        if (!address || address.trim().length === 0) {
            alert('Invalid address entered - please try again')
            return
        }
        const modal = new Modal('loading-modal-content', 'Loading content.. Please wait')
        modal.showModal()
        try {
            const coordinates = await getCoordsFromtheAddress(address)

            this.selectPlce(coordinates, address)
        } catch (error) {
            alert(error.message)
        }
        modal.hideModal()


    }
}

const placeFinder = new PlaceFinder()