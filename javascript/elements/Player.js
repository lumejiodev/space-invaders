import Element from './Element';
import PlayerSprite from '../sprites/Player';
import { PlayerTopPosition } from '../constants/Sizes';

export default class Player extends Element {
    attachSprite() {
        this.spriteWidth = 52;
        this.spriteHeight = 32;
        this.sprite = new PlayerSprite( this.ctx, this.spriteWidth, this.spriteHeight );
    }

    render() {
        this.sprite.renderAt( 50, PlayerTopPosition - this.spriteHeight );
    }
}
