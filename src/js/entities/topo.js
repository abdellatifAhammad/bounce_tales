import * as me from 'melonjs';
import game from './../game.js';
import PathEnemyEntity from './pathEnemyEntity.js';



export class topoEntity extends PathEnemyEntity {

    constructor(x, y, settings) {
        // super constructor
        super(x, y, settings);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "topo.png", 
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // walking animatin
        this.renderable.addAnimation("walk", ["topo.png"]);
        // dead animatin
        this.renderable.addAnimation("dead", [{ name: "topo.png", delay: 600 }]);

        // set default one
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0,0.5);

        // particle tint matching the sprite color
        this.particleTint = "#85c5f1";

        this.incr = 0;

    }

};

export default topoEntity;