import * as me from 'melonjs';
import game from './../game.js';

class switchEntity extends me.Entity {
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        this.body.setMaxVelocity(3, 5);
        this.body.setFriction(0.9, 0);

        this.body.isStatic = true;

        // this item collides ONLY with PLAYER_OBJECT
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "switch_off.png",
            "switch_on.png"
        ]);

        // define a basic walking animatin
        this.renderable.addAnimation("off", [{ name: "switch_off.png", delay: 150 }]);
        this.renderable.addAnimation("on", [{ name: "switch_on.png", delay: 150 }]);

        // set as default
        this.renderable.setCurrentAnimation("off");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 0.5);

    }

    onCollision(response, other) {
        if (!game.isBarrierOpen) {
            if (!this.renderable.isCurrentAnimation("on")) {
                this.renderable.setCurrentAnimation("on");
            }

            game.isBarrierOpen = true;
        }
        return false
    }
};

export default switchEntity;