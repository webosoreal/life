import Game from '/js/game.js'
import Personality from '/js/personality.js'

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

	setEvents() {
		document.addEventListener('changePage', (e)=> {
			if(e.detail == 'createPlayer') {
				new Personality()
			}
		})
	}
}

export default Player