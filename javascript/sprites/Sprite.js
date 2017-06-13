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
        if (!this.renderWidth) {
            this.renderWidth = this.width;
        }
        if (!this.renderHeight) {
            this.renderHeight = this.height;
        }
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

    get img() {
        return SpriteBuffer[ this.id ][0];
    }

    renderAt( x, y ) {
        this.ctx.drawImage( this.img, x, y, this.renderWidth, this.renderHeight );
    }

    fitRenderAt( x, y ) {
        let result = { x, y, width: this.renderWidth, height: this.renderHeight };
        if (this.width/this.height > this.renderWidth/this.renderHeight) {
            result.height = (this.renderWidth / this.width) * this.height;
            result.y += this.renderHeight - result.height;
        } else {
            result.width = (this.renderHeight / this.height) * this.width;
            result.x += (this.renderWidth - result.width) / 2;
        }
        this.ctx.drawImage( this.img, result.x, result.y, result.width, result.height );
    }
}

export class StatefulSprite extends Sprite {
    stateTick = 1000; // ms

    fillBuffer() {
        SpriteBuffer[ this.id ] = [];
        this.states.forEach( drawState => {
            let buffer = this.createBuffer();
            drawState( buffer.ctx );
            SpriteBuffer[ this.id ].push( buffer.canvas );
        });
    }

    get state() {
        let state = Math.floor( Date.now() % (this.stateTick * 2) / this.stateTick );
        return state === 2 ? 1 : state;
    }

    get img() {
        return SpriteBuffer[ this.id ][ this.state ];
    }
}
