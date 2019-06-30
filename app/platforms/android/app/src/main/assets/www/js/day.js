import Player from '../js/player.js'

class Day {
    constructor() {
        this.date = new Date()
        this.uid = firebase.auth().currentUser && firebase.auth().currentUser.uid
        this.ref = firebase.database().ref(this.uid + '/game/date')
        this.ref.set(this.date.toDateString())
    }

    nextDay() {
        this.uid = firebase.auth().currentUser && firebase.auth().currentUser.uid
        this.ref = firebase.database().ref(this.uid + '/game/date')
        this.refreshDate(true)
        this.goWork()
    }

    refreshDate(next) {
        this.uid = firebase.auth().currentUser && firebase.auth().currentUser.uid
        this.ref = firebase.database().ref(this.uid + '/game/date')

		this.ref.once('value').then((snapshot) => {
            this.date = new Date(snapshot.val())

            if(next) {
                this.date.setDate(this.date.getDate() + 1)
                this.ref.set(this.date.toDateString())
            }
            if(this.lang == 'it') {
                var date = this.date.toLocaleDateString('it-IT')
            } else {
                var date = this.date.toDateString()
            }
            document.getElementById("date").innerHTML = date
        });
    }

    goWork() {
        Player.prototype.addCash(200)
    }
}

export default Day