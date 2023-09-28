import{Modal} from './UI/modal'
import {Map} from './UI/Map'

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserButton = document.getElementById('locate-btn');
        locateUserButton.addEventListener('click', this.locateUserHandlers.bind(this))
        addressForm.addEventListener('submit', this.findUserAddressHandler)
    }


    selectPlce(coordinates){
        if(this.map){
this.map.render(coordinates)
        }else{
            this.map=new Map(coordinates)
        }

    }

    
    locateUserHandlers() {
        if (!navigator.geolocation) {
            alert('location feature in not available in your browser - Please some other mordern browser');
            return
        }
        const modal = new Modal('loading-modal-content','Loading content.. Please wait')
        modal.showModal()
        navigator.geolocation.getCurrentPosition(successResult=>{
            modal.hideModal() 
            const coordinates={
                lat:successResult.coords.latitude,
                lng:successResult.coords.longitude
            }
            this.selectPlce(coordinates)
            console.log(coordinates,"coordinates")
        },error=>{
            alert('Could not locate you unfortunately Please enter address manually')
        })
    }
    findUserAddressHandler() {

    }
}

const placeFinder= new PlaceFinder()