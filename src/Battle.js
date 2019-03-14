import Phaser from "phaser"

import backgroundImg from "./assets/background.png"
import floor from "./assets/ground.png"
import dude from './assets/dude.png'
import bullet from './assets/bullet.png'

class Battle extends Phaser.Scene {
    
    constructor() {
        super({key:"Battle"})
    }

    preload() {
        this.load.image("background", backgroundImg)
        this.load.image("ground", floor);
        this.load.image("bullet", bullet)
        this.load.spritesheet('dude', 
            dude,
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    
    create() {

        // Add the background image
        this.add.image(400, 300, "background")

        // Add the floor
        this.ground = this.physics.add.staticGroup()
        this.ground.create(400, 568, 'ground').setScale(2).refreshBody()

        // Add the player
        this.player = this.physics.add.sprite(400, 510, 'dude').setScale(1.4)
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)

        // Player and ground collision
        this.physics.add.collider(this.player, this.ground)

        // All cursor keys of the arrows on keyboard
        this.cursors = this.input.keyboard.createCursorKeys()

        // Player faces left or right
        this.player.state = 'left'

        // Make bullet group
        var Bullet = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize:

            function Bullet (scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet')
                this.speed = Phaser.Math.GetSpeed(600, 1);
                this.state = "left";
            },

            fire: function (x, y) {
                this.setPosition(x, y)
                this.setActive(true);
                this.setVisible(true);
            },

            update: function(time, delta) {

                if(this.state === "left") {
                    this.x -= 10;
                }
                else {
                    this.x += 10; 
                }

                if (this.x > 820 || this.x < 0)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }

        }, this)

        this.bullets = this.add.group({
            classType: Bullet,
            runChildUpdate: true 
        });

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {

        // Player face left side
        if (this.cursors.left.isDown) {
            this.player.setScale(1.4, 1.4)
            this.player.state = 'left'
        }

        // Player face right side
        else if (this.cursors.right.isDown) {
            this.player.setScale(-1.4, 1.4)
            this.player.state = 'right'
        }

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {

            let bullet = this.bullets.get();

            if (bullet) {

                bullet.setScale(.3)

                let bulletPosition = this.player.x - 50;

                if(this.player.state === "right") {
                    bulletPosition = this.player.x + 50
                }

                bullet.state = this.player.state
                bullet.fire(bulletPosition, this.player.y);
            }
        }
    }

}

export default Battle