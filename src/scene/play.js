class Play extends Phaser.Scene{
    constructor(){
        super("play");
    }

    preload(){
        this.load.image("rocket", "../../assets/rocket.png");
        this.load.image("spaceship", "../../assets/spaceship.png");
        this.load.image("fastSpaceship","../../assets/fastSpaceship.png");
        this.load.image("starfield", "../../assets/starfield.png");
        this.load.image("asteroids","../../assets/parallaxAsteroids.png")
        this.load.spritesheet('explosion', '../../assets/explosion.png',{frameWidth:64, frameHeight:32, startFrame:0, endFrame: 9});
    }

    create(){
        //green UI background
        this.add.rectangle(0, borderUISize+borderPadding, game.config.width, borderUISize*2,0x00FF00).setOrigin(0,0);
        
        //scrolling background
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
        this.asteroids = this.add.tileSprite(0,150,640,240,'asteroids').setOrigin(0,0);

        //white borders
        this.add.rectangle(0,0, game.config.width, borderUISize,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        //rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height -borderUISize-borderPadding, 'rocket');
        this.p1Rocket.isPlayer2(false);
        
        //spawn enemies
        this.ship01 = new Ship(this, game.config.width +borderUISize*6, borderUISize*4, 'fastSpaceship',0,30).setOrigin(0,0);
        this.ship02 = new Ship(this, game.config.width +borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship',0,20).setOrigin(0,0);
        this.ship03 = new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        
        //change ship01 speed
        this.ship01.overwriteSpeed(this.ship01.moveSpeed*2);

        //define keys/controls
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        //display time
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize +borderPadding*2, this.p1Score, scoreConfig);
        
        //game over flag
        this.gameOver = false;
        scoreConfig.fixedWidth = 0;

        this.timeLeft = this.add.text((borderUISize + borderPadding)*11.5, borderUISize+borderPadding*2, this.time.now, timeConfig);
    }

    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        //scrolling background
        this.starfield.tilePositionX -= 4;
        this.asteroids.tilePositionX -= 8;

        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions
        if(this.checkCollisions(this.p1Rocket,this.ship03)){
            this.p1Rocket.reset();
            //this.ship03.reset();
            this.shipExplode(this.ship03);
        }

        if(this.checkCollisions(this.p1Rocket,this.ship02)){
            this.p1Rocket.reset();
            //this.ship02.reset();
            this.shipExplode(this.ship02);
        }
        
        if(this.checkCollisions(this.p1Rocket,this.ship01)){
            this.p1Rocket.reset();
            //this.ship01.reset();
            this.shipExplode(this.ship01);
        }

        let timer = Math.round(((game.settings.gameTimer - this.time.now)*0.001)+ bonusTimer);
        this.timeLeft.setText(Math.round((game.settings.gameTimer - this.time.now)*0.001));

        if(timer < 1){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/3, game.config.height/2 + 64, 'Press (R) to restart or <- for Menu', this.scoreConfig).setOrigin(0,0);
            this.gameOver = true;
        }
    }

    checkCollisions(rocket, ship){
        if(rocket.x < ship.x + ship.width && rocket.x +rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true;
        }
        else{
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        bonusTimer += 10;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('explosion0' + Math.floor((Math.random()*5).toString()));
    }
}