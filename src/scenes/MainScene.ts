const WIDTH = 320;
const HEIGHT = 480;
const GRAVITY = 500;
const JUMP_VELOCITY = -200;

class MainScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  pipe: Phaser.Physics.Arcade.Sprite;
  pipes: Phaser.GameObjects.Group;
  cursors: CursorKeys;
  loop: Phaser.Time.TimerEvent;
  overlap: Phaser.Physics.Arcade.Collider;
  score: number;
  scoreLabel: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'MainScene',
    });
  }

  preload() {
    this.load.image('bird', 'assets/bird.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('pipe', 'assets/pipe.png');
  }

  create() {
    // Add background image
    this.add.image(WIDTH, HEIGHT, 'sky');
    
    // Create Player
    this.player = this.physics.add.sprite(WIDTH/4, HEIGHT/2, 'bird').setGravityY(GRAVITY);
    
    // Initiate Keyboard Event
    this.cursors = this.input.keyboard.createCursorKeys();

    // Initiate Pipe
    this.pipes = this.add.group();

    // Initiate Score
    this.score = -1;
    this.scoreLabel = this.add.text(20,20, this.score.toString(), { font: '30px Arial', fill: '#ffffff'});
    this.addRow();

    // Initiate loop
    this.loop = this.time.addEvent({ 
      delay: 2000, 
      callback: 
      this.addRow, 
      callbackScope: this, 
      loop: true
    });

    // Create Collision Event
    this.overlap = this.physics.add.overlap(
      this.player,
      this.pipes.getChildren(),
      this.restart,
      null,
      this
    )
  }

  update() {
    // Jump Action
    if (this.cursors.space.isDown || this.input.activePointer.isDown) {
      this.jump();
    }

    // If player is above or below the screen, restart
    if (this.player.y < 0 || this.player.y > HEIGHT ) {
      this.restart();
    }
  }

  jump() {
    this.player.setVelocityY(JUMP_VELOCITY);
  }

  addPipe (x: number, y: number) {
    this.pipe = this.physics.add.sprite(x,y,'pipe').setVelocityX(-100);
    this.pipes.add(this.pipe);
  }

  addRow () {
    const hole = Math.floor(Math.random() * 6) + 1;
    this.score += 1;
    this.updateScore(this.score.toString());
    for (var i = 0; i < 10; i++) {
      if (i != hole && i != hole + 1 && i != hole + 2) {
        this.addPipe(WIDTH,i * 50 + 20);
      }
    }
  }

  restart() {
    this.scene.restart();
  }
  updateScore(score:string) {
    this.scoreLabel.setText(score);
  }
}

export default MainScene;