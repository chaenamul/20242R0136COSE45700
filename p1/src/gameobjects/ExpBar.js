export class ExpBar extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y)

    this.width = 120;
    this.height = 24;

    this.backgroundBar = scene.add.graphics();
    this.backgroundBar.fillStyle(0x202020);
    this.backgroundBar.fillRect(0, 0, this.width, this.height);

    this.foregroundBar = scene.add.graphics();
    this.foregroundBar.fillStyle(0x33ee33);
    this.foregroundBar.fillRect(0, 0, this.width, this.height);

    // 체력 텍스트
    this.expText = scene.add.text(this.width / 2, this.height / 2, '', {
      fontFamily: 'stardust-extrabold',
      fontSize: '20px',
      color: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    // 배경, 체력바, 텍스트를 컨테이너에 추가
    this.add(this.backgroundBar);
    this.add(this.foregroundBar);
    this.add(this.expText);

    // 컨테이너를 Scene에 추가
    scene.add.existing(this);
  }

  // 체력 비율과 텍스트 업데이트
  updateExpBar(currentExp, maxExp) {
    const expRatio = Phaser.Math.Clamp(currentExp / maxExp, 0, 1)

    // 1. 체력바 크기 업데이트
    this.foregroundBar.clear();
    this.foregroundBar.fillStyle(0x33ee33);
    this.foregroundBar.fillRect(0, 0, this.width * expRatio, this.height);

    this.expText.setText(`${Math.ceil(currentExp)}/${maxExp}`);
  }
}
