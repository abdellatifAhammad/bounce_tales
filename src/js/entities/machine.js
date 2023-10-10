import * as me from 'melonjs';
import game from './../game.js';

class machineEntity extends me.Entity {
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        // this.body.setMaxVelocity(3, 5);
        // this.body.setFriction(0.9, 0);

        this.body.isStatic = true;

        this.runing = true;

        // this item collides ONLY with PLAYER_OBJECT
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);

        // set a renderable
        this.renderable = game.machineTexture.createAnimationFromName([
            "machine_1.png",
            "machine_2.png",
            "machine_3.png",
            "machine_broken.png"
        ]);

        // define a basic walking animatin
        this.renderable.addAnimation("runing", [{ name: "machine_1.png", delay: 150 }, { name: "machine_2.png", delay: 150 }, { name: "machine_3.png", delay: 150 }]);
        this.renderable.addAnimation("breaked", [{ name: "machine_broken.png", delay: 100 }]);

        // set as default
        this.renderable.setCurrentAnimation("runing");

        // set the renderable position to bottom center
        this.anchorPoint.set(-0.35, -0.45);

        this.particleTint = "#ffd724ff"

    }


    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision(response, other) {
        // do something when collected
        if (response.overlapN.y > 0.5 && this.runing) {
            // this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            // make the body static
            this.body.setStatic(true);
            // set dead animation
            this.renderable.setCurrentAnimation("breaked");

            var emitter = new me.ParticleEmitter(this.centerX, this.centerY, {
                width:  5,
                height: 5,
                tint: this.particleTint,
                totalParticles: 64,
                angle: 0,
                angleVariation: 6.283185307179586,
                maxLife: 5,
                speed: 3
            });

            me.game.world.addChild(emitter, this.pos.z);
            emitter.burstParticles();
            this.runing = false;
        }
        return false
    }
};

export default machineEntity;