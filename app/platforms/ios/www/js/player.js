import Game from '/js/game.js'
class Player {
	constructor () {
		this.name = 'newPlayer'
		this.money = 1000
		this.work = 'Unemployed'
		this.skills = {}
		this.self = {}

		Game.prototype.setPage('createPlayer')
		this.setEvents()
	}

	addCash(money) {
		this.money += money
		document.getElementById("money").innerHTML = this.money
	}

	addName(name) {
		this.name = name
	}

	createPersonality() {
		/* question */
		this.addName(document.getElementById('playerName').value)
		this.self.introvert = 5
		this.self.social = 2
		this.self.ambitious = 3
		this.self.creative = 8
		this.self.diabolical = 1
		this.self.kind = 6
		this.self.lazy = 4
	}

	setEvents() {
		document.addEventListener('changePage', (e)=> {
			if(e.detail == 'createPlayer') {
				document.getElementById('savePlayer').addEventListener('click', () => {
					this.createPersonality()
				})
			}
		})
	}
}

export default Player