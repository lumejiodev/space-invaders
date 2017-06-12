const SpriteBuffer = {}; // static

export class Sprite { // Abstract
    constructor( ctx, renderWidth, renderHeight ) {
        this.id     = 'Sprite';
        this.width  = 0;
        this.height = 0;
        this.color  = 'black';

        this.ctx = ctx;
        this.renderWidth = renderWidth;
        this.renderHeight = renderHeight;
    }

    afterProps() {
        if (this.id in SpriteBuffer === false) {
            this.createBuffer();
        }
    }

    createBuffer() {
        let buffer = document.createElement('canvas');
            buffer.width = this.width;
            buffer.height = this.height;

        let bufferCtx = buffer.getContext('2d');
            bufferCtx.style( this.color );

        this.draw( bufferCtx );

        SpriteBuffer[ this.id ] = [ buffer ];
    }

    draw( ctx ) {}

    renderAt( x, y ) {
        const img = SpriteBuffer[ this.id ][0];
        this.ctx.drawImage( img, x, y, this.renderWidth, this.renderHeight );
    }
}

export class StatefulSprite extends Sprite {
    stateTick = 700; // ms

    getState() {
        let state = Math.ceil( Date.now() % (this.stateTick * 2) / this.stateTick );
        return state === 0 ? 1 : state;
    }

    draw( ctx ) {
        this.drawState( ctx, this.getState() );
    }

    drawState( ctx, state ) {}
}
