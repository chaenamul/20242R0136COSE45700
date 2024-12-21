import { Scene } from 'phaser';
import { Enemy } from '../gameobjects/Enemy';
import { Player } from '../gameobjects/Player';
import { ItemUI } from '../gameobjects/ItemUI';
import { DropRateUI } from '../gameobjects/DropRateUI';
import { createItemData, indexToItemType, indexToRarity, rarityColors, rarityIndex, rarityText, refineItem } from '../utils/itemFunctions';
import { Deque } from '../utils/deque';
import { AllStatUI } from '../gameobjects/AllStatUI';
import { TempText } from '../gameobjects/TempText';
import { autoItems, potions } from '../utils/itemPreset';
import { goodRound } from '../utils/mathFunctions';

export class Battle extends Scene
{
    constructor ()
    {
        super('Battle');
    }

    create () {
        const centerX = 960;
        const centerY = 540;

        this.isBattle = false;
        this.enemy = null;
        this.enemyKilled = 0;
        this.gold = 0;

        this.add.image(centerX / 2, centerY, 'background').setDepth(-9);
        this.add.image(centerX * 3 / 2, centerY, 'inventory').setDepth(-1);
        
        this.player = new Player(this, 240, 120, 'hero_idle').setDepth(-2);
        this.player.initialize(); // TODO: get values from register(다회차 요소)
        this.spawnEnemy();

        this.pauseButton = this.add.image(centerX - 40, 343, 'slot').setScale(0.5).setInteractive();
        this.pauseIcon = this.add.image(centerX - 40, 343, 'pause', 0).setScale(0.5);
        this.isPaused = false;
        this.pauseButton.on('pointerdown', () => {
            this.isPaused = !this.isPaused;
            this.pauseIcon.setTexture('pause', this.isPaused + 0);
        })

        this.itemQueue = new Deque();
        this.nextItems = [];
        this.autoEnabled = [false, false, false, false, false];

        let defaultDropRate = {
            common: 1,
            uncommon: 0.1,
            rare: 0.01,
            epic: 0.001,
            mythic: 0.0001
        }
        this.dropRate = defaultDropRate;
        this.dropRateUI = new DropRateUI(this, 600, 990, this.dropRate);

        this.leftItem = null;
        this.rightItem = null;
        this.selectedItem = null;

        this.itemQueueLengthText = this.add.text(120, 420, '남은 장비: 0', {
            fontFamily: 'stardust-bold', fontSize: '28px', color: '#ffffff'
        }).setOrigin(0.5, 0.5);
        this.add.text(240 + 180, 420, '획득한 장비 / 클릭하여 교체', {
            fontFamily: 'stardust-bold', fontSize: '28px', color: '#ffffff'
        }).setOrigin(0.5, 0.5);
        this.add.text(600 + 180, 420, '내 장비 / 클릭하여 유지', {
            fontFamily: 'stardust-bold', fontSize: '28px', color: '#ffffff'
        }).setOrigin(0.5, 0.5);
        this.add.text(120, 990, ' 화살표를 눌러\n등급별 확률 교환', {
            fontFamily: 'stardust-bold', fontSize: '28px', color: '#ffffff'
        }).setOrigin(0.5, 0.5);
        this.leftItemUI = new ItemUI(
            this, 240, 450, null,
            () => this.handleItemSelect(true)
        );
        this.rightItemUI = new ItemUI(
            this, 600, 450, null,
            () => this.handleItemSelect(false)
        );
        this.selectedItemUI = new ItemUI(
            this, centerX + 120, 150, null, () => {}, true
        ).setDepth(2);

        this.add.text(centerX + 180 + 480, 435, '보유 골드', {
            fontFamily: 'stardust-extrabold', fontSize: '24px', color: '#ffffff'
        }).setOrigin(0.5, 0.5);
        this.goldText = this.add.text(centerX + 180 + 480, 570 - 100, '0 G', {
            fontFamily: 'stardust-extrabold', fontSize: '24px', color: '#ffff00'
        }).setOrigin(0.5, 0.5);
        this.confirmButton = this.add.image(centerX + 180 + 480, 570, 'confirmBack').setInteractive();
        this.confirmText1 = this.add.text(centerX + 180 + 480, 555, '', {
            fontFamily: 'stardust-extrabold', fontSize: '22px', color: '#ffffff'
        }).setOrigin(0.5, 0.5);
        this.confirmText2 = this.add.text(centerX + 180 + 480, 585, '', {
            fontFamily: 'stardust-extrabold', fontSize: '22px', color: '#ffff00'
        }).setOrigin(0.5, 0.5);
        let isPointerDownInside = false;
        this.confirmButton.on('pointerdown', () => {
            isPointerDownInside = true;
            this.confirmButton.setTint(0xaaaaaa);
        });
        this.confirmButton.on('pointerup', () => {
            if (isPointerDownInside) {
                this.handleConfirm(this.selectedItem);
            };
            isPointerDownInside = false;
            this.confirmButton.clearTint();
        });
        this.confirmButton.on('pointerout', () => {
            isPointerDownInside = false;
            this.confirmButton.clearTint();
        });

        const iconGroup = this.add.group();
        for (let i = 0; i < 6; i++) {
            const icon = this.add.image(centerX + 180 + (120 * i), 90, 'slot', 0).setInteractive();
            this.add.image(centerX + 180 + (120 * i), 90, 'equipment', i);
            const selecteditemType = indexToItemType[i];
            icon.on('pointerdown', () => {
                iconGroup.children.iterate((child) => {
                    child.clearTint();
                });
                icon.setTint(0xaaaaaa);
                this.selectedItem = this.player.equipments[selecteditemType];
                this.selectedItemUI.updateUI(this.selectedItem);
                const cost = 2 ** (this.selectedItem.refined) * 10 * (2 ** rarityIndex[this.selectedItem.rarity]);
                this.confirmText1.setText(`+${this.selectedItem.refined} > +${this.selectedItem.refined + 1} 강화`);
                this.confirmText2.setText(`${cost} G`);
            })
            iconGroup.add(icon);
        }
        for (let i = 0; i < 3; i++) {
            const icon = this.add.image(centerX + 180 + (120 * (i + 3)), 210, 'slot', 0).setInteractive();
            this.add.image(centerX + 180 + (120 * (i + 3)), 210, 'potion', i);
            icon.on('pointerdown', () => {
                iconGroup.children.iterate((child) => {
                    child.clearTint();
                });
                icon.setTint(0xaaaaaa);
                this.selectedItem = potions[i];
                this.selectedItemUI.updateUI(this.selectedItem, 'potion', i);
                this.confirmText1.setText(`구매 및 사용`);
                this.confirmText2.setText(`${this.selectedItem.itemLevel} G`);
            })
            iconGroup.add(icon);
        }
        for (let i = 0; i < 3; i++) {
            const icon = this.add.image(centerX + 180 + (120 * (i + 3)), 330, 'slot', 0).setInteractive();
            this.add.text(centerX + 180 + (120 * (i + 3)), 315, rarityText[indexToRarity[i]], {
                fontFamily: 'stardust-bold', fontSize: '24px', color: rarityColors[indexToRarity[i]]
            }).setOrigin(0.5, 0.5);
            this.add.text(centerX + 180 + (120 * (i + 3)), 345, '자동 판매', {
                fontFamily: 'stardust-bold', fontSize: '24px', color: '#ffffff'
            }).setOrigin(0.5, 0.5);
            icon.on('pointerdown', () => {
                iconGroup.children.iterate((child) => {
                    child.clearTint();
                });
                icon.setTint(0xaaaaaa);
                this.selectedItem = autoItems[i];
                this.selectedItemUI.updateUI(this.selectedItem, 'auto', i);
                this.confirmText1.setText(`구매 및 적용`);
                this.confirmText2.setText(`${this.selectedItem.itemLevel} G`);
            })
            iconGroup.add(icon);
        }

        const text1 = this.add.text(360, 1030, '', {
            fontFamily: 'stardust-extrabold', fontSize: '22px', color: '#ff0000'
        }).setOrigin(0.5, 0.5);
        const text2 = this.add.text(360 + 120, 1030, '', {
            fontFamily: 'stardust-extrabold', fontSize: '22px', color: '#00ff00'
        }).setOrigin(0.5, 0.5);
        for (let i = 0; i < 4; i++) {
            const icon = this.add.image(420 + 120 * i, 990, 'pause', 1).setScale(0.25).setInteractive();
                icon.on('pointerover', () => {
                icon.setTint(0xaaaaaa);
                text1.x = 360 + 120 * i;
                text1.setText(`-${10 ** (2 - i)}%`).setVisible(true);
                text2.x = 360 + 120 * (i + 1);
                text2.setText(`+${10 ** (1 - i)}%`).setVisible(true);
            })
            icon.on('pointerout', () => {
                icon.clearTint();
                text1.setVisible(false);
                text2.setVisible(false);
            })
            icon.on('pointerdown', () => {
                this.elevateDropRate(i);
            })
        }

        this.allStat = new AllStatUI(this, centerX * 3 / 2, 650);
        this.allStat.updateUI(this.player.status);
    }

