export class Sprite {
    draw( ctx ) {}

    drawAt( ctx, x, y ) {
        ctx.translate( x, y );
        this.draw( ctx );
        ctx.translate( -x, -y );
    }
}

export class StatefulSprite extends Sprite {
    stateTick = 700; // ms

    getState() {
        let state = Math.ceil( Date.now() % (this.stateTick * 2) / this.stateTick );
        return state === 0 ? 1 : state;
    }
}
