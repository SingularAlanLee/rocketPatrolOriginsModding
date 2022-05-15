/*Author: Alan Lee
Project Title:  Rocket Patrols Modding
Date:  May 20, 2022
How long it took to complete:  12 hours
Points breakdown:
Simultaneous coOp (30)
Make a new ship type (20)
Parallax scrolling (10)
Display time left (10)
Random explosion sound(10)
Bonus time for ship destruction (20)
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play, coOp]  //loads scenes in order of listing
}


let game = new Phaser.Game(config);

//keyboard vars
let keyF,keyR,keyLEFT,keyRIGHT,keyA,keyD,keyW,keyC,bonusTimer;

let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
