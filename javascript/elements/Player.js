import Element from './Element';
import PlayerSprite from '../sprites/Player';

export default class Player extends Element {
    attachSprite() {
        this.sprite = new PlayerSprite( this.ctx );
    }

    render() {
        this.sprite.renderAt( 50, 50 );
    }
}
