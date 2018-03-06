import 'p2';
import 'pixi';
import 'phaser';

//Level-1
export class LevelOne {
  platform: Phaser.Group;

  createLevelOne(game: Phaser.Game): void  {

    //Start physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.setBoundsToWorld();

    //Level borders
    game.world.setBounds(0, 0, 1600, 1200);

    let background: Phaser.Sprite = game.add.sprite(0, 0, 'level-1');
    background.scale.set(2.5);

    let platform: Phaser.Group = game.add.group();
    platform.enableBody = true;

    let ground: Phaser.Sprite = platform.create(0, game.world.height - 770, 'ground');
    ground.alpha = 0.2;
    ground.scale.setTo(2.5, 2);
    ground.body.immovable = true;

    this.platform = platform;

  }
}
