import { StatefulSprite } from './Sprite';

export default class AlienLow extends StatefulSprite {
    width = 24;
    height = 16;

    draw( ctx ) {
        this.drawState( ctx, this.getState() );
    }

    drawState( ctx, state ) {
        ctx .fR( 8, 0, 8, 2 )
            .fR( 2, 2, 20, 2 )
            .fR( 0, 4, 24, 6 )
            .cR( 6, 6, 4, 2 )
            .cR( 14, 6, 4, 2 );
        if (state === 1) {
            ctx .fR( 7, 10, 4, 2 )
                .fR( 14, 10, 4, 2 )
                .fR( 4, 12, 4, 2 )
                .fR( 10, 12, 4, 2 )
                .fR( 16, 12, 4, 2 )
                .fR( 0, 14, 4, 2 )
                .fR( 20, 14, 4, 2 );
        } else {
            ctx .fR( 4, 10, 6, 2 )
                .fR( 14, 10, 6, 2 )
                .fR( 2, 12, 4, 2 )
                .fR( 10, 12, 4, 2 )
                .fR( 18, 12, 4, 2 )
                .fR( 4, 14, 4, 2 )
                .fR( 16, 14, 4, 2 );
        }
    }
}
