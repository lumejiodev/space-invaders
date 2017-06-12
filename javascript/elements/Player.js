import Element from './Element';
import PlayerSprite from '../sprites/Player';
import { FrameWidth, FieldWidth, PlayerTopPosition } from '../constants/Sizes';
import { KeyLeft, KeyRight } from '../constants/Keys';

export default class Player extends Element {
    constructor( ...args ) {
        super( ...args );

        this.pos = 0.5; // положение от 0 до 1
        this.step = 0.03;
        this.maxPos = FieldWidth - this.spriteWidth;

        this.initUserControl();
    }

    attachSprite() {
        this.spriteWidth = 52;
        this.spriteHeight = 32;
        this.sprite = new PlayerSprite( this.ctx, this.spriteWidth, this.spriteHeight );
    }

    initUserControl() {
        // todo Вынести обработку пользовательских действий в отдельный класс
        window.addEventListener( 'keydown', e => {
            switch (e.keyCode) {
                case KeyLeft:
                    this.pos += -this.step;
                    break;
                case KeyRight:
                    this.pos += this.step;
                    break;
                default:
            }
            this.pos = Math.max( 0, Math.min( 1, this.pos ));
        });
    }

    get position() {
        return FrameWidth + this.pos * this.maxPos;
    }

    render() {
        this.sprite.renderAt( this.position, PlayerTopPosition - this.spriteHeight );
    }
}
