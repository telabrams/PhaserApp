import 'p2';
import 'pixi';
import 'phaser';

//Config
import { CONFIG } from './config';

//Constructor
import { GameConstructor } from './mixins';

//Main game class
export class AppGame extends GameConstructor {
    game: Phaser.Game;
    cursors: Phaser.CursorKeys;

    constructor() {
      super();

      //Create global game object
      this.game = new Phaser.Game(CONFIG(this.preload, this.create, this.update, this.render));
    }

    private get preload() {
      return () => {

        //Turn on cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //Preload levels sprite
        this.preloadLevels(this.game);

        //Preload hero sprite
        this.preloadHero(this.game);
      }
    }

    private get create() {
      return () => {

        //Create levels
        this.createLevelOne(this.game);

        //Create hero
        this.createHero(this.game);

      }
    }

    private get update() {
      return () => {

        //Let hero moves
        this.movesHero(this.game, this.hero, this.cursors, this.platform);
      }
    }

    private get render() {
      return () => {

        //Turn on debug cloud
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
      }
    }
}
