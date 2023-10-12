import * as me from 'melonjs';
import game from './../game.js';


export class topoGroundEntity extends me.Entity {

    constructor(x, y, settings) {
        super(x, y, settings);

        this.body.setMaxVelocity(3, 5);
        this.body.setFriction(0.9, 0);

        this.body.isStatic = true;

        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);


        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "topo_ground_1.png",
            "topo_ground_2.png",
            "topo_ground_3.png"
        ]);

        // // custom animation speed ?
        // if (settings.animationspeed) {
        //     this.renderable.animationspeed = settings.animationspeed;
        // }

        // walking animatin
        this.renderable.addAnimation("moving", [{ name: "topo_ground_1.png", delay: 100 }, { name: "topo_ground_3.png", delay: 100 }, { name: "topo_ground_2.png", delay: 100 }]);
        // dead animatin
        this.renderable.addAnimation("stoped", [{ name: "topo_ground_1.png", delay: 100 }]);

        // set default one
        this.renderable.setCurrentAnimation("moving");

        // set the renderable position to bottom center
        this.anchorPoint.set(0, 0);

        // particle tint matching the sprite color
    }


    update(dt){
        if(!game.isTopoGroundExist){
            me.game.world.removeChild(this);
        }
    }

    onCollision(response, other) {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        return true;
    }

};

export default topoGroundEntity;