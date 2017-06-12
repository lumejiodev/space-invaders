import AlienLowSprite from '../../sprites/AlienLow';
import AlienMiddleSprite from '../../sprites/AlienMiddle';
import AlienHighSprite from '../../sprites/AlienHigh';
import { AlienWidth, AlienHeight } from '../../constants/Sizes';

class Alien { // Abstract
    constructor( ctx ) {
        this.ctx = ctx;
        this.spriteClass = function(){};
    }

    attachSprite( spriteClass ) {
        this.sprite = new spriteClass( this.ctx, AlienWidth, AlienHeight );
    }

    render( x, y ) {
        this.sprite.fitRenderAt( x, y );
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
