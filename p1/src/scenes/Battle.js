import { Scene } from 'phaser';

export class Battle extends Scene
{
    constructor ()
    {
        super('Battle');
    }

    // preload() {

    // }

    create () {
        this.enemyAlive = false;
        this.isBattle = false

        this.add.image(960, 540, 'background');
        this.add.image(960 + 480, 540, 'inventory');

        this.player = this.add.sprite(240, 180, 'hero_idle');
        this.player.play('hero_idle')
        this.playerStats = {
            hp: 100,
            attackDelay: 1000,
            attackDamage: 10,
            attackSpeedMultiplier: 1
        }

        this.playerAttackTimer = 0;

    }

    update () {
        if (this.enemyAlive == false) {
            this.spawnEnemy();
        }

        if (this.isBattle) {
            this.playerAttackTimer += delta // Accumulate elapsed time
            // Check if it's time for the next attack
            if (this.playerAttackTimer >= this.playerStats.attackDelay) {
                this.playerAttackTimer = 0 // Reset timer
                this.playerAttack()
            }
        }
    }

    spawnEnemy() {
        // TODO: randomize mob type before spawn
        this.enemyAlive = true;
        this.enemy = this.add.sprite(720 + 480, 180, 'bee_idle');
        this.enemy.play('bee_idle');
        this.enemyStats
        this.tweens.add({
            targets: this.enemy,
            x: 720, // Target X position
            y: 180, // Target Y position
            duration: 1000, // Duration in milliseconds
            ease: 'Linear', // Movement easing
            onComplete: () => {
                startBattle();
            }
        })
    }

    startBattle() {
        this.isBattle = true;
        this.playerAttackTimer = 0;
        this.playerAttack();
    }

    playerAttack() {
        this.enemyStats.hp -= this.playerStats.attackDamage
        this.enemy
        if (this.enemyStats.hp <= 0) {
            this.isBattle = false
            this.tweens.add({
                targets: this.enemy,      // The sprite to fade out
                alpha: 0,                 // Target alpha (opacity) value
                duration: 500,            // Duration of fade-out in milliseconds
                ease: 'Linear',           // Easing function for smooth fading
                onComplete: () => {       // Callback after the tween completes
                    console.log('Enemy faded out, enemyAlive is now true!')
                }
            })
        }
    }

    enemyAttack() {

    }

    handleEnemyDeath(enemy) {
        // Start fading out the old enemy
        this.tweens.add({
            targets: enemy,          // Use the passed enemy, not this.enemy
            alpha: 0,                // Fade to transparent
            duration: 500,           // 0.5 seconds
            ease: 'Linear',
            onComplete: () => {
                enemy.destroy()        // Remove the faded-out enemy
            }
        })

        // Spawn the next enemy immediately
        this.spawnNextEnemy()
    }

}
