import 'phaser';

import MainScene from './scenes/MainScene';

const config:GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 320,
  height: 480,
  resolution: 1,
  physics: {
    default: 'arcade',
    arcade: {
      maxVelocity: 100,
      debug: 0,
      setBounds: false,
    }
  },
  scene: [
      MainScene
  ]
};

const game = new Phaser.Game(config);