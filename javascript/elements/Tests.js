import Element from './Element';
import PlayerSprite from '../sprites/Player';

export default class Tests extends Element {
    constructor( root ) {
        super( root );

        this.playerSprite = new PlayerSprite;
    }

    render() {
        this.playerSprite.draw( this.ctx );
    }
}
