import Phaser from "phaser"

class Dude extends Phaser.GameObjects.Sprite {

    constructor(config) {

        super(config.scene, config.x, config.y, config.key) 
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        // Set the player scale
        this.setScale(1.4)

        // Default side is left
        this.side = "left"
    }

    update(keys) {
        let input = {
            left: keys.left.isDown,
            right: keys.right.isDown,
            fire: Phaser.Input.Keyboard.JustDown(keys.fire)
        }
        if(input.left) {
            this.side = "left"
            this.setScale(1.4, 1.4)

        }
        else if(input.right) {
            this.side = "right"
            this.setScale(-1.4, 1.4)
        }
        else if(input.fire) {
            let bullet = this.scene.bullets.get(this)
            if(bullet) {
                bullet.fire(this.x, this.y, this.side)
            }
        }
    }
}

export default Dude