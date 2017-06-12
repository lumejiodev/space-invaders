import Element from './Element';
import PlayerSprite from '../sprites/Player';
import PlayerBullet from './partials/PlayerBullet';
import { FrameWidth, FieldWidth, PlayerTopPosition } from '../constants/Sizes';
import { KeyLeft, KeyRight, KeySpace } from '../constants/Keys';

export default class Player extends Element {
    constructor( ...args ) {
        super( ...args );

        this.pos = 0.5; // положение от 0 до 1
        this.step = 0.01;
        this.stepInterval = 16;
        this.maxPos = FieldWidth - this.spriteWidth;

        PlayerBullet.prototype.ctx = this.ctx;

        this.initUserControl();
    }

    attachSprite() {
        this.spriteWidth = 52;
        this.spriteHeight = 32;
        this.sprite = new PlayerSprite( this.ctx, this.spriteWidth, this.spriteHeight );
    }

    initUserControl() {
        // todo Вынести обработку пользовательских действий в отдельный класс
        this.moveTimer = null;
        this.moveDirection = false;
        window.addEventListener( 'keydown', e => {
            if (e.keyCode === KeyLeft || e.keyCode === KeyRight) {
                if (e.keyCode !== this.moveDirection) {
                    clearTimeout( this.moveTimer );
                    this.moveDirection = e.keyCode;
                    this.positionStep();
                }
            } else if (e.keyCode === KeySpace) {
                this.fire();
            }
        });
        window.addEventListener( 'keyup', e => {
            if (e.keyCode === this.moveDirection) {
                this.moveDirection = false;
            }
        });
    }

    positionStep() {
        if (this.moveDirection === false) return;

        let step = this.moveDirection === KeyLeft ? -this.step : this.step;
        this.pos = Math.max( 0, Math.min( 1, this.pos + step ));
        this.moveTimer = setTimeout( ::this.positionStep, this.stepInterval );
    }

    fire() {
        if (this.bullet && this.bullet.alive) return;

        this.bullet = new PlayerBullet( this.position + this.spriteWidth/2, this.topPosition );
    }

    get position() {
        return FrameWidth + this.pos * this.maxPos;
    }

    get topPosition() {
        return PlayerTopPosition - this.spriteHeight;
    }

    render() {
        this.sprite.renderAt( this.position, this.topPosition );

        if (this.bullet && this.bullet.alive) {
            this.bullet.render();
        }
    }
}
