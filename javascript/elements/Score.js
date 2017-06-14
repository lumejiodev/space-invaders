import Element from './Element';

export default class Score extends Element {
    constructor( root ) {
        super( root );

        this.totalScore = 0;

        root.score = this;
    }

    addPoints( number ) {
        this.totalScore += number;
    }

    render() {
        this.ctx.style('red').text( this.totalScore, 30, 30 );
    }
}
