class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }

    preload(){
        this.load.audio('sfx_select', '../../../assets/assets_blip_select12.wav');
        this.load.audio('explosion00', '../../../assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', '../../../assets/assets_rocket_shot.wav');
        this.load.audio('explosion01',"../../../assets/explosion01.mp3");
        this.load.audio('explosion02',"../../../assets/explosion02.mp3");
        this.load.audio('explosion03',"../../../assets/explosion03.mp3");
        this.load.audio('explosion04',"../../../assets/explosion04.mp3");
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice, -> for Expert,', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 2*borderUISize + borderPadding, "or C for coOp", menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        bonusTimer = 0;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('play');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('play');    
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('coOp');
        }
      }
}
