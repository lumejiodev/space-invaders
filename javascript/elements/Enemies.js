import Element from './Element';
import { AlienLow, AlienMiddle, AlienHigh } from './partials/Aliens';
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

        this.rowWidth = this.COLUMNS * (AlienWidth + AlienOffset) - AlienOffset;

        this.position = (FieldWidth - this.rowWidth) / 2;
        this.level = 0;
        this.speed = 20/1000;
        this.directionRight = true;
        this.moveTimestamp = Date.now();
    }

    levelUp() {
        this.level += AlienHeight * 0.7;
        this.speed += 20/1000;
        this.directionRight = !this.directionRight;
    }

    updatePosition() {
        const timestamp = Date.now();
        const timeSpend = timestamp - this.moveTimestamp;
        this.moveTimestamp = timestamp;
        this.position += timeSpend * (this.directionRight ? this.speed : -this.speed);

        if (this.position + this.rowWidth > FieldWidth) {
            this.position = FieldWidth - this.rowWidth;
            this.levelUp();
        } else if (this.position < 0) {
            this.position = 0;
            this.levelUp();
        }
    }

    get horzPosition() {
        return this.position + FrameWidth;
    }

    get vertPosition() {
        return AlienStartPosition + this.level;
    }

    render() {
        this.updatePosition();
        let [ baseX, baseY ] = [ this.horzPosition, this.vertPosition ];
        for (let i = 0; i < this.COLUMNS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                this.aliens[i][j].render(
                    baseX + i*(AlienWidth + AlienOffset),
                    baseY + j*(AlienHeight + AlienOffset)
                );
            }
        }
    }
}
