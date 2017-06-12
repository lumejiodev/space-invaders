import { StatefulSprite } from './Sprite';
import { AlienColor } from '../constants/Colors';

export default class AlienMiddleSprite extends StatefulSprite {
    constructor( ...args ) {
        super( ...args );

        this.id     = 'AlienMiddleSprite';
        this.width  = 22;
        this.height = 16;
        this.color  = AlienColor;

        this.states = [
            ctx => this.drawState( ctx, 1 ),
            ctx => this.drawState( ctx, 2 )
        ];

        this.afterProps();
    }

    drawState( ctx, state ) {
        ctx .fR( 4, 0, 2, 2 )
            .fR( 16, 0, 2, 2 )
            .fR( 6, 2, 2, 2 )
            .fR( 14, 2, 2, 2 )
            .fR( 4, 4, 14, 2 )
            .fR( 2, 6, 4, 2 )
            .fR( 8, 6, 6, 2 )
            .fR( 16, 6, 4, 2 )
            .fR( 2, 8, 18, 2 );
        if (state === 1) {
            ctx .fR( 0, 8, 2, 6 )
                .fR( 20, 8, 2, 6 )
                .fR( 4, 10, 14, 4 )
                .cR( 6, 12, 10, 2 )
                .fR( 6, 14, 4, 2 )
                .fR( 12, 14, 4, 2 );
        } else {
            ctx .fR( 0, 2, 2, 8 )
                .fR( 20, 2, 2, 8 )
                .fR( 2, 10, 18, 2 )
                .fR( 4, 12, 2, 2 )
                .fR( 16, 12, 2, 2 )
                .fR( 2, 14, 2, 2 )
                .fR( 18, 14, 2, 2 );
        }
    }
}
