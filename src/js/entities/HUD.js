import * as me from 'melonjs';
import game from './../game.js';


/**
 * a basic control
 */
class AudioControl extends me.UISpriteElement {
    /**
     * constructor
     */
    constructor(x, y) {
        super(x, y, {
            image: game.texture,
            // region : "shadedDark13.png" // ON by default
            region : "mute.png"
        });
        this.setOpacity(0.5);
        this.isMute = false;
        this.floating = false;
    }

    /**
     * function called when the pointer is over the object
     */
    onOver(/* event */) {
        this.setOpacity(1.0);
    }

    /**
     * function called when the pointer is leaving the object area
     */
    onOut(/* event */) {
        this.setOpacity(0.5);
    }

    /**
     * function called when the object is clicked on
     */
    onClick(/* event */) {
        if (this.isMute) {
            me.audio.unmuteAll();
            // this.setRegion(game.texture.getRegion("shadedDark13.png"));
            this.setRegion(game.texture.getRegion("mute.png"));
            this.isMute = false;
        } else {
            me.audio.muteAll();
            // this.setRegion(game.texture.getRegion("shadedDark15.png"));
            this.setRegion(game.texture.getRegion("unmute.png"));
            this.isMute = true;
        }
        return false;
    }
};

/**
 * a basic HUD item to display score
 */
class ScoreItem extends me.BitmapText {
    /**
     * constructor
     */
    constructor(x, y) {
        // call the super constructor
        super(
            x,
            y,
            {
                font : "PressStart2P",
                textAlign : "right",
                textBaseline : "top",
                text : "0/30",
                size:1,
            }
        );

        this.relative = new me.Vector2d(x, y);

        this.floating = false;

        // local copy of the global score
        this.score = -1;

        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(w, h, 0).add(this.relative);
        }).bind(this));
    }

    /**
     * update function
     */
    update( dt ) {
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            this.setText(`${this.score}/30`);
            this.isDirty = false;
        }
        return super.update(dt);
    }
};

/**
 * a HUD container and child items
 */
class UIContainer extends me.Container {

    constructor() {
        // call the constructor
        super();

        // persistent across level change
        this.isPersistent = true;

        // Use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at position
        this.addChild(new ScoreItem(me.game.viewport.width -40, 40));

        // add our audio control object
        this.addChild(new AudioControl(36, 56));

    }
};

export default UIContainer;