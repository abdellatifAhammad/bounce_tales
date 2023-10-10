import * as me from 'melonjs';
import game from '../game.js';

class PlayerEntity extends me.Entity {

    /**
   *
   * @param x
   * @param y
   * @param settings
   */
    constructor(x, y, settings) {
        super(x, y, settings);

        // max walking & jumping speed
        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.2, 0.2);

        this.body.collisionType = me.collision.types.PLAYER_OBJECT;


        // set the viewport to follow this renderable on both axis, and enable damping
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.1);

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X, "jump", true);
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN, "down");

        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.W, "jump", true);
        me.input.bindKey(me.input.KEY.S, "down");


        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        
        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "bounce001.png",
            "bounce002.png",
            "bounce003.png",
            "bounce004.png"
        ]);

        // define a basic walking animatin
        this.renderable.addAnimation("stand", [{ name: "bounce001.png", delay: 100 }]);
        this.renderable.addAnimation("walk", [{ name: "bounce001.png", delay: 100 },{ name: "bounce002.png", delay: 100 },{ name: "bounce003.png", delay: 100 },{ name: "bounce004.png", delay: 100 }]);
        this.renderable.addAnimation("jump", [{ name: "bounce001.png", delay: 150 }]);

        // set as default
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 0.5);

    }

    /**
     * Update the Entity
     *
     * @param dt
     * @returns {any|boolean}
     */
    update(dt) {
        if (me.input.isKeyPressed('left')) {

            // flip the sprite on horizontal axis
            this.renderable.flipX(true);
            // update the default force
            this.body.force.x = -this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (me.input.isKeyPressed('right')) {

            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.force.x = this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        if (me.input.isKeyPressed('jump')) {
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.force.y = -this.body.maxVel.y
            }
        } else {
            this.body.force.y = 0;
        }


        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

    /**
     * Collision Handler
     *
     * @returns {boolean}
     */
    onCollision() {
        return true;
    }

};

export default PlayerEntity;
