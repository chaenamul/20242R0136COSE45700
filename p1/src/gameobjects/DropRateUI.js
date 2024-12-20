import { rarityText, rarityColors } from '../utils/itemFunctions';

export class DropRateUI extends Phaser.GameObjects.Container {
  constructor(scene, x, y, dropRate) {
    super(scene, x, y);

    this.scene = scene;
    this.dropRate = dropRate;
    scene.add.image(x, y, 'dropRateBack');

    // 드랍률 텍스트를 저장하는 객체
    this.dropRateTexts = {};

    // 드랍률 UI 생성
    this.createDropRateUI();
    scene.add.existing(this);
  }

  createDropRateUI() {
    const startX = -240; // 시작 X 좌표 (왼쪽 기준)
    const startY = -10; // 시작 Y 좌표
    const spacingX = 120; // 가로 간격
    const spacingY = 25; // 라벨과 퍼센트 값 사이의 간격
    let index = 0;

    // 드랍률 UI 생성
    Object.keys(this.dropRate).forEach((rarity) => {
      const rate = this.dropRate[rarity] * 100; // 퍼센트 변환

      // 등급 라벨 텍스트
      const labelText = this.scene.add.text(
        startX + index * spacingX, // X 좌표는 등급 간 간격만큼 이동
        startY,
        rarityText[rarity],
        { fontFamily: 'stardust-extrabold', fontSize: '22px', color: rarityColors[rarity] }
      ).setOrigin(0.5, 0.5); // 중앙 정렬

      // 퍼센트 텍스트
      const rateText = this.scene.add.text(
        startX + index * spacingX, // 동일한 X 좌표
        startY + spacingY, // 라벨 아래에 위치
        `${this.formatRate(rate)}%`,
        { fontFamily: 'stardust-extrabold', fontSize: '20px', color: '#ffffff' }
      ).setOrigin(0.5, 0.5); // 중앙 정렬

      // 컨테이너에 추가
      this.add(labelText);
      this.add(rateText);

      // 퍼센트 텍스트 참조 저장
      this.dropRateTexts[rarity] = rateText;

      index++;
    });
  }

  formatRate(rate) {
    // 소수점이 있는 경우만 소수점 두 자리까지 표시
    if (Number.isInteger(rate)) {
      return rate.toFixed(0);
    } else if (rate * 10 % 1 === 0) {
      return rate.toFixed(1);
    } else {
      return rate.toFixed(2);
    }
  }

  updateUI(newDropRate) {
    this.dropRate = newDropRate;

    // 드랍률 텍스트 업데이트
    Object.keys(this.dropRate).forEach((rarity) => {
      const rate = this.dropRate[rarity] * 100; // 퍼센트 변환
      this.dropRateTexts[rarity].setText(`${this.formatRate(rate)}%`);
    });
  }
}
