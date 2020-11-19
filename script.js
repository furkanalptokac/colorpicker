const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const colorSpan = document.getElementById('colorSpan');
const scoreSpan = document.getElementById('score');
const timer = document.getElementById('timer');
const startText = document.getElementById('startText');

class Game {
    isGameStarted = 0;
    
    constructor () {
        this.initColors();
    }

    init () {
        clearInterval(this.interval);
        this.score = 0;
        this.initColors();
        this.choose();
        this.counter();
        scoreSpan.innerHTML = this.score;
        timer.innerHTML = '0.000';
        startText.innerHTML = '';
    }
    
    counter () {
        this.startTime = Date.now() + 1500;
        this.elapsedTime = this.startTime - Date.now();

        this.interval = setInterval(() => {
            this.elapsedTime = this.startTime - Date.now();
            timer.innerHTML = (this.elapsedTime / 1000).toFixed(3);

            if (this.elapsedTime <= 0) {
                this.reset();
                startText.innerHTML = 'Click any color to start!';
                timer.innerHTML = '0.000';
                alert('You lost. Time is out. Your score is: ' + this.score);
            }
        }, 10);
    }

    resetCounter() {
        clearInterval(this.interval);
        this.counter();
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
        if (this.isGameStarted === 0) {
            this.isGameStarted = 1;
            this.init();
        } else {
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
                alert('Game is over. Right color was ' + this.colorStr + '. Your score is ' + this.score );
                this.reset();
            }
        }
    }

    clickRight () {
        if (this.isGameStarted === 0) {
            this.isGameStarted = 1;
            this.init();
        } else {

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
                alert('Game is over. Right color was ' + this.colorStr + '. Your score is ' + this.score );
                this.reset();
            }
        }
    }

    reset () {
        this.isGameStarted = 0;
        this.resetCounter();
        this.init();
        clearInterval(this.interval);
        colorSpan.innerHTML = '';
        startText.innerHTML = 'Click any color to start!';
    }
}

var game = new Game();

function clickRight () {
    game.clickRight();
}

function clickLeft () {
    game.clickLeft();
}