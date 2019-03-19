import Phaser from "phaser"

// Assets images
import backgroundImg from "./assets/background.png"
import floor from "./assets/ground.png"
import dude from './assets/dude.png'
import bullet from './assets/bullet.png'
import zombie from './assets/zombie/idle/idle_1.png'

// Classes
import Bullet from './Bullet';
import Dude from './Dude';
import Zombie from "./Zombie";

class Battle extends Phaser.Scene {
    
    constructor() {
        super({key:"Battle"})
    }

    preload() {
        // Load assets for the battle
        this.load.image("background", backgroundImg)
        this.load.image("ground", floor)
        this.load.image("bullet", bullet)
        this.load.image("zombie", zombie)
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

        // this.keys will contain the controls for the dude a.k.a player
        this.keys = {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)            
        }

        // Create the player
        this.dude = new Dude({
            scene: this,
            key: 'dude',
            x: 400,
            y: 520,
        })

        // Create the zombie
        this.zombie = new Zombie({
            scene: this,
            key: 'zombie',
            x: 200,
            y: 505
        })  

        // Create bullet group
        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 3,
            runChildUpdate: true 
        });

        // Adding the colliders
        this.physics.add.collider(this.dude, this.ground)
        this.physics.add.collider(this.zombie, this.dude, this.hitplayer)
        this.physics.add.collider(this.zombie, this.bullets, this.hitbullet)

        // Create Enemy group
        this.enemies = this.add.group({
            runChildUpdate: true
        })
    }

    hitbullet(zombie, bullet) {
        bullet.destroy()
        zombie.health--
        if(zombie.health == 0) {
            zombie.destroy()
        }
    }

    hitplayer(zombie, dude) {
        zombie.walkingSpeed = 0
    }

    update() {
        // Update the dude
        this.dude.update(this.keys)
        this.zombie.update()
    }

}

export default Battle