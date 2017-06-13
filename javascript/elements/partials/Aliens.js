import AlienLowSprite from '../../sprites/AlienLow';
import AlienMiddleSprite from '../../sprites/AlienMiddle';
import AlienHighSprite from '../../sprites/AlienHigh';
import AlienSpecialSprite from '../../sprites/AlienSpecial';
import { AlienWidth, AlienHeight, AlienSpecialWidth, AlienSpecialHeight } from '../../constants/Sizes';

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
        setTimeout( callback, 500 );
    }

    render() {
        if (this.alive) {
            this.sprite.fitRenderAt( this.positionX, this.positionY );
        } else {
            this.ctx.style('red').fR( this.positionX, this.positionY, AlienWidth, AlienHeight );
        }
    }
}

export class AlienHigh extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienHighSprite );
    }
}

export class AlienMiddle extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienMiddleSprite );
    }
}

export class AlienLow extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienLowSprite );
    }
}

export class AlienSpecial extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienSpecialSprite, AlienSpecialWidth, AlienSpecialHeight );
    }
}
