import * as me from 'melonjs';
import game from './../game.js';

class EndGameEntity extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.body.setMaxVelocity(3, 5);
        this.body.setFriction(0.9, 0);
        this.body.isStatic = true;
    }


    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision(response, other) {
        me.state.change(me.state.MENU);
        game.data.level_1 = "completed";
        game.isBarrierOpen = false;
        game.isTopoGroundExist = true;
        return false;
    }
};

export default EndGameEntity;