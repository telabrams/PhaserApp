import 'p2';
import 'pixi';
import 'phaser';

//Game configurations
export const CONFIG = (preload, create, update, render) => {
  return  {
    width: 800,
    height: 600,
    renderer: Phaser.AUTO,
    parent: 'game-screen',
    state: {
      preload: preload,
      create: create,
      update: update,
      render: render
    }
  }
}
