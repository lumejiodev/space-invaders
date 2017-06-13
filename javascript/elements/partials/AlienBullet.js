export default class AlienBullet {
    constructor( ctx, x, y, speed ) {
        this.ctx = ctx;
        this.positionX = x;
        this.positionY = y;
        this.speed = speed;

        this.alive = true;
    }

    render() {
        this.ctx.style('white').fR( this.positionX, this.positionY, 2, 7 );
    }
}
