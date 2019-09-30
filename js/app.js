let playerScore = 0;
let lives = 5;
let playerLevel = 1;
const livesLeft = document.querySelector('.lives span');
const score = document.querySelector('.score span');
const level = document.querySelector('.level span')
const modal = document.querySelector(".modal");
const btnModal = document.querySelector(".btn-modal");
let enemyPosition = [50, 150, 230];
let allEnemies = [];



// Enemies our player must avoid
let Enemy = function (x, y, velocity) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.velocity = velocity;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velocity * dt;
    livesLeft.innerHTML = lives;

    //Restart enemy when player reaches other side.
    if (this.x > 505) {
        this.x = -150;
        //Controls the enemy velocity
        this.velocity = 150 + Math.floor(Math.random() * 800);

    }


    //if player hit enemy.
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
        lives--;
        livesLeft.innerHTML = lives;
        if (lives === 0) {
            modal.style.display = "block";
            allEnemies = [];
            score.innerHTML = '0';
            btnModal.addEventListener("click", () => {
                modal.style.display = "none";
                lives = 5;
                playerScore = 0;
                playerLevel = 1
                livesLeft.innerHTML = lives;
                score.innerHTML = playerScore;
                level.innerHTML = playerLevel;
                //instantiating the enemies again;
                enemyInit();
            });


        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player Classes.

let Player = function (x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.sprite = 'images/char-boy.png';
}


Player.prototype.update = function () {
    //to stop player from getting out.
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        if (lives > 0) {
            playerScore++;
            score.innerHTML = playerScore;
        }
        //for every 10 pointes level go up.
        if (playerScore === 10 && lives > 0) {
            playerScore = 0;
            score.innerHTML = playerScore;
            playerLevel++;
            level.innerHTML = playerLevel;
        }
    }
};

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'up':
            this.y -= this.velocity + 30;
            break;
        case 'down':
            this.y += this.velocity + 30;
            break;
        case 'left':
            this.x -= this.velocity + 50;
            break;
        case 'right':
            this.x += this.velocity + 50;
            break;
    }

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
let player = new Player(200, 400, 50);

//we instantaite enemies within function to reuse
// enemies also dependent on player level.
const enemyInit = function () {
    enemyPosition.forEach((positionCoordinate) => {
        let enemy = new Enemy(0, positionCoordinate, 100 + Math.floor(Math.random() * playerLevel * 500));
        allEnemies.push(enemy);
    });

}
enemyInit();
// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});