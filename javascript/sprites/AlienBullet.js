import { StatefulSprite } from './Sprite';
import { AlienColor } from '../constants/Colors';

export default class AlienBulletSprite extends StatefulSprite {
    constructor( ...args ) {
        super( ...args );

        this.id     = 'AlienBulletSprite';
        this.width  = 3;
        this.height = 9;
        this.color  = AlienColor;

        this.states = [
            ctx => this.drawState( ctx, 1 ),
            ctx => this.drawState( ctx, 2 )
        ];

        this.afterProps();
    }

    drawState( ctx, state ) {
        if (state === 1) {
            ctx.trans( this.width, 0 ).scale( -1, 1 );
        }
        ctx .fR( 1, 0 ).fR( 0, 1 ).fR( 1, 2 ).fR( 2, 3 ).fR( 1, 4 )
            .fR( 0, 5 ).fR( 1, 6 ).fR( 2, 7 ).fR( 1, 8 );
    }
}
