import Phaser from 'phaser';
import { statDict } from '../utils/statDictionary';
import { goodRound } from '../utils/mathFunctions';

export class AllStatUI extends Phaser.GameObjects.Container {
  constructor(scene, x, y, status = {}) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.scene = scene;

    // 배경 이미지
    scene.add.text(x, 660, '전체 능력치', {
        fontFamily: 'stardust-extrabold', fontSize: '24px', color: '#ffffff'
    }).setOrigin(0.5, 0.5);
    this.background = scene.add.image(x, 870, 'allStatBack').setOrigin(0.5, 0.5);
    // this.add(this.background);

    this.statTexts = [];
    for (let i = 0; i < 21; i++) {
      const statText = scene.add.text(1120 + Math.floor(i / 7) * 220, 730 + ((i % 7) * 35), '', {
        fontFamily: 'stardust-extrabold',
        fontSize: '20px',
        color: '#ffffff',
        align: 'left',
      });
      this.statTexts.push(statText);
    }

    this.updateUI(status);
  }

  updateUI(status = {}) {
    // UI 초기화
    this.statTexts.forEach(stat => stat.setText(''));

    if (!status) return;

    Object.entries(status).forEach(([key, value], index) => {
      // this.statTexts[index].setText(`${statDict[key].text}: ${Math.round(value * statDict[key].sizeUnderFloat) / statDict[key].sizeUnderFloat}`);
      this.statTexts[index].setText(`${statDict[key].text}: ${goodRound(value, statDict[key].sizeUnderFloat)}`);
    });
  }
}
