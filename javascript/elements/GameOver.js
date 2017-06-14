import Element from './Element';
import { GameOverWidth, GameOverHeight, GameOverLeft, GameOverTop } from '../constants/Sizes';
import { GameOverColor, BackgroundColor, ScorePoints } from '../constants/Colors';
import { FontSize, FontSizeSmall, FontFamily } from '../constants/Typography';
import { TextGameOver, TextYourScore, TextClickHere, TextToTryAgain } from '../constants/Texts';

export default class GameOverScreen extends Element {
    constructor( root ) {
        super( root );

        this.root.canvas.addEventListener( 'mousedown', this.clickHandle.bind( this ) );
        this.root.canvas.addEventListener( 'touchstart', this.clickHandle.bind( this ) );
    }

    clickHandle( e ) {
        let canvasRect = this.root.canvas.getBoundingClientRect();
        let [ pointerX, pointerY ] = [ e.pageX - canvasRect.left, e.pageY - canvasRect.top ];

        if (pointerX > GameOverLeft &&
            pointerX < GameOverLeft + GameOverWidth &&
            pointerY > GameOverTop &&
            pointerY < GameOverTop + GameOverHeight) {
            this.root.restartGame();
        }
    }

    getTop( pos ) {
        return GameOverTop + GameOverHeight * pos;
    }

    render() {
        this.ctx.save();
        this.ctx.textAlign = 'center';
        this.ctx.font = FontSize + ' ' + FontFamily;

        let center = GameOverLeft + GameOverWidth/2;

        this.ctx
            .style( GameOverColor ).fR( GameOverLeft, GameOverTop, GameOverWidth, GameOverHeight )
            .style( BackgroundColor ).fR( GameOverLeft + 10, GameOverTop + 10, GameOverWidth - 20, GameOverHeight - 20 )

            .style( GameOverColor ).text( TextGameOver, center, this.getTop( 0.25 ) )

            .style( ScorePoints ).text( TextYourScore + ' ' + this.root.score.totalScore, center, this.getTop( 0.48 ) );

        this.ctx.font = FontSizeSmall + ' ' + FontFamily;
        this.ctx
            .style( GameOverColor ).text( TextClickHere, center, this.getTop( 0.7 ) )
            .style( GameOverColor ).text( TextToTryAgain, center, this.getTop( 0.8 ) );

        this.ctx.restore();
    }

    unload() {
        this.root.canvas.removeEventListener( 'mousedown', this.clickHandle );
        this.root.canvas.removeEventListener( 'touchstart', this.clickHandle );
    }
}
