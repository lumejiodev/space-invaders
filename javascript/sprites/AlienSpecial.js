import { Sprite } from './Sprite';
import { AlienSpecialColor } from '../constants/Colors';

export default class AlienSpecialSprite extends Sprite {
    constructor( ...args ) {
        super( ...args );

        this.id     = 'AlienSpecialSprite';
        this.width  = 48;
        this.height = 21;
        this.color  = AlienSpecialColor;

        this.afterProps();
    }

    draw( ctx ) {
        ctx .fR( 15, 0, 18, 3 )
            .fR( 9, 3, 30, 3 )
            .fR( 6, 6, 36, 3 )
            .fR( 3, 9, 42, 3 )
            .fR( 0, 12, 48, 3 )
            .fR( 6, 15, 9, 3 )
            .fR( 33, 15, 9, 3 )
            .fR( 21, 15, 6, 3 )
            .fR( 9, 18, 3, 3 )
            .fR( 36, 18, 3, 3 )
            .cR( 9, 9, 3, 3 )
            .cR( 18, 9, 3, 3 )
            .cR( 27, 9, 3, 3 )
            .cR( 36, 9, 3, 3 )
    }
}
