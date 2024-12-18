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
        this.add.image(960, 540, 'pre_background').setScale(10);

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
        const fontStyle = document.createElement('style');
        fontStyle.innerHTML = `
          @font-face {
            font-family: "stardust-extrabold";
            src: url("assets/fonts/PF스타더스트 3.0 ExtraBold.ttf") format("truetype");
          }
          @font-face {
            font-family: "stardust-bold";
            src: url("assets/fonts/PF스타더스트 3.0 Bold.ttf") format("truetype");
          }
          @font-face {
            font-family: "stardust";
            src: url("assets/fonts/PF스타더스트 3.0.ttf") format("truetype");
          }
        `;
        document.head.appendChild(fontStyle);

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
        this.load.spritesheet('hero_run', 'hero_run.png', {
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
        this.load.spritesheet('bee_death', 'bee_death.png', {
            frameWidth: 192, // Adjust this to the width of each frame
            frameHeight: 192 // Adjust this to the height of each frame
        })
        // TODO: change sprites
        // this.load.image('item_slot', 'bg_item.png')
        this.load.spritesheet('slot', 'bg_slots.png', {
            frameWidth: 120,
            frameHeight: 120
        })
        // this.load.spritesheet('sword', 'swords.png', {
        //     frameWidth: 128,
        //     frameHeight: 128
        // })
        this.load.spritesheet('equipment', 'icon_equipments.png', {
            frameWidth: 128,
            frameHeight: 128
        })
        this.load.spritesheet('potion', 'icon_potions.png', {
            frameWidth: 128,
            frameHeight: 128
        })
        this.load.spritesheet('x', 'icon_x.png', {
            frameWidth: 128,
            frameHeight: 128
        })
        this.load.spritesheet('pause', 'icon_pause.png', {
            frameWidth: 128,
            frameHeight: 128
        })
        this.load.spritesheet('ball', 'icon_balls.png', {
            frameWidth: 128,
            frameHeight: 128
        })
        this.load.spritesheet('auto', 'icon_autos.png', {
            frameWidth: 120,
            frameHeight: 120
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
            key: 'hero_run',
            frames: this.anims.generateFrameNumbers('hero_run', { start: 0, end: 9 }),
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
        this.anims.create({
            key: 'bee_death',
            frames: this.anims.generateFrameNumbers('bee_death', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0
        });

        // const itemInfoBack = this.add.renderTexture(260, 720, 360, 480);
        const itemInfoBack = this.make.renderTexture({width: 360, height: 480, add: false});
        itemInfoBack.drawFrame('slot', 1, 0, 0);
        itemInfoBack.drawFrame('slot', 2, 120, 0);
        itemInfoBack.drawFrame('slot', 3, 240, 0);
        itemInfoBack.drawFrame('slot', 0, 0, 120);
        itemInfoBack.drawFrame('slot', 5, 120, 120);
        itemInfoBack.drawFrame('slot', 7, 240, 120);
        itemInfoBack.drawFrame('slot', 5, 0, 240);
        itemInfoBack.drawFrame('slot', 16, 120, 240);
        itemInfoBack.drawFrame('slot', 11, 240, 240);
        itemInfoBack.drawFrame('slot', 13, 0, 360);
        itemInfoBack.drawFrame('slot', 14, 120, 360);
        itemInfoBack.drawFrame('slot', 15, 240, 360);
        itemInfoBack.saveTexture('itemInfoBack');

        const dropRateBack = this.make.renderTexture({width: 720, height: 120, add: false});
        dropRateBack.drawFrame('slot', 1, 0, 0);
        dropRateBack.drawFrame('slot', 2, 120, 0);
        dropRateBack.drawFrame('slot', 2, 240, 0);
        dropRateBack.drawFrame('slot', 2, 360, 0);
        dropRateBack.drawFrame('slot', 2, 480, 0);
        dropRateBack.drawFrame('slot', 3, 600, 0);
        dropRateBack.saveTexture('dropRateBack');
        
        const allStatBack = this.make.renderTexture({width: 720, height: 360, add: false});
        allStatBack.drawFrame('slot', 5, 0, 0);
        allStatBack.drawFrame('slot', 6, 120, 0);
        allStatBack.drawFrame('slot', 6, 240, 0);
        allStatBack.drawFrame('slot', 6, 360, 0);
        allStatBack.drawFrame('slot', 6, 480, 0);
        allStatBack.drawFrame('slot', 7, 600, 0);
        allStatBack.drawFrame('slot', 9, 0, 120);
        allStatBack.drawFrame('slot', 10, 120, 120);
        allStatBack.drawFrame('slot', 10, 240, 120);
        allStatBack.drawFrame('slot', 10, 360, 120);
        allStatBack.drawFrame('slot', 10, 480, 120);
        allStatBack.drawFrame('slot', 11, 600, 120);
        allStatBack.drawFrame('slot', 13, 0, 240);
        allStatBack.drawFrame('slot', 14, 120, 240);
        allStatBack.drawFrame('slot', 14, 240, 240);
        allStatBack.drawFrame('slot', 14, 360, 240);
        allStatBack.drawFrame('slot', 14, 480, 240);
        allStatBack.drawFrame('slot', 15, 600, 240);
        allStatBack.saveTexture('allStatBack');

        const confirmBack = this.make.renderTexture({width: 360, height: 120, add: false});
        confirmBack.drawFrame('slot', 1, 0, 0);
        confirmBack.drawFrame('slot', 2, 120, 0);
        confirmBack.drawFrame('slot', 3, 240, 0);
        confirmBack.saveTexture('confirmBack');
        
        const dequeBack = this.make.renderTexture({width: 240, height: 360, add: false});
        dequeBack.drawFrame('slot', 23, 0, 0);
        dequeBack.drawFrame('slot', 22, 120, 0);
        dequeBack.drawFrame('slot', 8, 0, 120);
        dequeBack.drawFrame('slot', 8, 120, 120);
        dequeBack.drawFrame('slot', 21, 0, 240);
        dequeBack.drawFrame('slot', 20, 120, 240);
        dequeBack.saveTexture('dequeBack');

        this.scene.transition({
            target: 'MainMenu',
            duration: 1000,
            moveBelow: true,
            onUpdate: (progress) => {
                this.cameras.main.setAlpha(1 - progress);
            }
        });
    }
}
