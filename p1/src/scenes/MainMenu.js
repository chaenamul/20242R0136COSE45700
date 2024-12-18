import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.text(0, 0, '', {
            fontFamily: 'stardust-extrabold',
            fontSize: '20px'
        })
        this.add.text(0, 0, '', {
            fontFamily: 'stardust-bold',
            fontSize: '20px'
        })
        this.add.text(0, 0, '', {
            fontFamily: 'stardust',
            fontSize: '20px'
        })
        this.add.image(960, 540, 'pre_background').setScale(10);
        // this.add.image(960, 540, 'background');

        // this.add.image(960, 300, 'logo');

        // this.add.text(960, 460, 'Click to Start', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);

        // this.input.once('pointerdown', () => {

        //     this.scene.start('Battle');

        // });
        
        this.time.delayedCall(200, () => {
            this.scene.start('Battle');
        });
        this.scene.transition({
            target: 'Battle',
            duration: 1000,
            moveBelow: true,
            onUpdate: (progress) => {
                this.cameras.main.setAlpha(1 - progress);
            }
        });
    }
}
