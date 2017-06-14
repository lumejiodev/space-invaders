import Element from './Element';

export default class Score extends Element {
    constructor( root ) {
        super( root );

        this.totalScore = 0;
        this.totalLives = 3;

        root.score = this;
    }

    addPoints( number ) {
        this.totalScore += number;
    }

    minusLife() {
        this.totalLives--;
    }

    render() {
        this.ctx
            .style('red').text( this.totalScore, 30, 30 )
            .style('yellow').text( this.totalLives, 30, 50 );
    }
}
