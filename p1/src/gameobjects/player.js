import Phaser from 'phaser'

export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)

    // Add the sprite to the scene
    this.scene.add.existing(this)

    this.name = "player"
    this.scene = scene
    this.hp = hp = 100
    this.attackDamage = 10
    this.attackSpeedModifier = 1

    this.attackDelay = 1000
    this.attackTimer = 0
    this.isAlive = true
  }

  initialize() {
    this.play('hero_idle');
    this.setAttackDelay();
  }

  // setAttackDelay() {
  //   if (this.attackSpeedModifier == 0) return 100;
  //   this.attackDelay = 1000 / this.attackSpeedModifier;
  // }

  // attack(target) {
  //   if (!this.isAlive) return

  //   this.play('hero_attack')
  //   target.takeDamage(this.attackDamage)

  //   console.log(`${target.name} HP: ${target.hp}`)
  // }
  
  // takeDamage(amount) {
  //   if (!this.isAlive) return
  //   this.hp -= amount

  //   if (this.hp <= 0) {
  //     this.hp = 0
  //     this.die()
  //   }
  // }

  // die() {
  //   this.isAlive = false

  //   // Fade out effect
  //   this.scene.tweens.add({
  //     targets: this,
  //     alpha: 0, // Fade out to transparency
  //     duration: 500, // 0.5 seconds
  //     ease: 'Linear',
  //     onComplete: () => {
  //       this.destroy() // Remove the enemy sprite
  //     }
  //   })

  //   this.scene.handlePlayerDeath();
  // }

  // update() {
  
  // }
}