    update (time, delta) {
        if (!this.isPaused) {
            if (this.enemy) {
                this.enemy.update();
            }
            if (this.player) {
                this.player.update(time, delta);
            }
    
            if (this.isBattle) {
                this.player.attackTimer += delta;
                this.enemy.attackTimer += delta;
                if (this.player.attackTimer >= this.player.attackDelay) {
                    this.player.attack(this.enemy);
                    this.player.attackTimer = 0;
                }
                if (this.enemy.attackTimer >= this.enemy.attackDelay) {
                    this.enemy.attack(this.player);
                    this.enemy.attackTimer = 0;
                }
            }
        }
    }

    spawnEnemy() {
        let enemyLevel = Math.ceil((this.enemyKilled + 1) / 3);
        if (this.enemyKilled % 10 == 9) enemyLevel = enemyLevel + 5;
        this.enemy = new Enemy(this, 720 + 480, 120, 'bee_idle', 'bee', enemyLevel).setDepth(-2);
        this.enemy.initialize();
    }

    startBattle() {
        this.isBattle = true;
        this.player.isFirstAttack = true;
        this.player.attackTimer = this.player.attackDelay;
        this.enemy.attackTimer = this.enemy.attackDelay / 2;
    }

    handleEnemyDeath() {
        this.isBattle = false;
        this.enemyKilled++;
        
        let killExp = this.enemy.level;
        if (this.player.status.expBonus) {
            killExp += this.player.status.expBonus;
        }
        this.player.earnExp(killExp);

        let killGold = this.enemy.level;
        if (this.player.status.goldBonus) {
            killGold += this.player.status.goldBonus;
        }
        this.earnGold(killGold);

        new TempText(this, 720, 150, `+${killGold} G`, '#ffff00');

        this.spawnEnemy();
        // TODO: play move even if mob dies by another issue, not attack
        this.player.once('animationcomplete-hero_attack', () => this.player.move());
        this.handleItemDrop();
    }

