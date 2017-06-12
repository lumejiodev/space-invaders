import Element from './Element';
import AlienLowSprite from '../sprites/AlienLow';
import AlienMiddleSprite from '../sprites/AlienMiddle';
import AlienHighSprite from '../sprites/AlienHigh';
import { FrameWidth, FieldWidth, AlienSize, AlienOffset, AlienStartPosition } from '../constants/Sizes';

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
                this.aliens[i].push( new AlienType( this.ctx, AlienSize ) );
            }
        }

        let rowWidth = this.COLUMNS * (AlienSize + AlienOffset) - AlienOffset;
        this.position = (FieldWidth - rowWidth) / 2;
    }

    get totalPosition() {
        return this.position + FrameWidth;
    }

    render() {
        const AlienSpace = AlienSize + AlienOffset;
        for (let i = 0; i < this.COLUMNS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                this.aliens[i][j].render( this.totalPosition + i*AlienSpace, AlienStartPosition + j*AlienSpace );
            }
        }
    }
}

class Alien {
    constructor( ctx, size ) {
        this.ctx = ctx;
        this.size = size;
        this.spriteClass = function(){};
    }

    attachSprite( spriteClass ) {
        this.sprite = new spriteClass( this.ctx, this.size, this.size );
    }

    render( x, y ) {
        this.sprite.renderAt( x, y );
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
