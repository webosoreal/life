import Game from '../js/game.js'

class Player {
	constructor () {
		this.uid = firebase.auth().currentUser && firebase.auth().currentUser.uid
		this.money = 1000
		this.moneyRef = firebase.database().ref(this.uid + '/game/money')
		this.moneyRef.set(this.money)

		Game.prototype.setPage('createPlayer')
		this.setEvents()
	}

	addCash(money) {
		this.refreshCash(money)
	}

	refreshCash(money) {
		this.uid = firebase.auth().currentUser && firebase.auth().currentUser.uid
		this.moneyRef = firebase.database().ref(this.uid + '/game/money')
		this.moneyRef.once('value').then((snapshot) => {
		   this.money = snapshot.val()
		   if(money) {
				this.money += money
				this.moneyRef.set(this.money)
		   }
		   document.getElementById("money").innerHTML = this.money
        });
	}
}

export default Player