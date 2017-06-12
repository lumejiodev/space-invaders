import Element from './Element';
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
                this.aliens[i].push( new AlienType() );
            }
        }

        let rowWidth = this.COLUMNS * (AlienSize + AlienOffset) - AlienOffset;
        this.position = (FieldWidth - rowWidth) / 2;
    }

    get totalPosition() {
        return this.position + FrameWidth;
    }

    render() {
        for (let i = 0; i < this.COLUMNS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                this.ctx.style('blue').fR( i*(AlienSize + AlienOffset) + this.totalPosition, j*(AlienSize + AlienOffset) + AlienStartPosition, AlienSize, AlienSize );
            }
        }
    }
}

class Alien {
    constructor() {
        // this.sprite = new PlayerSprite( this.ctx, this.spriteWidth, this.spriteHeight );
    }
}

class AlienHigh extends Alien {
    constructor( ...args ) {
        super( ...args );
    }
}

class AlienMiddle extends Alien {
    constructor( ...args ) {
        super( ...args );
    }
}

class AlienLow extends Alien {
    constructor( ...args ) {
        super( ...args );
    }
}
