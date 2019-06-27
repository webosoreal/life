import Game from '/js/game.js'

class Personality {
    constructor() {
        this.totalPointsPersonality = 35
        this.uid = firebase.auth().currentUser.uid 
        this.personality = {}

        this.setEventsCreate()
        this.createPersonality()
    }

    createPersonality() {
		if((document.getElementById('playerName').value != '')&&(this.totalPointsPersonality < 36)) {
            this.name = document.getElementById('playerName').value
			this.personality.introvert = parseInt(document.querySelector('input[name="introvert"]').value)
			this.personality.social = parseInt(document.querySelector('input[name="social"]').value)
			this.personality.ambitious = parseInt(document.querySelector('input[name="ambitious"]').value)
			this.personality.creative = parseInt(document.querySelector('input[name="creative"]').value)
			this.personality.diabolical = parseInt(document.querySelector('input[name="diabolical"]').value)
			this.personality.kind = parseInt(document.querySelector('input[name="kind"]').value)
            this.personality.lazy = parseInt(document.querySelector('input[name="lazy"]').value)
            
            firebase.database().ref(this.uid + '/game/personality').set(this.personality)

		} else {
			//popup error
		}
	}

    setEventsCreate() {
        var ranges = document.querySelectorAll('.personality input')

        ;[...ranges].forEach((el)=>{
            el.addEventListener('change', (e)=> {
                this.totalPointsPersonality = 0
                ;[...ranges].forEach((el)=>{
                    this.totalPointsPersonality += parseInt(el.value)
                })
                document.querySelector('.personality .points').innerHTML = this.totalPointsPersonality
            })
        })

        document.getElementById('savePlayer').addEventListener('click', () => {
            this.createPersonality()
        })
    }
}

export default Personality