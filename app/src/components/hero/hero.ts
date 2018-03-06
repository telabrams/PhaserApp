import 'p2';
import 'pixi';
import 'phaser';

//Hero
export class HeroCharacter {
  hero: Phaser.Sprite;

  createHero(game: Phaser.Game): void {
    this.hero = game.add.sprite(400, game.world.height - 900, 'hero');
    game.physics.arcade.enable(this.hero)
    this.hero.body.collideWorldBounds = true
    this.hero.body.bounce.y = 0.2
    this.hero.body.gravity.y = 300
    this.hero.animations.add('left', [0, 1, 2, 3], 10, true)
    this.hero.animations.add('right', [5, 6, 7, 8], 10, true)

    console.log(this.hero);
  }

  //Hero moves
  movesHero(game: Phaser.Game, hero: Phaser.Sprite, cursor: Phaser.CursorKeys, platform: Phaser.Group): void {

      //Checking if the hero collide with platform
      game.physics.arcade.collide(this.hero, platform);

      //Doesn`t move screen if hero too close to the screen border
      let heroScreenPosition = (): Promise<string> => {
        let countHeroPosition = game.camera.x - this.hero.position.x;
        return new Promise((resolve, reject) => {
          if (countHeroPosition >= -250 && game.camera.x !== 0) {
            resolve('stop left');
          } else if (countHeroPosition <= -538 && game.camera.x !== 800) {
            resolve('stop right');
          } else if (countHeroPosition <= -250 && countHeroPosition >= -538) {
            reject('move');
          }
        })
      }

      //Set hero velocity to ZERO
      hero.body.velocity.x = 0;

      //Triggered movings
      if (cursor.left.isDown) {
        heroScreenPosition()
          .then(res => {
            if (res === 'stop right')
              game.camera.x = 1600;
            })
          .catch(rej => {
            game.camera.x -= 4;
          });

        hero.body.velocity.x = -280;
        hero.animations.play('left');
      } else if (cursor.right.isDown) {
        heroScreenPosition()
          .then(res => {
            if (res === 'stop left')
            game.camera.x = 0;
          })
          .catch(rej => {
            game.camera.x += 4;
          });

        hero.body.velocity.x = 280;
        hero.animations.play('right');
      } else {
        hero.animations.stop();
        hero.frame = 4;
      }

      //Allow hero to jump if they are touching the ground
      if (cursor.up.isDown && hero.body.touching.down) {
        hero.body.velocity.y = -350;
      }
  }
}
