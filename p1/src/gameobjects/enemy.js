import Phaser from 'phaser'
import { HealthBar } from './HealthBar';
import { generateTripleRatio, goodRound } from '../utils/mathFunctions';
import { JumpText, TempText } from './TempText';

export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, name, level) {
    super(scene, x, y, texture)
    this.scene.add.existing(this)

    const [a, b, c] = generateTripleRatio();
    const stats = {
      maxHealth: Math.round(level * 5 * (1 + a)),
      attackDamage: Math.round(level * 1 * (1 + b)),
      attackSpeed: Math.round((0.4 + c) * 100) / 100
    }

    this.name = name;
    this.scene = scene;
    // TODO: move into stats?
    this.maxHealth = stats.maxHealth;
    this.health = stats.maxHealth;
    this.level = level;
    this.attackDamage = stats.attackDamage;
    this.attackSpeedModifier = stats.attackSpeed;

    this.attackDelay = 1000
    this.attackTimer = 0
    this.isAlive = true
    
    this.healthBar = new HealthBar(scene, this.x - 50, this.y + 200).setDepth(-2);
    this.levelText = scene.add.text(this.x - 50, this.y + 180, `Lv.${level}`, {
      fontFamily: 'stardust-extrabold',
      fontSize: '20px',
      color: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(-2);
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
    this.healthBar.updateHealth(this.health, this.maxHealth);
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

    // console.log(`${target.name} health: ${target.health}`)
  }
  
  takeDamage(amount) {
    if (!this.isAlive) return
    let realAmount = Math.min(this.health, amount);
    this.health -= amount;

    this.setTint(0xcc0000); // 빨간색 Tint 적용
    this.scene.time.delayedCall(150, () => {
      this.clearTint();    // Tint 제거
    });

    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
    new JumpText(this.scene, this.x + 40, this.y, `${goodRound(amount, 0)}`, '#ff0000');
    this.healthBar.updateHealth(this.health, this.maxHealth);

    return realAmount;
  }

  die() {
    this.isAlive = false;

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

  update() {
    this.healthBar.x = this.x - 50;
    this.levelText.x = this.x + 10;
  }

  destroy() {
    if (this.healthBar) {
      this.healthBar.destroy();
      this.healthBar = null;
    }

    if (this.levelText) {
      this.levelText.destroy();
      this.levelText = null;
    }
    
    super.destroy();
  }
}
