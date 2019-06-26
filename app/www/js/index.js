import Game from '../js/game.js'

class GameList {
	constructor(database) {
		this.database = database
		this.setEvents()
	}

	newGame() {
		var tabNew = document.querySelector('.signUp')
		tabNew.classList.remove('hidden')
		var button = tabNew.querySelector('button')

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
		var tabLoad = document.querySelector('.loginGame')
		tabLoad.classList.remove('hidden')
		var button = tabLoad.querySelector('button')

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

	setEvents() {
		document.getElementById('createGame').addEventListener('click', () => {
			this.newGame()
		})

		document.getElementById('loadGame').addEventListener('click', () => {
			this.loadGame()
		})

		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {
				var uid = user.uid
				var ref = firebase.database().ref(uid);

				ref.on("value", function(snapshot) {
					var res = snapshot.val()
					if(res && res.game == 'started') {
						console.log('game already started')

						database.ref('game').set({
							'game' : 'started'
						})
					} else {
						database.ref().set({
							uid : {},
						});

						database.ref(uid).set({
							'game' : 'started'
						})

						console.log('start game')
						new Game()
					}
				}, function (error) {
					console.log("Error: " + error.code);
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
