import Element from './Element';
import { GameOverWidth, GameOverHeight, GameOverLeft, GameOverTop } from '../constants/Sizes';
import { GameOverColor, BackgroundColor, ScorePoints } from '../constants/Colors';
import { FontSize, FontSizeSmall, FontFamily } from '../constants/Typography';

export default class GameOverScreen extends Element {
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

            .style( GameOverColor ).text( 'Игра окончена', center, this.getTop( 0.25 ) )

            .style( ScorePoints ).text( 'Ваш счёт ' + this.root.score.totalScore, center, this.getTop( 0.48 ) );

        this.ctx.font = FontSizeSmall + ' ' + FontFamily;
        this.ctx
            .style( GameOverColor ).text( 'Нажмите здесь', center, this.getTop( 0.7 ) )
            .style( GameOverColor ).text( 'чтобы попробовать заново', center, this.getTop( 0.8 ) );

        this.ctx.restore();
    }
}
