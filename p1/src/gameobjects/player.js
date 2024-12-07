import Phaser from 'phaser'

export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)

    // Add the sprite to the scene
    scene.add.existing(this)

    this.scene = scene
    this.hp = hp
    this.attackDelay = 1000
    this.attackDamage = 10
    this.isAlive = true
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

    // Notify the scene that this enemy died
    this.scene.handleEnemyDeath(this)

    // Fade out effect
    this.scene.tweens.add({
      targets: this,
      alpha: 0, // Fade out to transparency
      duration: 500, // 0.5 seconds
      ease: 'Linear',
      onComplete: () => {
        this.destroy() // Remove the enemy sprite
      }
    })
  }

  attack(target) {
    if (!this.isAlive) return

    // Deal damage to the target
    target.takeDamage(this.power)

    // Optionally, trigger an attack animation or effect
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 100,
      yoyo: true,
      ease: 'Power1'
    })

    console.log(`Enemy attacks! Target HP: ${target.hp}`)
  }

  update() {
    if (this.isAlive) {
      // Add behavior for the enemy if needed
    }
  }
}
