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
        level1:"begin",
    },

    // a reference to the texture atlas
    texture: null,
    controlsTexture:null,
    switchTexture: null,
    eggTexture: null,
    machineTexture: null,
    topoTexture: null,
    topoGroundTexture: null,

    // to change the state of the barrier
    isBarrierOpen: false,
    topo_ground_existance: true,
};

export default game;
