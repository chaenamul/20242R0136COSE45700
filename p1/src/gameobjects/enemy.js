import Phaser from 'phaser'

export class Enemy extends Phaser.GameObjects.Sprite {    
  constructor(scene, x, y, texture, name, stats = {
    hp: 30,
    dmg: 10,
    speed: 1.2
  }) {
    super(scene, x, y, texture)

    // Add the sprite to the scene
    this.scene.add.existing(this)

    this.name = name;
    this.scene = scene;
    this.hp = stats.hp;
    this.attackDamage = stats.dmg;
    this.attackSpeedModifier = stats.speed;

    this.attackDelay = 1000
    this.attackTimer = 0
    this.isAlive = true
  }

  initialize() {
    this.play(`${this.name}_idle`);
    this.setAttackDelay();
    this.scene.tweens.add({
      targets: this,
      x: 720, // Target X position
      y: 180, // Target Y position
      duration: 1000, // Duration in milliseconds
      ease: 'Linear', // Movement easing
      onComplete: () => {
        this.scene.startBattle();
      }
    })
  }

  setAttackDelay() {
    if (this.attackSpeedModifier == 0) return 100;
    this.attackDelay = 1000 / this.attackSpeedModifier;
  }

  attack(target) {
    if (!this.isAlive) return

    this.play(`${this.name}_attack`)
    this.once(`animationcomplete-${this.name}_attack`, () => this.play(`${this.name}_idle`));
    target.takeDamage(this.attackDamage)

    // console.log(`${target.name} HP: ${target.hp}`)
  }
  
  takeDamage(amount) {
    if (!this.isAlive) return
    this.hp -= amount

    if (this.hp <= 0) {
      this.hp = 0
      this.die()
    }
  }

  die() {
    this.isAlive = false

    // Fade out effect
    this.scene.tweens.add({
      targets: this,
      alpha: 0, // Fade out to transparency
      duration: 400,
      ease: 'Linear',
      onStart: () => {
        this.play(`${this.name}_death`)
      },
      onComplete: () => {
        this.destroy();
      }
    })

    // Notify the scene that this enemy died
    this.scene.handleEnemyDeath(this)
  }

  update(time, delta) {
  }
}
