import * as melon from 'melonjs';
import { DebugPanelPlugin } from "debugPlugin";


export default function onload() {

    console.log("BOUNCE TALES GAME INITIALIZATION");

    // init the video
    if (!melon.video.init(800, 600, { parent: "screen", scaleMethod: "flex-width", renderer: melon.video.WEBGL, preferWebGL1: false, depthTest: "z-buffer", subPixel: false })) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }


    // register the debug plugin
    melon.plugin.register(DebugPanelPlugin, "debugPanel");

    // initialize the "sound engine"
    melon.audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    melon.loader.crossOrigin = "anonymous";
}