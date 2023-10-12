/**
 * hold all game specific data
 */
var game = {

    /**
     * object where to store game global scole
     */
    data: {
        // score
        score: 0,
        level_1:"begin",
    },

    // a reference to the texture atlas
    texture:null,

    // to change the state of the barrier
    isBarrierOpen: false,
    isTopoGroundExist: true,
};

export default game;
