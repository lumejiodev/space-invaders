import Element from './Element';
import { AlienLow, AlienMiddle, AlienHigh } from './partials/Aliens';
import { FrameWidth, FieldWidth, AlienWidth, AlienHeight, AlienOffset, AlienStartPosition } from '../constants/Sizes';

export default class Enemies extends Element {
    constructor( ...args ) {
        super( ...args );

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
        this.columnHeight = this.ROWS * (AlienHeight + AlienOffset) - AlienOffset;

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

    updateAliens() {
        const [ baseX, baseY ] = [ this.horzPosition, this.vertPosition ];
        const [ spaceWidth, spaceHeight ] = [ AlienWidth + AlienOffset, AlienHeight + AlienOffset ];

        for (let i = 0; i < this.COLUMNS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                this.aliens[i][j].setPosition( baseX + i*spaceWidth, baseY + j*spaceHeight );
            }
        }
    }

    watchPlayerBullet() {
        const bullet = this.root.playerBullet;

        // грубые прикидки
        if (bullet.positionX < this.position ||
            bullet.positionX > this.position + this.rowWidth ||
            bullet.positionY < this.vertPosition ||
            bullet.positionY > this.vertPosition + this.columnHeight) {
            return;
        }

        // если пуля в пределах прямоугольника, то проверяем тщательнее
        let foundCollision = false;
        for (let i = 0; i < this.COLUMNS; i++) {
            if (foundCollision) break;
            for (let j = 0; j < this.ROWS; j++) {
                if (foundCollision) break;

                let alienX = this.aliens[i][j].positionX,
                    alienY = this.aliens[i][j].positionY;

                if (bullet.positionX >= alienX &&
                    bullet.positionX <= alienX + AlienWidth &&
                    bullet.positionY >= alienY &&
                    bullet.positionY <= alienY + AlienHeight) {
                    foundCollision = true;
                }
            }
        }

        if (foundCollision) {
            bullet.destroy();
        }
    }

    get horzPosition() {
        return this.position + FrameWidth;
    }

    get vertPosition() {
        return AlienStartPosition + this.level;
    }

    update() {
        this.updatePosition();
        this.updateAliens();

        if (this.root.playerBullet) {
            this.watchPlayerBullet();
        }
    }

    render() {
        for (let i = 0; i < this.COLUMNS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                this.aliens[i][j].render();
            }
        }
    }
}
