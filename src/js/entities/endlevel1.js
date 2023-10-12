import * as me from 'melonjs';
import game from './../game.js';

class EndGameEntity extends me.Entity {
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        this.body.setMaxVelocity(3, 5);
        this.body.setFriction(0.9, 0);
        this.body.isStatic = true;


        // this item collides ONLY with PLAYER_OBJECT
    }



    /**
 * Update the Entity
 *
 * @param dt
 * @returns {any|boolean}
 */
    update(dt) {
        // return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
        return false;
    }


    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision(response, other) {
        // do something when collected
        me.state.change(me.state.MENU);
        // game.data.level1 = "completed";
        return false;
    }
};

export default EndGameEntity;