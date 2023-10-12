import * as me from 'melonjs';
import UIContainer from '../entities/HUD';
import VirtualJoypad from '../entities/controls';
import game from '../game';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // load a level
        me.level.load("level1_map");


        // add our HUD to the game world
        if (typeof this.HUD === "undefined") {
            this.HUD = new UIContainer();
        }

        me.game.world.addChild(this.HUD);

        // display if debugPanel is enabled or on mobile
        if ((me.plugin.cache.debugPanel && me.plugin.cache.debugPanel.panel.visible) || me.device.touch) {
            if (typeof this.virtualJoypad === "undefined") {
                this.virtualJoypad = new VirtualJoypad();
            }
            me.game.world.addChild(this.virtualJoypad);
        }
        me.audio.playTrack("main");
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {

        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        this.HUD = undefined;
        game.data.score = 0;
        
        // remove the joypad if initially added
        if (this.virtualJoypad && me.game.world.hasChild(this.virtualJoypad)) {
            me.game.world.removeChild(this.virtualJoypad);
            this.virtualJoypad = undefined;
        }


        // stop the bgm
        me.audio.stopTrack("main");
    }
};

export default PlayScreen;
