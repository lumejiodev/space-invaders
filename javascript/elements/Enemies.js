import Element from './Element';
import { AlienLow, AlienMiddle, AlienHigh, AlienSpecial } from './partials/Aliens';
import { FrameWidth, FieldWidth, AlienWidth, AlienHeight, AlienOffset, AlienStartPosition, AlienSpecialWidth, AlienSpecialHeight, AlienSpecialPosition } from '../constants/Sizes';
import { AlienSpecialMinDelay, AlienSpecialMaxDelay } from '../constants/Time';

export default class Enemies extends Element {
    constructor( ...args ) {
        super( ...args );

        this.setRows( 5 );
        this.setColumns( 11 );

        this.position = (FieldWidth - this.rowWidth) / 2;
        this.level = 0;
        this.speed = 20/1000;
        this.directionRight = true;
        this.moveTimestamp = Date.now();

        this.aliens = [];
        for (let i = 0; i < this.COLUMNS; i++) {
            this.aliens[i] = [];
            for (let j = 0; j < this.ROWS; j++) {
                let AlienType = j == 0 ? AlienHigh : j < 3 ? AlienMiddle : AlienLow;
                this.aliens[i].push( new AlienType( this.ctx ) );
            }
        }

        this.alienSpecial = {
            alien: new AlienSpecial( this.ctx ),
            exists: false,
            position: 0,
            directionRight: true,
            timer: null,
            speed: 60/1000,
            getDelay() {
                return AlienSpecialMinDelay + Math.random() * (AlienSpecialMaxDelay - AlienSpecialMinDelay);
            },
            queueFly() {
                clearTimeout( this.timer );
                this.timer = setTimeout( () => this.startFly(), this.getDelay() );
            },
            startFly() {
                this.exists = true;
                this.directionRight = Math.random() > 0.5;
                this.position = this.directionRight ? -AlienSpecialWidth : FieldWidth;
            },
            stopFly() {
                this.exists = false;
                this.queueFly();
            }
        };
        this.alienSpecial.queueFly();
    }

    setRows( number ) {
        this.ROWS = number;
        this.columnHeight = number * (AlienHeight + AlienOffset) - AlienOffset;
    }

    setColumns( number ) {
        this.COLUMNS = number;
        this.rowWidth = number * (AlienWidth + AlienOffset) - AlienOffset;
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

        const special = this.alienSpecial;
        if (special.exists && special.alien.alive) {
            special.position += timeSpend * (special.directionRight ? special.speed : -special.speed );

            if (special.position < -AlienSpecialWidth || special.position > FieldWidth) {
                special.stopFly();
            }
        }
    }

    updateAliens() {
        const [ baseX, baseY ] = [ this.horzPosition, this.vertPosition ];
        const [ spaceWidth, spaceHeight ] = [ AlienWidth + AlienOffset, AlienHeight + AlienOffset ];

        for (let i = 0; i < this.COLUMNS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                if (this.aliens[i][j]) {
                    this.aliens[i][j].setPosition( baseX + i*spaceWidth, baseY + j*spaceHeight );
                }
            }
        }

        const special = this.alienSpecial;
        if (special.exists && special.alien.alive) {
            special.alien.setPosition( special.position, AlienSpecialPosition );
        }
    }

    destroyAlien( column, row ) {
        let columnRemoved = false;

        this.aliens[column][row].destroy( () => {
            if (!columnRemoved) {
                delete this.aliens[column][row];
            }
        });

        // обновить данные, если крайних столбцов стало меньше
        // todo сделать аналогичное с рядами
        if (column === 0 || column === this.COLUMNS - 1) {
            for (let j = 0; j < this.ROWS; j++) {
                if (this.aliens[column][j] && this.aliens[column][j].alive) break;
                if (j !== this.ROWS - 1) continue;

                if (column === 0) {
                    this.aliens.splice( 0, 1 );
                    this.position += AlienWidth + AlienOffset;
                } else {
                    this.aliens.splice( -1, 1 ); // в принципе, особо не нужно
                }

                this.setColumns( this.COLUMNS - 1 );
                columnRemoved = true;
            }
        }
    }

    watchPlayerBullet() {
        const bullet = this.root.playerBullet;

        let bulletX = bullet.positionX,
            bulletY = bullet.positionY;

        // грубые прикидки
        if (bulletX < this.position ||
            bulletX > this.position + this.rowWidth ||
            bulletY < this.vertPosition ||
            bulletY > this.vertPosition + this.columnHeight) {
            return;
        }

        // если пуля в пределах прямоугольника, то проверяем тщательнее
        let foundCollision = false;
        for (let i = 0; i < this.COLUMNS; i++) {
            if (foundCollision) break;
            for (let j = 0; j < this.ROWS; j++) {
                if (foundCollision) break;

                let alien = this.aliens[i][j];
                if (alien === undefined) continue;

                let alienX = alien.positionX,
                    alienY = alien.positionY;

                if (alien.alive &&
                    bulletX >= alienX &&
                    bulletX <= alienX + AlienWidth &&
                    bulletY >= alienY &&
                    bulletY <= alienY + AlienHeight) {
                    foundCollision = true;
                    this.destroyAlien( i, j );
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
                if (this.aliens[i][j]) {
                    this.aliens[i][j].render();
                }
            }
        }

        if (this.alienSpecial.exists) {
            this.alienSpecial.alien.render();
        }
    }
}
