import * as me from 'melonjs';
import game from './../game.js';


class PathEnemyEntity extends me.Entity {

    constructor(x, y, settings) {
        super(x, y, settings);
        // save the area size defined in Tiled
        var height = settings.width || settings.framewidth;

        // adjust the setting size to the sprite one
        settings.width = settings.framewidth;
        settings.height = settings.frameheight;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);


        // max walking & jumping speed
        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);

        // set start/end position based on the initial area size
        y = this.pos.y;
        this.startY = y;
        this.endY = y + height - settings.frameheight;
        this.pos.y = y + height - settings.frameheight;

        // enemies are not impacted by gravity
        this.body.gravityScale = 0;

        this.isMovingDown = false;

        this.moveSteps = 1;

        // body walking & flying speed
        this.body.setMaxVelocity(settings.velX || 1, settings.velY || 1);

        // set a "enemyObject" type
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        // only check for collision against player and world shape
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);

        // don't update the entities when out of the viewport
        this.alwaysUpdate = false;

        // a specific flag to recognize these enemies
        this.isMovingEnemy = true;

        // default tint for particles
        this.particleTint = "#FFF";
    }


    update(dt) {
        if (this.alive) {
            if (this.isMovingDown) {
                // Check if the object's position is below (startY + 100)
                if (this.pos.y < (this.startY + 8)) {
                    this.body.setStatic(false);
                    // Move the object down
                    this.body.force.y = 1;
                } else {
                    // Switch direction and move up
                    this.body.setStatic(true);
                    setTimeout(() => {
                        this.isMovingDown = false;
                        this.body.force.y = -1;
                        this.renderable.flipX(true);
                    }, 500);
                }
            } else {
                // Check if the object's position is above (startY - 100)
                if (this.pos.y > (this.startY - 8)) {
                    this.body.setStatic(false);
                    // Move the object up
                    this.body.force.y = -1;
                } else {
                    // Switch direction and move down
                    this.body.setStatic(true);
                    setTimeout(() => {
                        this.isMovingDown = true;
                        this.body.force.y = 1;
                        this.renderable.flipX(false);
                    }, 500)
                }
            }
        }

        return super.update(dt);
    }



    /**
     * collision handle
     */
    onCollision(response) {
        //     res.y >0 means touched by something on the bottom
        //     which mean at top position for this one
        if (this.alive && (response.overlapV.y > 0.5) && response.a.body.falling) {
            // make it dead
            this.alive = false;
            //avoid further collision and delete it
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            // make the body static
            this.body.setStatic(true);
            // set dead animation
            this.renderable.setCurrentAnimation("dead");

            var emitter = new me.ParticleEmitter(this.centerX, this.centerY, {
                width: this.width / 4,
                height: this.height / 4,
                tint: this.particleTint,
                totalParticles: 32,
                angle: 0,
                angleVariation: 6.283185307179586,
                maxLife: 5,
                speed: 3
            });
            game.isTopoGroundExist = false;
            me.game.world.addChild(emitter, this.pos.z);
            me.game.world.removeChild(this);
            emitter.burstParticles();
        }
        return false;
    }
};


export default PathEnemyEntity; 