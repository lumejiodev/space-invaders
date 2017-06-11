import { StatefulSprite } from './Sprite';

export default class AlienHigh extends StatefulSprite {
    width = 16;
    height = 16;

    draw( ctx ) {
        this.drawState( ctx, this.getState() );
    }

    drawState( ctx, state ) {
        ctx .fR( 6, 0, 4, 2 )
            .fR( 4, 2, 8, 2 )
            .fR( 2, 4, 12, 2 )
            .fR( 0, 8, 16, 2 )
            .fR( 0, 6, 4, 2 )
            .fR( 6, 6, 4, 2 )
            .fR( 12, 6, 4, 2 );
        if (state === 1) {
            ctx .fR( 2, 10, 2, 2 )
                .fR( 0, 12, 2, 2 )
                .fR( 2, 14, 2, 2 )
                .fR( 6, 10, 4, 2 )
                .fR( 12, 10, 2, 2 )
                .fR( 14, 12, 2, 2 )
                .fR( 12, 14, 2, 2 );
        } else {
            ctx .fR( 4, 10, 2, 2 )
                .fR( 10, 10, 2, 2 )
                .fR( 2, 12, 2, 2 )
                .fR( 0, 14, 2, 2 )
                .fR( 4, 14, 2, 2 )
                .fR( 10, 14, 2, 2 )
                .fR( 14, 14, 2, 2 )
                .fR( 12, 12, 2, 2 )
                .fR( 6, 12, 4, 2 );
        }
    }
}
