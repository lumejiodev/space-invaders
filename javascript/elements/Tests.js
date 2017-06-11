import Element from './Element';
import PlayerSprite from '../sprites/Player';
import AlienLow from '../sprites/AlienLow';
import AlienMiddle from '../sprites/AlienMiddle';
import AlienHigh from '../sprites/AlienHigh';
import AlienSpecial from '../sprites/AlienSpecial';

export default class Tests extends Element {
    constructor( root ) {
        super( root );

        this.playerSprite = new PlayerSprite;
        this.alienLowSprite = new AlienLow;
        this.alienMiddleSprite = new AlienMiddle;
        this.alienHighSprite = new AlienHigh;
        this.alienSpecialSprite = new AlienSpecial;
    }

    render() {
        this.playerSprite.drawAt( this.ctx, 0, 0 );
        this.alienLowSprite.drawAt( this.ctx, 30, 0 );
        this.alienMiddleSprite.drawAt( this.ctx, 60, 0 );
        this.alienHighSprite.drawAt( this.ctx, 90, 0 );
        this.alienSpecialSprite.drawAt( this.ctx, 120, 0 );
    }
}
