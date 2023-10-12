var resources = [

    /* Graphics.
    * @example
    * { name: "example", type:"image", src: "data/img/example.png" },
    */
    { name: "background", type: "image", src: "data/img/background.png" },
    { name: "blocks", type: "image", src: "data/img/blocks.png" },
    { name: "bouncing_tales_map1", type: "image", src: "data/img/bouncing_tales_map1.png" },
    { name: "sky_trees", type: "image", src: "data/img/sky_trees.png" },
    { name: "barrier", type: "image", src: "data/img/barrier.png" },
    { name: "title_screen", type: "image", src: "data/img/title_screen.png" },
    { name: "mobile_title_screen", type: "image", src: "data/img/mobile_title_screen.png" },
    { name: "logo", type: "image", src: "data/img/logo.png" },



    /* Maps.
     * @example
     * { name: "example01", type: "tmx", src: "data/map/example01.tmx" },
     * { name: "example01", type: "tmx", src: "data/map/example01.json" },
     */
    { name: "level1_map", type: "tmx", src: "data/map/level1_map.tmx" },


    /* Tilesets.
     * @example
     * { name: "example01", type: "tsx", src: "data/map/example01.tsx" },
     * { name: "example01", type: "tsx", src: "data/map/example01.json" },
     */
    { name: "blocks", type: "tsx", src: "data/map/blocks.tsx" },
    { name: "sky", type: "tsx", src: "data/map/sky.tsx" },
    { name: "bouncing_tales_map1", type: "tsx", src: "data/map/bouncing_tales_map1.tsx" },



    /* Atlases
    * @example
    * { name: "example_tps", type: "json", src: "data/img/example_tps.json" },
    */
    // texturePacker
    { name: "texture", type: "image", src: "data/img/texture.png" },
    { name: "texture", type: "json", src: "data/img/texture.json" },
    { name: "bounce", type: "image", src: "data/img/bounce.png" },
    { name: "bounce", type: "json", src: "data/img/bounce.json" },
    { name: "controlsTexture", type: "image", src: "data/img/controlsTexture.png" },
    { name: "controlsTexture", type: "json", src: "data/img/controlsTexture.json" },
    { name: "switch", type: "image", src: "data/img/switch.png" },
    { name: "switch", type: "json", src: "data/img/switch.json" },
    { name: "machine", type: "image", src: "data/img/machine.png" },
    { name: "machine", type: "json", src: "data/img/machine.json" },
    { name: "topo", type: "image", src: "data/img/topo.png" },
    { name: "topo", type: "json", src: "data/img/topo.json" },
    { name: "topo_ground", type: "image", src: "data/img/topo_ground.png" },
    { name: "topo_ground", type: "json", src: "data/img/topo_ground.json" },
    { name: "egg", type: "image", src: "data/img/egg.png" },
    { name: "egg", type: "json", src: "data/img/egg.json" },


    /* Background music.
    * @example
    * { name: "example_bgm", type: "audio", src: "data/bgm/" },
    */
    { name: "start", type: "audio", src: "data/bgm/" },
    { name: "main", type: "audio", src: "data/bgm/" },
    { name: "win", type: "audio", src: "data/bgm/" },

    /* Fonts.
    * @example
    * { name: "font_name", type: "binary", src: "fnt/font.fnt" },
    */
    { name: "PressStart2P", type:"image", src: "data/fnt/PressStart2P.png" },
    { name: "PressStart2P", type:"binary", src: "data/fnt/PressStart2P.fnt"}

];

export default resources;
