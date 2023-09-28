export class Modal {
    constructor(contentId, fallBackText) {
        this.fallBackText = fallBackText;
        this.contentTemplateEle = document.getElementById(contentId);
        this.modalTemplateEle = document.getElementById('modal-template');

    }

    showModal() {
        if ('content' in document.createElement('template')) {
            this.modalElements = document.importNode(this.modalTemplateEle.content, true)
            this.modelElement = this.modalElements.querySelector('.modal')
            this.backDropElements = this.modalElements.querySelector('.backdrop')
            this.contentElements = document.importNode(this.contentTemplateEle.content, true)
            this.modelElement.append(this.contentElements);
            document.body.insertAdjacentElement('afterbegin',this.modelElement)
            document.body.insertAdjacentElement('afterbegin',this.backDropElements)
        } else {
            alert(this.fallBackText)
        }

    }

    hideModal() {
        if(this.modelElement){
            document.body.removeChild(this.modelElement)
            document.body.removeChild(this.backDropElements)
            this.modalElement=null;
            this.backDropElements=null
        }

    }
}