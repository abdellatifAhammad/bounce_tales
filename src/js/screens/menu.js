import * as me from 'melonjs';
import game from '../game.js';


class NewGameText extends me.BitmapText {
	/**
	 * constructor
	 */
	constructor(x, y) {
		// call the super constructor
		super(
			x,
			y,
			{ font: "PressStart2P", textAlign: 'center', size: 1.5, fillStyle: "white", text: "> New Game " }
		);

		me.input.registerPointerEvent(
			"pointerdown",
			this,
			function () {
				// Handle the click event here
				console.log("Text Clicked!");
			}
		);
	}

	onClick(/* event */) {
		console.log("clicked !!");
	}

}


class GameStartControl extends me.UISpriteElement {
    /**
     * constructor
     */
    constructor(x, y) {
        super(x, y, {
            image: game.texture,
            // region : "shadedDark13.png" // ON by default
            region : "start.png"
        });
        this.setOpacity(0.8);
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
        this.setOpacity(0.8);
    }

    /**
     * function called when the object is clicked on
     */
    onClick(/* event */) {
		me.state.change(me.state.PLAY);
		return false;
    }
};






class MenuScreen extends me.Stage {
	onResetEvent() {


		if (me.game.viewport.width < 500) {
			// new sprite for the title screen, position at the center of the game viewport
			var backgroundImage = new me.Sprite(me.game.viewport.width / 2, me.game.viewport.height / 2, {
				image: me.loader.getImage('mobile_title_screen'),
			});
			var text = new NewGameText(me.game.viewport.width / 2, (me.game.viewport.height / 2) - 50);
			var start = new GameStartControl(me.game.viewport.width / 2, (me.game.viewport.height / 2) + 50)
		} else {
			// new sprite for the title screen, position at the center of the game viewport
			var backgroundImage = new me.Sprite(me.game.viewport.width / 2, me.game.viewport.height / 2, {
				image: me.loader.getImage('title_screen'),
			});
			var text = new NewGameText(me.game.viewport.width / 2, (me.game.viewport.height / 2) - 50);
			var start = new GameStartControl(me.game.viewport.width / 2, (me.game.viewport.height / 2) + 50)
		}


		var logo = new me.Sprite(me.game.viewport.width / 2, 100, {
			image: me.loader.getImage('logo'),
		});







		// scale to fit with the viewport size
		backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);
		// add to the world container
		me.game.world.addChild(backgroundImage, 1);
		me.game.world.addChild(logo, 2);
		me.game.world.addChild(text, 3);
		me.game.world.addChild(start,4);

		// me.game.world.addChild(new TitleText());

		// change to play state on press Enter or click/tap
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

		me.audio.playTrack("start");

	}

	/**
	 * action to perform when leaving this screen (state change)
	 */
	onDestroyEvent() {
		me.audio.stopTrack("start");
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.pointer.LEFT);
		me.event.off(me.event.KEYDOWN, this.handler);
	}
};

export default MenuScreen;
