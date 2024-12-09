import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(960, 540, 'pre_background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(960, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(960-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('background', 'bg.png');
        this.load.image('inventory', 'bg_inventory.png');

        // Load the sprite sheet for the idle animation
        this.load.spritesheet('hero_idle', 'hero_idle.png', {
            frameWidth: 480, // Adjust this to the width of each frame
            frameHeight: 320 // Adjust this to the height of each frame
        })
        this.load.spritesheet('hero_attack', 'hero_attack.png', {
            frameWidth: 480, // Adjust this to the width of each frame
            frameHeight: 320 // Adjust this to the height of each frame
        })
        this.load.spritesheet('hero_attack_double', 'hero_attack_double.png', {
            frameWidth: 480, // Adjust this to the width of each frame
            frameHeight: 320 // Adjust this to the height of each frame
        })
        this.load.spritesheet('hero_death', 'hero_death.png', {
            frameWidth: 480, // Adjust this to the width of each frame
            frameHeight: 320 // Adjust this to the height of each frame
        })
        this.load.spritesheet('bee_idle', 'bee_idle.png', {
            frameWidth: 192, // Adjust this to the width of each frame
            frameHeight: 192 // Adjust this to the height of each frame
        })
        this.load.spritesheet('bee_attack', 'bee_attack.png', {
            frameWidth: 192, // Adjust this to the width of each frame
            frameHeight: 192 // Adjust this to the height of each frame
        })
        this.load.spritesheet('bee_hit', 'bee_hit.png', {
            frameWidth: 192, // Adjust this to the width of each frame
            frameHeight: 192 // Adjust this to the height of each frame
        })
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        this.anims.create({
            key: 'hero_idle',
            frames: this.anims.generateFrameNumbers('hero_idle', { start: 0, end: 9 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'hero_attack',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'hero_attack_double',
            frames: this.anims.generateFrameNumbers('hero_attack_double', { start: 0, end: 9 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'hero_death',
            frames: this.anims.generateFrameNumbers('hero_death', { start: 0, end: 9 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'bee_idle',
            frames: this.anims.generateFrameNumbers('bee_idle', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'bee_attack',
            frames: this.anims.generateFrameNumbers('bee_attack', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'bee_hit',
            frames: this.anims.generateFrameNumbers('bee_hit', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        // this.scene.start('MainMenu');
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
