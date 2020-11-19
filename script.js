const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const colorSpan = document.getElementById('colorSpan');
const scoreSpan = document.getElementById('score');
const timer = document.getElementById('timer');

class Game {
    constructor () {
        this.init();
    }

    init () {
        this.score = 0;
        this.initColors();
        this.choose();
        clearInterval(this.interval);
        this.counter();
        scoreSpan.innerHTML = this.score;
        timer.innerHTML = '0.000';
    }
    
    counter () {
        this.startTime = Date.now() + 1500;
        this.elapsedTime = this.startTime - Date.now();

        this.interval = setInterval(() => {
            this.elapsedTime = this.startTime - Date.now();
            timer.innerHTML = (this.elapsedTime / 1000).toFixed(3);

            if (this.elapsedTime <= 0) {
                clearInterval(this.interval);
                timer.innerHTML = '0.000';
                this.init();
                alert('You lost. Time is out. Your score is: ' + this.score);
                clearInterval(this.interval);
            }
        }, 10);
    }

    resetCounter() {
        clearInterval(this.interval);
        this.counter();
    }

    endCounter() {
        clearInterval(this.interval);
    }

    initColors () {
        this.color = Math.random();
        if (this.color < 0.5) {
            this.color = Math.floor(this.color);
            color1.style.background = 'blue';
            color2.style.background = 'red';
        } else {
            this.color = Math.ceil(this.color);
            color1.style.background = 'red';
            color2.style.background = 'blue';
        }
    }

    choose () {
        this.color = Math.random();
        if (this.color < 0.5) {
            this.color = Math.floor(this.color);
            colorSpan.innerHTML = "Blue";
            colorSpan.style.color = "blue"
            this.required = 0; // for blue
            this.colorStr = 'blue';
        } else {
            this.color = Math.ceil(this.color);
            colorSpan.innerHTML = "Red";
            colorSpan.style.color = "red";
            this.required = 1; // for red
            this.colorStr = 'red';
        }
    }

    clickLeft () {
        if (color1.style.backgroundColor === this.colorStr) {
            this.score ++;
            scoreSpan.innerHTML = this.score;
            this.initColors();
            this.choose();
            this.resetCounter();
        } else {
            if (this.required === 0) {
                this.colorStr = "Blue";
            } else {
                this.colorStr = "Red";
            }
            alert('Game is over. Right color was ' + this.colorStr + '.');
            this.resetCounter()
            this.init();
            clearInterval(this.interval);
        }
    }

    clickRight () {
        if (color2.style.backgroundColor === this.colorStr) {
            this.score ++;
            scoreSpan.innerHTML = this.score;
            this.initColors();
            this.choose();
            this.resetCounter();
        } else {
            if (this.required === 0) {
                this.colorStr = "Blue";
            } else {
                this.colorStr = "Red";
            }
            alert('Game is over. Right color was ' + this.colorStr + '.');
            this.resetCounter();
            this.init();
            clearInterval(this.interval);
        }
    }
}

var game = new Game();

function clickRight () {
    game.clickRight();
}

function clickLeft () {
    game.clickLeft();
}