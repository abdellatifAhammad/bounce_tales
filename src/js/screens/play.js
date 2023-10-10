import * as me from 'melonjs';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // load a level
        me.level.load("level1_map");
        

        // display if debugPanel is enabled or on mobile
        // if ((me.plugin.cache.debugPanel && me.plugin.cache.debugPanel.panel.visible) || me.device.touch) {
        //     if (typeof this.virtualJoypad === "undefined") {
        //         this.virtualJoypad = new VirtualJoypad();
        //     }
        //     me.game.world.addChild(this.virtualJoypad);
        // }

        me.audio.playTrack("main");
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
        me.audio.stopTrack("main");
    }
};

export default PlayScreen;
