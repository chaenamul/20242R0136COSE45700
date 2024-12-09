import { Scene } from 'phaser';
// import { Enemy } from '../gameobjects/enemy';
import { Player } from '../gameobjects/player';

export class Battle extends Scene
{
    constructor ()
    {
        super('Battle');
    }

    // preload() {

    // }

    create () {
        this.isBattle = false;
        this.enemy = null;

        this.add.image(960, 540, 'background');
        // this.add.image(960 + 480, 540, 'inventory');

        // this.player = this.add.sprite(240, 180, 'hero_idle');
        // this.player.play('hero_idle')
        this.player = new Player(this, 240, 180, 'hero_idle');
        this.player.initialize();

        // this.spawnEnemy();
    }

    update (time, delta) {
        // if(this.isBattle) {
        //     this.player.attackTimer += delta;
        //     this.enemy.attackTimer += delta;
        //     if (this.player.attackTimer >= this.player.attackDelay) {
        //         this.player.attack(enemy);
        //         this.player.attackTimer = 0;
        //     }
        //     if (this.enemy.attackTimer >= this.enemy.attackDelay) {
        //         this.enemy.attack(player);
        //         this.enemy.attackTimer = 0;
        //     }
        // }
    }

    // spawnEnemy() {
    //     // this.enemy = this.add.sprite(720 + 480, 180, 'bee_idle');
    //     this.enemy = new Enemy(this, 720 + 480, 180, 'bee_idle');
    //     this.enemy.initialize();
    // }

    // startBattle() {
    //     this.isBattle = true;
    //     this.player.attackTimer = this.player.attackDelay;
    //     this.enemy.attackTimer = 0;
    // }

    // handleEnemyDeath() {
    //     this.isBattle = false;
    //     this.spawnEnemy();
    // }

    // handlePlayerDeath() {

    // }

}
