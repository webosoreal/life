import Game from '/js/game.js'
class Player {
	constructor (uid) {
		this.uid = uid
		this.name = 'newPlayer'
		this.money = 1000
		this.work = 'Unemployed'
		this.skills = {}
		this.personality = {}

		Game.prototype.setPage('createPlayer')
		this.setEvents()
	}

	addCash(money) {
		this.money += money
		document.getElementById("money").innerHTML = this.money
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
		} else {
			//popup error
		}
	}

	setEvents() {
		this.totalPointsPersonality = 35

		document.addEventListener('changePage', (e)=> {
			if(e.detail == 'createPlayer') {
				var ranges = document.querySelectorAll('.personality input')

				document.getElementById('savePlayer').addEventListener('click', () => {
					this.createPersonality()
				})

				;[...ranges].forEach((el)=>{
					el.addEventListener('change', (e)=> {
						this.totalPointsPersonality = 0
						;[...ranges].forEach((el)=>{
							this.totalPointsPersonality += parseInt(el.value)
						})
						document.querySelector('.personality .points').innerHTML = this.totalPointsPersonality
					})
				})
			}
		})
	}
}

export default Player