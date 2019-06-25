import Player from '../js/player.js'

class Game {
	constructor() {
		this.players = []
		this.lang = 'en'
		this.setPage('home', this.lang)
		this.setEvents()
		this.newPlayer()
		this.startGame()
	}

	startGame() {
		this.date = new Date()
		this.nextDay()
	}

	newPlayer () {
		this.players[this.players.length] = new Player()
	}

	nextDay() {
		this.date.setDate(this.date.getDate() + 1)
		if(this.lang == 'it') {
			document.getElementById("date").innerHTML = this.date.toLocaleDateString('it-IT')
		} else {
			document.getElementById("date").innerHTML = this.date.toDateString()
		}
	}

	setPage(page, lang) {
		if (!lang) {
			var lang = 'en'
		}
		var url = '/views/' + lang + '/' + page + '.html'

		fetch(url)
			.then((response) => response.text())
			.then((html) => {
				document.getElementById("main").innerHTML = html
				var changePageEvent = new CustomEvent('changePage')
				changePageEvent.initCustomEvent('changePage', false, false, page);
				document.dispatchEvent(changePageEvent)
			})
		.catch((error) => {
			console.warn(error)
		})
	}

	setLang(lang) {
		this.lang = lang
	}

	removeActivePages() {
		var pageChanger = document.querySelectorAll('.footer li')
		;[...pageChanger].forEach(function(el) {
			el.classList.remove('active')
		});
	}

	setEvents() {
		var pageChanger = document.querySelectorAll('.footer li')
		var nextDay = document.getElementById('nextDay')

		;[...pageChanger].forEach((el) => {
			el.addEventListener('click', (e) => {
				this.removeActivePages()
				e.target.classList.add('active')
				this.setPage(e.target.id, this.lang)
			})
		});

		nextDay.addEventListener('click', this.nextDay.bind(this))
	}






}

export default Game