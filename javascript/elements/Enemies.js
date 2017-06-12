import Element from './Element';
import AlienLowSprite from '../sprites/AlienLow';
import AlienMiddleSprite from '../sprites/AlienMiddle';
import AlienHighSprite from '../sprites/AlienHigh';
import { FrameWidth, FieldWidth, AlienWidth, AlienHeight, AlienOffset, AlienStartPosition } from '../constants/Sizes';

export default class Enemies extends Element {
    constructor( root ) {
        super( root );

        this.ROWS = 5;
        this.COLUMNS = 11;

        this.aliens = [];
        for (let i = 0; i < this.COLUMNS; i++) {
            this.aliens[i] = [];
            for (let j = 0; j < this.ROWS; j++) {
                let AlienType = j == 0 ? AlienHigh : j < 3 ? AlienMiddle : AlienLow;
                this.aliens[i].push( new AlienType( this.ctx ) );
            }
        }

        let rowWidth = this.COLUMNS * (AlienWidth + AlienOffset) - AlienOffset;
        this.position = (FieldWidth - rowWidth) / 2;
    }

    get totalPosition() {
        return this.position + FrameWidth;
    }

    render() {
        for (let i = 0; i < this.COLUMNS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                this.aliens[i][j].render( this.totalPosition + i*(AlienWidth + AlienOffset), AlienStartPosition + j*(AlienHeight + AlienOffset) );
            }
        }
    }
}

class Alien {
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

class AlienHigh extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienHighSprite );
    }
}

class AlienMiddle extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienMiddleSprite );
    }
}

class AlienLow extends Alien {
    constructor( ...args ) {
        super( ...args );

        this.attachSprite( AlienLowSprite );
    }
}
