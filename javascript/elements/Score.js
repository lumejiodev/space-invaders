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

    render() {
        let baseHorzPosition = FrameWidth + ScoreOffset;
        let scoreHorzPosition = baseHorzPosition + this.ctx.measureText( TextPoints ).width + ScoreOffset/2;
        let livesTextHorzPosition = scoreHorzPosition + this.ctx.measureText( this.totalScore ).width + ScoreOffset*2;
        let livesHorzPosition = livesTextHorzPosition + this.ctx.measureText( TextLives ).width + ScoreOffset/2;
        this.ctx
            .style( ScoreText ).text( TextPoints, baseHorzPosition, this.vertPosition )
            .style( ScorePoints ).text( this.totalScore, scoreHorzPosition, this.vertPosition )
            .style( ScoreText ).text( TextLives, livesTextHorzPosition, this.vertPosition )
            .style( ScoreLives ).text( this.totalLives, livesHorzPosition, this.vertPosition );
    }
}
