import Game from '/js/game.js'

class Skills {
    constructor() {
        this.uid = firebase.auth().currentUser.uid 
        this.skills = {}
        this.setSkills()
    }

    setSkills() {
        this.refName = firebase.database().ref(this.uid + '/game/name')

        this.skills.run = 3

        firebase.database().ref(this.uid + '/game/skills').set(this.skills)


        this.refName.once('value').then((snapshot) => {
            document.getElementById('name').innerHTML = snapshot.val()
        });
    }
}


export default Skills