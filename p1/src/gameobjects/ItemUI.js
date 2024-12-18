import Phaser from 'phaser';
import { rarityText, rarityColors, itemTypeIndex } from '../utils/itemFunctions';

export class ItemUI extends Phaser.GameObjects.Container {
  constructor(scene, x, y, itemData = null, onItemSelect = () => {}, disableTint = false) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.scene = scene;
    this.itemData = itemData;
    this.onItemSelect = onItemSelect;

    // 배경 이미지
    this.background = scene.add.image(0, 0, 'itemInfoBack').setOrigin(0).setInteractive();
    this.add(this.background);

    let isPointerDownInside = false;
    this.background.on('pointerdown', () => {
      isPointerDownInside = true;
      if (!disableTint) {
        this.background.setTint(0xaaaaaa);
      }
    });
    this.background.on('pointerup', () => {
      if (isPointerDownInside) this.onItemSelect();
      isPointerDownInside = false;
      this.background.clearTint();
    });
    this.background.on('pointerout', () => {
      isPointerDownInside = false;
      this.background.clearTint();
    });

    // 아이템 이름 (세 번째 띄어쓰기에서 줄바꿈)
    this.itemNameText = scene.add.text(180, 60, '', {
      fontFamily: 'stardust-extrabold',
      fontSize: '28px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 340 }
    }).setOrigin(0.5);

    // 아이콘 영역
    this.itemIcon = scene.add.image(60, 180, '').setScale(1).setVisible(false);

    this.rarityText = scene.add.text(160, 160, '', {
      fontFamily: 'stardust-extrabold',
      fontSize: '22px',
      color: '#ffffff',
      align: 'left',
    });

    this.levelText = scene.add.text(160, 160 + 30, '', {
      fontFamily: 'stardust-extrabold',
      fontSize: '20px',
      color: '#ffffff',
      align: 'left',
    });

    this.statText0 = scene.add.text(160, 160 + 30 * 2, '', {
      fontFamily: 'stardust-extrabold',
      fontSize: '20px',
      color: '#ffffff',
      align: 'left',
    });

    this.statTexts = [];
    for (let i = 1; i <= 5; i++) {
      const statText = scene.add.text(40, 280 + ((i - 1) * 35), '', {
        fontFamily: 'stardust-extrabold',
        fontSize: '20px',
        color: '#ffffff',
        align: 'left',
      });
      this.statTexts.push(statText);
    }

    // 컨테이너에 모든 요소 추가
    this.add([
      this.itemNameText,
      this.itemIcon,
      this.rarityText,
      this.levelText,
      this.statText0,
      ...this.statTexts
    ]);

    this.updateUI(itemData);
  }

  updateUI(itemData = null, customTexture = null, customTextureFrame = null) {
    // UI 초기화
    this.itemNameText.setText('');
    // this.itemIcon.setVisible(false);
    this.itemIcon.setTexture('x');
    this.rarityText.setText('');
    this.levelText.setText('');
    this.statText0.setText('');
    this.statTexts.forEach(stat => stat.setText(''));

    if (!itemData) return;

    this.itemNameText.setText(`${itemData.itemName}${itemData.refined ? `(+${itemData.refined})` : ''}`).setColor(rarityColors[itemData.rarity]);
    this.itemIcon.setTexture('equipment', itemTypeIndex[itemData.itemType]).setVisible(true);
    // TODO: make icon variaty
    if (customTexture) {
      this.itemIcon.setTexture(customTexture, customTextureFrame).setVisible(true);
    }
    this.rarityText.setText(rarityText[itemData.rarity]).setColor(rarityColors[itemData.rarity]);
    this.levelText.setText(`Lv.${itemData.itemLevel} ${itemData.refined ? `(+${itemData.refined})` : ''}`);
    this.statText0.setText(itemData.statTexts[0] || '').setColor(rarityColors[itemData.statRarities[0] || 'common'] || itemData.statRarities[0]);

    for (let i = 1; i <= 5; i++) {
      const statText = itemData.statTexts[i] || '';
      const statRarity = itemData.statRarities[i] || 'common';
      const color = rarityColors[statRarity];
      this.statTexts[i - 1].setText(statText).setColor(color).setVisible(statText !== '');
    }
  }
}
