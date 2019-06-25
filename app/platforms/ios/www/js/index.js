import Game from '../js/game.js'

class GameList {
	constructor() {
		this.games = [] // fetch games from server

		this.setEvents()
	}

	newGame() {
		this.games[this.games.length] = new Game()
	}

	setEvents() {
		document.getElementById('newGame').addEventListener('click', () => {
			this.newGame()
		})
	}
}

window.gameList = new GameList()
