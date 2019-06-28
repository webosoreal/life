import Player from '../js/player.js'
import Day from '../js/day.js'

class Game {
	constructor() {
		this.lang = 'en'
		this.uid = firebase.auth().currentUser && firebase.auth().currentUser.uid
		console.log('start game')

		this.setPage('home', this.lang)
		this.setEvents()
		this.newPlayer()
		new Day()
	}

	newPlayer () {
		new Player()
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

		;[...pageChanger].forEach((el) => {
			el.addEventListener('click', (e) => {
				this.removeActivePages()
				e.target.classList.add('active')
				this.setPage(e.target.id, this.lang)
			})
		});
	}






}

export default Game