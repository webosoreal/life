import Game from '../js/game.js'

class GameList {
	constructor(database) {
		this.database = database
		this.tabNew = document.querySelector('.signUp')
		this.tabLoad = document.querySelector('.loginGame')

		this.setEvents()
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
		let uid = this.uid
		if(res && res.game == 'started') {
			console.log('game already started')
			database.ref(uid + '/game/pullorosi').set({
				'recolozi' : 'recolozi'
			})
		} else {
			database.ref(uid).set({
				'game' : 'started'
			})

			console.log('start game')
			new Game()
		}
	}

	setEvents() {
		document.getElementById('createGame').addEventListener('click', () => {
			this.newGame()
		})

		document.getElementById('loadGame').addEventListener('click', () => {
			this.loadGame()
		})

		firebase.auth().onAuthStateChanged((user) => {
			console.log('user')
			console.log(user)
			if(user) {
				this.uid = user.uid
				var ref = firebase.database().ref(this.uid);

				ref.once('value').then((snapshot) => {
					console.log('onValue')
					var res = snapshot.val()
					this.redirectUserToGame(res)
				});
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
