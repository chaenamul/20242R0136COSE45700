import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Battle extends Scene {
  constructor() {
    super('Battle'); // 씬 이름 등록
    this.player = null; // 플레이어 정보
    this.monster = null; // 몬스터 정보
  }

  create() {
    // 배경 이미지 추가
    this.add.image(512, 384, 'battleBackground');

    // 플레이어와 몬스터 초기화
    this.player = this.createCharacter('Player', 100, 1000, 10);
    this.monster = this.createCharacter('Monster', 50, 800, 5);

    // UI 표시
    this.playerHpText = this.add.text(10, 10, `Player HP: ${this.player.hp}`, {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#ffffff',
    });
    this.monsterHpText = this.add.text(10, 40, `Monster HP: ${this.monster.hp}`, {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#ffffff',
    });

    // 전투 시작
    this.startBattle();

    // 현재 씬 준비 완료 이벤트 전달
    EventBus.emit('current-scene-ready', this);
  }

  createCharacter(name, hp, attackCooldown, attackPower) {
    return { name, hp, attackCooldown, attackPower, nextAttack: 0 };
  }

  startBattle() {
    this.time.addEvent({
      delay: 100, // 0.1초마다 전투 업데이트
      callback: () => {
        this.updateBattle();
      },
      loop: true,
    });
  }

  updateBattle() {
    const now = this.time.now;

    // 플레이어 공격 처리
    if (this.player.nextAttack <= now && this.player.hp > 0) {
      this.attack(this.player, this.monster);
      this.player.nextAttack = now + this.player.attackCooldown;
    }

    // 몬스터 공격 처리
    if (this.monster.nextAttack <= now && this.monster.hp > 0) {
      this.attack(this.monster, this.player);
      this.monster.nextAttack = now + this.monster.attackCooldown;
    }

    // 승패 확인
    this.checkBattleState();
  }

  attack(attacker, target) {
    target.hp -= attacker.attackPower;
    if (target.hp < 0) target.hp = 0; // HP 음수 방지
    this.updateUI();
  }

  checkBattleState() {
    if (this.player.hp <= 0) {
      // 플레이어가 죽으면 게임 오버
      this.add
        .text(400, 300, 'Game Over', { fontSize: '32px', color: '#ff0000' })
        .setOrigin(0.5);
      this.scene.pause();
    } else if (this.monster.hp <= 0) {
      // 몬스터가 죽으면 새로운 몬스터 생성
      this.time.delayedCall(500, () => {
        this.monster = this.createCharacter('Monster', 50, 800, 5);
        this.updateUI();
      });
    }
  }

  updateUI() {
    this.playerHpText.setText(`Player HP: ${this.player.hp}`);
    this.monsterHpText.setText(`Monster HP: ${this.monster.hp}`);
  }

  changeScene() {
    // 씬을 전환하는 메서드
    this.scene.start('MainMenu'); // 메인 메뉴로 돌아감
  }
}
