import * as me from 'melonjs';
import game from './../game.js';

class BarrierEntity extends me.Entity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        this.open = false;

        this.body.mass = 10;

        this.body.setMaxVelocity(3, 5);
        this.body.setFriction(0.9, 0);

        this.body.isStatic = true;
        this.alwaysUpdate = true;
        this.body.ignoreGravity = true;

        // this item collides ONLY with PLAYER_OBJECT
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    }



    /**
     * Update the Entity
     *
     * @param dt
     * @returns {any|boolean}
     */
    update(dt) {

        if (game.isBarrierOpen && !this.open) {
            // me.game.viewport.focusOn(this)
            this.body.isStatic = false;
            this.body.force.y = -this.body.maxVel.y;
            setTimeout(() => {
                this.body.isStatic = true;
            }, 1000)

            this.open = true;
        }

        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }
};

export default BarrierEntity;