    handlePlayerDeath() {
        this.isBattle = false;
        this.gameOverText1 = this.add.text(480, 200, 'Game Over', {
            fontFamily: 'stardust-extrabold', fontSize: '60px', color: '#ffffff'
        }).setOrigin(0.5, 0.5).setInteractive();
        this.gameOverText2 = this.add.text(480, 250, 'Click Here to Restart', {
            fontFamily: 'stardust-extrabold', fontSize: '30px', color: '#ffffff'
        }).setOrigin(0.5, 0.5).setInteractive();
        this.gameOverText1.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
        this.gameOverText2.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }

    handleItemDrop() {
        const rarities = Object.keys(this.dropRate);
      
        rarities.forEach(rarity => {
          const rate = this.dropRate[rarity];
          const guaranteedDrops = Math.floor(rate);
          const additionalChance = rate % 1;
          
          for (let i = 0; i < guaranteedDrops; i++) {
            this.itemQueue.enqueue({ rarity: rarity, level: this.player.level });
          }
          if (Math.random() < additionalChance) {
            this.itemQueue.enqueue({ rarity: rarity, level: this.player.level });
          }
        });

        this.itemQueueLengthText.setText(`남은 장비: ${this.itemQueue.length()}`);
        if (!this.leftItem) this.updateItem();
    }

    handleItemSelect(change) {
        if (!this.leftItem || !this.player.isAlive) return;
        if (change) {
            this.player.changeItem(this.leftItem);
            if (this.selectedItem) {
                if (this.leftItem.itemType === this.selectedItem.itemType) {
                    this.selectedItem = this.leftItem;
                    this.selectedItemUI.updateUI(this.leftItem);
                    const cost = 2 ** (this.selectedItem.refined) * 10 * (2 ** rarityIndex[this.selectedItem.rarity]);
                    this.confirmText1.setText(`+${this.selectedItem.refined} > +${this.selectedItem.refined + 1} 강화`);
                    this.confirmText2.setText(`${cost} G`);
                }
            }
            this.allStat.updateUI(this.player.status);
        } else {
            let sellGold = 10 ** rarityIndex[this.leftItem.rarity];
            this.earnGold(sellGold);
            new TempText(this, 240 + 180, 500, `+${sellGold} G`, '#ffff00');
        }
        this.updateItem();
    }

