import Game from '../js/game.js'
import Day from '../js/day.js'
import Personality from '../js/personality.js'
import Skills from '../js/skills.js'
import Player from '../js/player.js'

class GameList {
	constructor(database) {
		this.database = database
		this.tabNew = document.querySelector('.signUp')
		this.tabLoad = document.querySelector('.loginGame')

		this.setEvents()
		this.casualBkg()
	}

	newGame() {
		this.tabNew.classList.remove('hidden')
		this.tabLoad.classList.add('hidden')
		var button = this.tabNew.querySelector('button')
		firebase.auth().signOut()

		button.addEventListener('click', ()=> {
			var mail = document.querySelector('.signUp input[name="mail"]').value
			var pass = document.querySelector('.signUp input[name="password"]').value

			firebase.auth().createUserWithEmailAndPassword(mail, pass).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log('errorSignUp', errorCode, errorMessage)
				alert(errorMessage)
			});

			setTimeout(() => {
				firebase.auth().signInWithEmailAndPassword(mail, pass).catch(function(error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log('errorSignIn', errorCode, errorMessage)
					alert(errorMessage)
				});
			}, 1000)
		})
	}

	loadGame() {
		this.tabLoad.classList.remove('hidden')
		this.tabNew.classList.add('hidden')
		var button = this.tabLoad.querySelector('button')

		button.addEventListener('click', ()=> {
			var mail = document.querySelector('.loginGame input[name="mail"]').value
			var pass = document.querySelector('.loginGame input[name="password"]').value

			firebase.auth().signInWithEmailAndPassword(mail, pass).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log('errorSignIn', errorCode, errorMessage)
			});
		});
	}

	redirectUserToGame(res) {
		if(res && res.game && res.game.personality) {
			console.log('game already started | personality ok')
			if (res.game.skills) {
				console.log('game already started | skills ok')
				Game.prototype.setPage('home', this.lang) // nex step
				this.showGameMenu()
			} else {
				Game.prototype.setPage('setSkills')
			}	
		} else {
			new Game()
		}
	}

	showGameMenu() {
		document.querySelector('.footer').classList.remove('hidden')
		document.querySelector('.header').classList.remove('hidden')
		document.getElementById('nextDay').classList.remove('hidden')
	}

	casualBkg() {
		var min = 1;
		var max = 3;
		var casual = Math.floor(Math.random() * (+max - +min)) + +min; 
		var bkgUrl = 'url("/img/bkg' + casual + '.jpg")'
		document.body.style.background = bkgUrl
	}

	setEvents() {
		document.addEventListener('touch', (e) => {
			e.target.trigger('click')
		})

		document.getElementById('createGame').addEventListener('click', () => {
			this.newGame()
		})

		document.getElementById('loadGame').addEventListener('click', () => {
			this.loadGame()
		})

		document.getElementById('nextDay').addEventListener('click', () => {Day.prototype.nextDay()})

		
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				this.uid = user.uid
				var ref = firebase.database().ref(this.uid);

				ref.once('value').then((snapshot) => {
					this.redirectUserToGame(snapshot.val())
					Player.prototype.refreshCash()
					Day.prototype.refreshDate()
				});
			}
		})

		document.addEventListener('changePage', (e)=> {
			if(e.detail == 'createPlayer') {
				new Personality()
			} else if(e.detail == 'setSkills') {
				new Skills()
			}
		})
	}
}

var firebaseConfig = {
	apiKey: "AIzaSyDvUF3eaH10JQybKYYRS2NsaJiKzEt_xJg",
	authDomain: "life-b949f.firebaseapp.com",
	databaseURL: "https://life-b949f.firebaseio.com",
	projectId: "life-b949f",
	storageBucket: "",
	messagingSenderId: "406263429423",
	appId: "1:406263429423:web:4771258a20d1f07e"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database()
new GameList(database)

