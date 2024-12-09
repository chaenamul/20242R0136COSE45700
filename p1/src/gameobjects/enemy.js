import Phaser from 'phaser'

export class Enemy extends Phaser.GameObjects.Sprite {    
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)

    // Add the sprite to the scene
    this.scene.add.existing(this)

    this.name = "bee";
    this.scene = scene;
    this.hp = 30;
    this.attackDamage = 10
    this.attackSpeedModifier = 1

    this.attackDelay = 1200
    this.attackTimer = 0
    this.isAlive = true
  }

  initialize() {
    this.play('bee_idle');
    // this.setAttackDelay();
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

    this.play('bee_attack')
    this.once('animationcomplete-bee_attack', () => this.play('bee_idle'));
    target.takeDamage(this.attackDamage)

    console.log(`${target.name} HP: ${target.hp}`)
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
      duration: 500, // 0.5 seconds
      ease: 'Linear',
      onStart: () => {
        // this.play('bee_death')
      },
      onComplete: () => {
        this.destroy() // Remove the enemy sprite
      }
    })

    // Notify the scene that this enemy died
    this.scene.handleEnemyDeath(this)
  }

  update(time, delta) {
  }
}
