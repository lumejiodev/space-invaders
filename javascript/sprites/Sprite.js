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
            this.fillBuffer();
        }
    }

    fillBuffer() {
        let buffer = this.createBuffer();
        this.draw( buffer.ctx );
        SpriteBuffer[ this.id ] = [ buffer.canvas ];
    }

    createBuffer() {
        let buffer = document.createElement('canvas');
            buffer.width = this.width;
            buffer.height = this.height;

        let bufferCtx = buffer.getContext('2d');
            bufferCtx.style( this.color );

        return { canvas: buffer, ctx: bufferCtx };
    }

    draw( ctx ) {}

    renderAt( x, y ) {
        const img = SpriteBuffer[ this.id ][0];
        this.ctx.drawImage( img, x, y, this.renderWidth, this.renderHeight );
    }
}

export class StatefulSprite extends Sprite {
    stateTick = 1000; // ms

    getState() {
        let state = Math.floor( Date.now() % (this.stateTick * 2) / this.stateTick );
        return state === 2 ? 1 : state;
    }

    fillBuffer() {
        SpriteBuffer[ this.id ] = [];
        this.states.forEach( drawState => {
            let buffer = this.createBuffer();
            drawState( buffer.ctx );
            SpriteBuffer[ this.id ].push( buffer.canvas );
        });
    }

    renderAt( x, y ) {
        const img = SpriteBuffer[ this.id ][ this.getState() ];
        this.ctx.drawImage( img, x, y, this.renderWidth, this.renderHeight );
    }
}
