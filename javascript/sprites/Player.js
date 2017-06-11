import { Sprite } from './Sprite';
import { PlayerColor } from '../constants/Colors';

export default class PlayerSprite extends Sprite {
    width = 26;
    height = 16;
    color = PlayerColor;

    draw( ctx ) {
        ctx .fR( 0, 8, 26, 8 )
            .fR( 2, 6, 22, 2 )
            .fR( 10, 2, 6, 4 )
            .fR( 12, 0, 2, 2 );
    }
}
