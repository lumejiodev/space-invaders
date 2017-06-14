import Element from './Element';
import { FrameWidth, BorderWidth, BorderTopPosition, ScoreOffset } from '../constants/Sizes';
import { ScoreText, ScorePoints, ScoreLives } from '../constants/Colors';
import { TextPoints, TextLives } from '../constants/Texts';

export default class Score extends Element {
    constructor( root ) {
        super( root );

        this.totalScore = 0;
        this.totalLives = 3;

        this.vertPosition = BorderTopPosition + BorderWidth + ScoreOffset;

        root.score = this;
    }

    addPoints( number ) {
        this.totalScore += number;
    }

    minusLife() {
        this.totalLives--;
    }

    minusAllLives() {
        this.totalLives = 1;
        this.minusLife();
    }

    measureText( text ) {
        return this.ctx.measureText( text ).width;
    }

    render() {
        let baseHorzPosition        = FrameWidth + ScoreOffset;
        let scoreHorzPosition       = baseHorzPosition + this.measureText( TextPoints ) + ScoreOffset/2;
        let livesTextHorzPosition   = scoreHorzPosition + this.measureText( this.totalScore ) + ScoreOffset*2;
        let livesHorzPosition       = livesTextHorzPosition + this.measureText( TextLives ) + ScoreOffset/2;

        this.ctx
            .style( ScoreText   ).text( TextPoints, baseHorzPosition, this.vertPosition )
            .style( ScorePoints ).text( this.totalScore, scoreHorzPosition, this.vertPosition )
            .style( ScoreText   ).text( TextLives, livesTextHorzPosition, this.vertPosition )
            .style( ScoreLives  ).text( this.totalLives, livesHorzPosition, this.vertPosition );
    }
}
