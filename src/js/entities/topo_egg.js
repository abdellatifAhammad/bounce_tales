import * as me from 'melonjs';
import game from './../game.js';

class TopoEggEntity extends me.Entity {
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        this.body.setMaxVelocity(3, 5);
        this.body.setFriction(0.9, 0);

        this.body.isStatic = true;

        // this item collides ONLY with PLAYER_OBJECT
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);


         // set a renderable
         this.renderable = game.eggTexture.createAnimationFromName([
            "blue_egg.png", 
            "stars_1.png",
            "stars_2.png",
            "stars_3.png",
            "stars_4.png",
            "stars_5.png",
        ]);

        this.renderable.addAnimation("normal", ["blue_egg.png"]);
        // dead animatin
        this.renderable.addAnimation("smash", [{ name: "stars_1.png", delay: 50 },{ name: "stars_2.png", delay: 50 },{ name: "stars_3.png", delay: 50 },{ name: "stars_4.png", delay: 50 },{ name: "stars_5.png", delay: 50 }]);

        // set default one

    }


    update(dt){
        if(!game.topo_ground_existance){
            this.renderable.setCurrentAnimation("normal");
        }

    }

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision(response, other) {
        // do something when collected

        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        this.renderable.setCurrentAnimation("smash");

        setTimeout(()=>{
            me.game.world.removeChild(this);
        },250)
        return false
    }
};

export default TopoEggEntity;
