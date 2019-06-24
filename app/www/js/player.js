class Player {
    constructor () {
        this.name = 'newPlayer'
        this.money = 1000
        this.work = 'Unemployed'
        this.skills = {}
        this.self = {}

        this.createPersonality()
    }

    addCash(money) {
        this.money += money
    }

    addName(name) {
        this.name = name
    }

    createPersonality() {
        /* question */
        this.self.introvert = 5
        this.self.social = 2
        this.self.ambitious = 3
        this.self.creative = 8
        this.self.diabolical = 1
        this.self.kind = 6
        this.self.lazy = 4
    }
}

export default Player