import 'p2';
import 'pixi';
import 'phaser';

//Preloader class
export class Preloader {

  preloadLevels(game: Phaser.Game): Array<Phaser.Loader> {
    return  [
      game.load.image('level-1', 'assets/levels/level-1.gif'),
      game.load.image('ground', 'assets/levels/platform.png')
    ]
  }

  preloadHero(game: Phaser.Game): Array<Phaser.Loader> {
    return  [
      game.load.spritesheet('hero', 'assets/hero/hero.png', 32, 48)
    ]
  }

  preloadNPC(game: Phaser.Game): Array<Phaser.Loader> {
    return [
      game.load.spritesheet('hero', 'assets/hero/hero.png', 32, 48)
    ]
  }
}
