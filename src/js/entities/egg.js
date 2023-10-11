import * as me from 'melonjs';
import game from './../game.js';

class EggEntity extends me.Entity {
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        this.body.setMaxVelocity(3, 5);
        this.body.setFriction(0.9, 0);

        this.body.isStatic = true;

        this.color = settings.color;

        // this item collides ONLY with PLAYER_OBJECT
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);


         // set a renderable
         this.renderable = game.eggTexture.createAnimationFromName([
            "egg.png", 
            "blue_egg.png",
            "stars_1.png",
            "stars_2.png",
            "stars_3.png",
            "stars_4.png",
            "stars_5.png",
        ]);

        if(settings.color==="blue"){
            this.renderable.addAnimation("normal", ["blue_egg.png"]);
        }else{
            this.renderable.addAnimation("normal", ["egg.png"]);            
        }

        // dead animatin
        this.renderable.addAnimation("smash", [{ name: "stars_1.png", delay: 50 },{ name: "stars_2.png", delay: 50 },{ name: "stars_3.png", delay: 50 },{ name: "stars_4.png", delay: 50 },{ name: "stars_5.png", delay: 50 }]);

        // set default one
        this.renderable.setCurrentAnimation("normal");

    }

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision(response, other) {
        // do something when collected

        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        this.renderable.setCurrentAnimation("smash");
        if(this.color==="blue"){
            game.data.score = game.data.score + 4;
        }else{
            game.data.score++;
        }

        setTimeout(()=>{
            me.game.world.removeChild(this);
        },250)
        return false
    }
};

export default EggEntity;
