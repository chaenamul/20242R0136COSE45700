import Phaser from 'phaser'
import { HealthBar } from './HealthBar';
import { ExpBar } from './ExpBar';
import { JumpText, TempText } from './TempText';
import { goodRound } from '../utils/mathFunctions';

export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    this.scene.add.existing(this)

    this.name = "player";
    this.scene = scene;

    this.status = {
      maxHealth: 25,
      attackDamage: 0,
      attackSpeed: 1,
    }
    this.health = 25;
    this.level = 1;
    this.exp = 0;
    this.maxExp = 3;
    this.gold = 0;

    this.isFirstAttack = false;
    this.secondDelay = 1000;
    this.secondTimer = 0;

    this.attackDelay = 1000;
    this.attackTimer = 0;
    this.isAlive = true;
    
    this.healthBar = new HealthBar(scene, this.x - 70, this.y + 200);
    this.expBar = new ExpBar(scene, this.x - 70, this.y + 230);
    this.levelText = scene.add.text(this.x - 10, this.y + 180, `Lv.${this.level}`, {
      fontFamily: 'stardust-extrabold',
      fontSize: '20px',
      color: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);
  
    this.equipments = {
      sword: {
        itemType: 'sword',
        itemName: '검',
        rarity: 'common',
        itemLevel: 1,
        refined: 0,
        mainValue: 5,
        statTexts: ['공격력 +5'],
        statRarities: ['common'],
        options: {}
      },
      helmet: {
        itemType: 'helmet',
        itemName: '투구',
        rarity: 'common',
        itemLevel: 1,
        refined: 0,
        mainValue: 5,
        statTexts: ['최대 HP +5'],
        statRarities: ['common'],
        options: {}
      },
      breastplate: {
        itemType: 'breastplate',
        itemName: '흉갑',
        rarity: 'common',
        itemLevel: 1,
        refined: 0,
        mainValue: 5,
        statTexts: ['최대 HP +5'],
        statRarities: ['common'],
        options: {}
      },
      leggings: {
        itemType: 'leggings',
        itemName: '레깅스',
        rarity: 'common',
        itemLevel: 1,
        refined: 0,
        mainValue: 5,
        statTexts: ['최대 HP +5'],
        statRarities: ['common'],
        options: {}
      },
      gloves: {
        itemType: 'gloves',
        itemName: '장갑',
        rarity: 'common',
        itemLevel: 1,
        refined: 0,
        mainValue: 5,
        statTexts: ['최대 HP +5'],
        statRarities: ['common'],
        options: {}
      },
      boots: {
        itemType: 'boots',
        itemName: '부츠',
        rarity: 'common',
        itemLevel: 1,
        refined: 0,
        mainValue: 5,
        statTexts: ['최대 HP +5'],
        statRarities: ['common'],
        options: {}
      }
    };
  }

  initialize() {
    this.setPlayerStat();
    this.play('hero_idle');
    this.setAttackDelay();
    this.move();
    this.expBar.updateExpBar(this.exp, this.maxExp);
  }

  setPlayerStat() {
    // 초기화
    const healthRatio = this.health / this.status.maxHealth;
    this.status = {
      maxHealth: 0,
      attackDamage: 0,
      attackSpeed: 1,
    };
  
    Object.values(this.equipments).forEach(equipment => {
      if (equipment.itemType === 'sword') {
        this.status['attackDamage'] += equipment.mainValue;
      } else {
        this.status['maxHealth'] += equipment.mainValue;
      }
  
      for (const [key, value] of Object.entries(equipment.options)) {
        if (this.status[key] === undefined) {
          this.status[key] = 0;
        }
        this.status[key] += value;
      }
    });
    console.log(this.status);
  
    // 체력 상태 업데이트
    this.setHealth(Math.round(this.status.maxHealth * healthRatio));
    this.setAttackDelay();
  }

  changeItem(item) {
    this.equipments[item.itemType] = item;
    this.setPlayerStat();
  }

  setAttackDelay() {
    if (this.status.attackSpeed == 0) return 100;
    this.attackDelay = 1000 / this.status.attackSpeed;
  }

  move() {
    this.play('hero_run');
  }

  attack(target) {
    if (!this.isAlive) return;
    let amount = this.status.attackDamage;

    if (this.status.battleCry) {
      if (this.isFirstAttack) amount *= (1 + this.status.battleCry / 100);
    }

    let criticalMultiplier = 2;
    if (this.status.criticalDamage) {
      criticalMultiplier *= (1 + this.status.criticalDamage / 100);
    }

    if (this.status.criticalChance) {
      if (this.status.criticalChance / 100 < Math.random()){
        amount = amount * criticalMultiplier;
      }
    }

    this.play('hero_attack')
    this.once('animationcomplete-hero_attack', () => this.play('hero_idle'));
    const damageDealt = target.takeDamage(amount);
    this.isFirstAttack = false;
    if (this.status.leech) {
      this.changeHealth(damageDealt * this.status.leech / 100);
    }
  }
  
  takeDamage(amount) {
    if (!this.isAlive) return 0;

    if (this.status.dodge) {
      if (this.status.dodge / 100 < Math.random()) {
        new JumpText(this.scene, this.x - 40, this.y + 60, `회피`, '#ffffff', false);
      }
    }

    let decreasedAmount = amount;
    if (this.status.flatArmor) {
      decreasedAmount = Math.max(decreasedAmount - this.status.flatArmor, 0);
    }
    
    if (decreasedAmount > 0) {
      this.setTint(0xcc0000); // 빨간색 Tint 적용
      this.scene.time.delayedCall(150, () => {
        this.clearTint();    // Tint 제거
      });  
    }
    this.changeHealth(-decreasedAmount);
    // return amount;
  }

  changeHealth(amount) {
    this.health = Math.max(Math.min(this.health + amount, this.status.maxHealth), 0);
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
    this.healthBar.updateHealth(this.health, this.status.maxHealth);
    new JumpText(this.scene, this.x - 40, this.y + 60, `${amount > 0 ? goodRound(amount, 2) : goodRound(-amount, 2)}`, amount > 0 ? '#00ff00' : amount = 0 ? '#ffffff' : '#ff0000', false);
  }

  setHealth(amount) {
    this.health = Math.max(Math.min(amount, this.status.maxHealth), 0);
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
    this.healthBar.updateHealth(this.health, this.status.maxHealth);
  }

  earnExp(amount) {
    this.exp += amount;
    if (this.exp >= this.maxExp) {
      // Level Up
      this.level++;
      this.levelText.setText(`Lv.${this.level}`);
      new TempText(this.scene, this.x, this.y, `Lv UP`, '#00ff00');
      this.exp -= this.maxExp;
      this.maxExp = Math.floor(1.3 ** (this.level - 1) * 3 + 2 * this.level);
      this.setHealth(this.status.maxHealth);
      this.scene.changeDropRate(1);
    }
    this.expBar.updateExpBar(this.exp, this.maxExp);
  }

  die() {
    this.isAlive = false
    this.play(`hero_death`);
    this.scene.handlePlayerDeath();
  }

  update(time, delta) {
    if (this.status.regeneration) {
      this.secondTimer += delta;
      if (this.secondTimer >= this.secondDelay) {
        this.changeHealth(this.status.regeneration);
        this.secondTimer = 0;
      }
    }
  }
  
  destroy() {
    if (this.healthBar) {
      this.healthBar.destroy();
      this.healthBar = null;
    }

    super.destroy();
  }
}
