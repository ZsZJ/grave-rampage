import Phaser from 'phaser'

class Zombie extends Phaser.GameObjects.Sprite {

    constructor(config) {

        super(config.scene, config.x, config.y, config.key)
        config.scene.physics.world.enable(this)
        config.scene.add.existing(this)

        this.setScale(.35)

        // Zombie stats
        this.health = 3
        this.walkingSpeed = .7
    }

    update() {
        this.x += this.walkingSpeed; 
    }
}

export default Zombie