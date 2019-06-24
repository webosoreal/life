import Player from '../js/player.js'

class Game {
    constructor() {
        this.players = []
        this.setPage('home')
        this.setEvents()
        this.langJSON = this.setLang('it')

    }

    newPlayer () {
        this.players[this.players.length] = new Player()
    }

    setPage(page) {
        var url = '/views/' + page + '.html'
        fetch(url)
            .then((response) => response.text())
            .then((html) => {
                document.getElementById("main").innerHTML = html;
            })
        .catch((error) => {
            console.warn(error);
        });
    }

    setLang(lang) {
        this.lang = lang
        var changeLang = (json) => {
            console.log(json)
        }

        fetch('/lang/lang.json')
            .then((response) => response.json())
            .then((json) => {
                changeLang(json)
            })
        .catch((error) => {
            console.warn(error);
        });
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
                this.setPage(e.target.id)
            })
        });
    }


    


}

export default Game