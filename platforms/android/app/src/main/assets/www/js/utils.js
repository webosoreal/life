class Utils {
    constructor() {
        //
    }

    attachClosePopup(popup) {
        console.log('attach')
        var close = popup.querySelector('.close')
        close.addEventListener('click', ()=> {
            popup.classList.add('hidden')
        })
    }
}

export default Utils