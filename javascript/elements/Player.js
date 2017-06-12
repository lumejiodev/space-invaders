import Element from './Element';
import PlayerSprite from '../sprites/Player';
import { FrameWidth, FieldWidth, PlayerTopPosition } from '../constants/Sizes';

export default class Player extends Element {
    constructor( ...args ) {
        super( ...args );

        this.pos = 0; // положение от 0 до 1
        this.maxPos = FieldWidth - this.spriteWidth;
    }

    attachSprite() {
        this.spriteWidth = 52;
        this.spriteHeight = 32;
        this.sprite = new PlayerSprite( this.ctx, this.spriteWidth, this.spriteHeight );
    }

    get position() {
        return FrameWidth + this.pos * this.maxPos;
    }

    render() {
        this.sprite.renderAt( this.position, PlayerTopPosition - this.spriteHeight );
    }
}
