import Game from '../js/game.js'

class GameList {
	constructor(database) {
		this.database = database
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
window.gameList.users = [{}]
window.gameList.users['ciupa'] = {'pippo': 'uno'}

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
var database = firebase.database().ref('users')

// firebase.auth().createUserWithEmailAndPassword('mail@mail.it', 'password').catch(function(error) {
// 	var errorCode = error.code;
// 	var errorMessage = error.message;
// 	console.log('errorSignUp', errorCode, errorMessage)
// });

firebase.auth().signInWithEmailAndPassword('mail@mail.it', 'password').catch(function(error) {
	var errorCode = error.code;
	var errorMessage = error.message;
	console.log('errorSignIn', errorCode, errorMessage)
});

firebase.auth().onAuthStateChanged(function(user) {
	console.log(user)
})

// database.set({
//     'gameList': window.gameList
// });

// new GameList(database)