    updateItem() {
        if (!this.itemQueue.isEmpty()) {
            const { rarity, level } = this.itemQueue.dequeue();
            this.itemQueueLengthText.setText(`남은 장비: ${this.itemQueue.length()}`);
            // this.nextItems = this.itemQueue.showcase(4);
            // this.updateNextItems();
            if (this.autoEnabled[rarityIndex[rarity]]) {
                let sellGold = 10 ** rarityIndex[rarity];
                this.earnGold(sellGold);
                new TempText(this, 240 + 180, 500, `+${sellGold} G`, '#ffff00');
                return this.updateItem();
            }
            this.leftItem = createItemData(rarity, level);
        } else {
            this.leftItem = null;
        }
        
        if (this.leftItem) {
            this.rightItem = this.player.equipments[this.leftItem.itemType] || null;
        } else {
            this.rightItem = null;
        }
        
        this.leftItemUI.updateUI(this.leftItem);
        this.rightItemUI.updateUI(this.rightItem);
    }

    // updateNextItems() {

    // }

    handleConfirm(item) {
        if (!item || !this.player.isAlive) return;
        if (item.itemType === 'potion') {
            const cost = item.itemLevel;
            if (this.gold >= cost) {
                this.earnGold(-cost);
                new TempText(this, 1620, 560, `-${cost} G`, '#ff4444');
                this.player.changeHealth(item.mainValue);
            } else {
                new TempText(this, 1620, 560, `골드 부족`, '#ff4444');
            }
        } else if (item.itemType === 'auto') {
            const cost = item.itemLevel;
            // const cost = 0;
            if (this.autoEnabled[rarityIndex[item.rarity]]) {
                new TempText(this, 1620, 560, `이미 구매했어요`, '#ff4444');
                return;
            };
            if (this.gold >= cost) {
                this.earnGold(-cost);
                new TempText(this, 1620, 560, `-${cost} G`, '#ff4444');
                this.autoEnabled[rarityIndex[item.rarity]] = true;
                this.changeDropRate(0);
            } else {
                new TempText(this, 1620, 560, `골드 부족`, '#ff4444');
            }
        } else {
            const cost = 2 ** (item.refined) * 10 * (2 ** rarityIndex[item.rarity]);
            // const cost = 0;
            if (this.gold >= cost) {
                this.earnGold(-cost);
                new TempText(this, 1620, 560, `-${cost} G`, '#ff4444');
                this.selectedItem = refineItem(item);
                this.player.changeItem(this.selectedItem);
                this.selectedItemUI.updateUI(this.selectedItem);
                this.allStat.updateUI(this.player.status);
                this.confirmText1.setText(`+${this.selectedItem.refined} > +${this.selectedItem.refined + 1} 강화`);
                this.confirmText2.setText(`${2 ** (this.selectedItem.refined) * 10 * (2 ** rarityIndex[this.selectedItem.rarity])} G`);
            } else {
                new TempText(this, 1620, 560, `골드 부족`, '#ff4444');
            }
        }
    }

    earnGold(amount) {
        this.gold += amount;
        this.goldText.setText(`${this.gold} G`);
    }

    changeDropRate(amount) {
        for (let i = 0; i < 5; i++) {
            this.dropRate[indexToRarity[i]] = goodRound((this.dropRate[indexToRarity[i]] + (amount) / (10 ** i)), i);
            if (this.autoEnabled[i]) this.elevateDropRate(i, goodRound((this.dropRate[indexToRarity[i]]) * (10 ** i), i));
        }
        this.dropRateUI.updateUI(this.dropRate);
    }

    elevateDropRate(i, n = 1) {
        if (i >= 4) return;
        if (this.dropRate[indexToRarity[i]] < 1 / (10 ** i)) return;
        this.dropRate[indexToRarity[i]] = goodRound(this.dropRate[indexToRarity[i]] - (1 / (10 ** i)) * n, i);
        this.dropRate[indexToRarity[i + 1]] = goodRound(this.dropRate[indexToRarity[i + 1]] + (1 / (10 ** (i + 1))) * n, i + 1);
        this.dropRateUI.updateUI(this.dropRate);
    }
}
