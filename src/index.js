import * as me from 'melonjs';
import game from './js/game.js';
import resources from './js/resources.js';
import PlayScreen from './js/screens/play.js';
import PlayerEntity from './js/entities/player.js';
import EggEntity from './js/entities/egg.js';
import BarrierEntity from './js/entities/barrier.js';
import switchEntity from './js/entities/switch.js';
import machineEntity from './js/entities/machine.js';
import topoEntity from './js/entities/topo.js';
import topoGroundEntity from './js/entities/topo_ground.js';
import TopoEggEntity from './js/entities/topo_egg.js';
import MenuScreen from './js/screens/menu.js';
import EndGameEntity from './js/entities/endlevel1.js';

/**
 *
 * Initialize the application
 */
export default function onload() {

    // init the video
    if (!me.video.init(4000, 668, { parent: "screen", scaleMethod: "flex-width", renderer: me.video.WEBGL, preferWebGL1: false, depthTest: "z-buffer", subPixel: false })) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the "sound engine"
    me.audio.init("ogg,mp3");

    // allow cross-origin for image/texture loading
    me.loader.crossOrigin = "anonymous";

    // set all ressources to be loaded
    me.loader.preload(resources, () => {

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.MENU, new MenuScreen());
        // me.state.set(me.state.GAME_END, new EndGameScreen())

        // set the fade transition effect
        me.state.transition("fade", "#FFFFFF", 250);

        me.audio.setVolume(me.audio.getVolume()-0.3);


        // register our objects entity in the object pool
        me.pool.register("mainPlayer", PlayerEntity);
        me.pool.register("BarrierEntity", BarrierEntity);
        me.pool.register("switchEntity", switchEntity, true);
        me.pool.register("machineEntity", machineEntity, true);
        me.pool.register("topoEntity", topoEntity, true);
        me.pool.register("topoGroundEntity", topoGroundEntity);
        me.pool.register("EggTopoEntity", TopoEggEntity);
        me.pool.register("EndGameEntity", EndGameEntity);
        me.pool.register("EggEntity", EggEntity, true);


        // load the texture atlas file
        // this will be used by renderable object later
        game.texture = new me.TextureAtlas(
            me.loader.getJSON("bounce"),
            me.loader.getImage("bounce")
        );

        game.switchTexture = new me.TextureAtlas(
            me.loader.getJSON("switch"),
            me.loader.getImage("switch")
        );

        game.machineTexture = new me.TextureAtlas(
            me.loader.getJSON("machine"),
            me.loader.getImage("machine")
        );

        game.topoTexture = new me.TextureAtlas(
            me.loader.getJSON("topo"),
            me.loader.getImage("topo")
        );

        game.topoGroundTexture = new me.TextureAtlas(
            me.loader.getJSON("topo_ground"),
            me.loader.getImage("topo_ground")
        );

        game.eggTexture = new me.TextureAtlas(
            me.loader.getJSON("egg"),
            me.loader.getImage("egg")
        );

        me.state.change(me.state.MENU);
        setTimeout(() => {
            me.state.change(me.state.PLAY);
        }, 1500)
    });
}