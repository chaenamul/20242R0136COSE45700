export class TempText extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, color = '#ffffff', moveUp = true) {
    super(scene, x, y, text, {
      fontFamily: 'stardust-extrabold',
      fontSize: '22px',
      color: color
    });

    this.scene = scene;
    this.scene.add.existing(this);

    this.setOrigin(0.5, 0.5); // 텍스트 중앙 정렬

    this.moveUp = moveUp;
    this.duration = 1000; // 지속 시간 (0.5초)
    this.startY = y;
    this.endY = moveUp ? y - 50 : y + 50; // 움직일 거리

    // 투명도 애니메이션 및 이동
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 0 }, // 투명도 감소
      y: this.endY, // 위 또는 아래로 이동
      duration: this.duration,
      ease: 'Cubic.Out', // 초반에 빠르게, 끝에 가까워질수록 느리게
      onComplete: () => {
        this.destroy(); // 애니메이션 완료 후 제거
      }
    });
  }
}

export class JumpText extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, color = '#ffffff', moveRight = true) {
    super(scene, x, y, text, {
      fontFamily: 'stardust-extrabold',
      fontSize: '22px',
      color: color
    });

    this.scene = scene;
    this.scene.add.existing(this);

    this.setOrigin(0.5, 0.5); // 텍스트 중앙 정렬

    this.startX = x; // 초기 X 위치
    this.startY = y; // 초기 Y 위치
    this.jumpHeight = 50; // 최대 높이
    this.duration = 800; // 전체 애니메이션 지속 시간 (1초)

    this.scene.tweens.add({
      targets: this,
      x: { from: this.startX, to: this.startX + (moveRight ? 60 : -60) }, // X 위치 고정
      y: { 
        from: this.startY, 
        // to: this.startY - this.jumpHeight, 
        to: this.startY, 
        ease: 'Linear' // 빠르게 올라가고 느리게 멈춤
      },
      alpha: { from: 1, to: 0 }, // 투명도 점진적 감소
      duration: this.duration, // 전체 애니메이션 시간
      ease: 'Linear', // 자연스러운 위-아래 이동
      onUpdate: (tween, target) => {
        // 내려오면서 포물선 효과를 주기 위해 Y 좌표를 다시 조정
        const progress = tween.progress;
        target.y = this.startY - this.jumpHeight * (1 - Math.pow(2 * progress - 1, 2));
      },
      onComplete: () => {
        this.destroy(); // 애니메이션 종료 후 제거
      }
    });
  }
}
