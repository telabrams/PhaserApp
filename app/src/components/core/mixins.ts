import 'p2';
import 'pixi';
import 'phaser';

//Game preloader
import { Preloader } from './preloader';

//Levels
import { LevelOne } from '../levels/level-1';

//Hero
import { HeroCharacter } from '../hero/hero';

//Mixin function
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      if (name !== 'constructor') {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    })
  })
}

//Constructor class
export class GameConstructor implements Preloader, LevelOne, HeroCharacter {

  //preloader`s properties
  preloadLevels: (game:Phaser.Game) => Array<Phaser.Loader>;
  preloadHero: (game:Phaser.Game) => Array<Phaser.Loader>;
  preloadNPC: (game:Phaser.Game) => Array<Phaser.Loader>;

  //hero`s properties
  hero: Phaser.Sprite;
  createHero: (game:Phaser.Game) => void;
  movesHero: (game:Phaser.Game, hero: Phaser.Sprite, cursor: Phaser.CursorKeys, platform: Phaser.Group) => void;

  //level`s  properties
  ///LevelOne
  platform: Phaser.Group;
  createLevelOne: (game:Phaser.Game) => void;
}

applyMixins(GameConstructor, [Preloader, LevelOne, HeroCharacter]);
