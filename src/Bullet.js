import Phaser from "phaser"

class Bullet extends Phaser.GameObjects.Sprite {
    
    constructor(scene) {
        super(scene)
        
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet')

        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)

        this.speed = Phaser.Math.GetSpeed(600, 1);
        this.side = "left";
        this.setScale(.3)
    }

    // Fire bullet
    fire(x, y, side) {

        // Set the bullet side left || right
        this.side = side

        // Set the offset of the bullet regarding to the player side
        if(side === "left") {
            x = x - 50
        } 
        else {
            x = x + 50
        }

        this.setPosition(x, y)
    }

    // Keep the bullet flowing
    update() {
        if(this.side === "left") {
            this.x -= 10;
        }
        else {
            this.x += 10; 
        }
        if (this.x > 820 || this.x < 0) {
            this.destroy()
        }
    }
}

export default Bullet