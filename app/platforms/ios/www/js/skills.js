import Game from '/js/game.js'

class Skills {
    constructor() {
        this.uid = firebase.auth().currentUser.uid 
        this.setSkills()
    }

    setSkills() {
        this.ref = firebase.database().ref(this.uid + '/game/name')

        this.ref.once('value').then((snapshot) => {
            document.getElementById('name').innerHTML = snapshot.val()
        });
    }
}


export default Skills