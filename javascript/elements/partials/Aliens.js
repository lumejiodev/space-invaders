import AlienLowSprite from '../../sprites/AlienLow';
import AlienMiddleSprite from '../../sprites/AlienMiddle';
import AlienHighSprite from '../../sprites/AlienHigh';
import AlienSpecialSprite from '../../sprites/AlienSpecial';
import { easeOutCirc } from '../../utils/easings';
import { AlienWidth, AlienHeight, AlienSpecialWidth, AlienSpecialHeight } from '../../constants/Sizes';
import { AlienDyingTime } from '../../constants/Time';

class Alien { // Abstract
    constructor( ctx ) {
        this.ctx = ctx;
        this.alive = true;
        this.positionX = 0;
        this.positionY = 0;
        this.spriteClass = function(){};
    }

    attachSprite( spriteClass, width = AlienWidth, height = AlienHeight ) {
        this.sprite = new spriteClass( this.ctx, width, height );
    }

    setPosition( x, y ) {
        if (this.alive) {
            this.positionX = x;
            this.positionY = y;
        }
    }

    destroy( callback ) {
        this.alive = false;
        this.dyingStamp = Date.now();
        setTimeout( callback, AlienDyingTime );
    }

    get value() {
        return 0;
    }

    render() {
        if (this.alive) {
            this.sprite.fitRenderAt( this.positionX, this.positionY );
        } else {
            let pos = (Date.now() - this.dyingStamp) / AlienDyingTime;
            if (pos < 1) {
                this.ctx.save();
                this.ctx.globalAlpha = 1 - pos;
                this.sprite.fitRenderAt( this.positionX, easeOutCirc( pos, this.positionY, -20, 1 ) );
                this.ctx.restore();
            }
        }
    }
}

export class AlienHigh extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienHighSprite );
    }

    get value() {
        return 40;
    }
}

export class AlienMiddle extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienMiddleSprite );
    }

    get value() {
        return 20;
    }
}

export class AlienLow extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienLowSprite );
    }

    get value() {
        return 10;
    }
}

export class AlienSpecial extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienSpecialSprite, AlienSpecialWidth, AlienSpecialHeight );
    }

    get value() {
        return Math.round( 1 + Math.random() * 2 ) * 50;
    }
}
