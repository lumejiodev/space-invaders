import { CanvasWidth, CanvasHeight } from './constants/Sizes';
import requestAnimationFrame from './utils/requestAnimationFrame';

import Background from './elements/Background';
import Player from './elements/Player';
import Tests from './elements/Tests';

export default class SpaceInvaders {
    elements = [];

    constructor( canvas ) {
        this.canvas = canvas;
        this.initCanvasSizes();
        this.initGame();
    }

    initCanvasSizes() {
        this.setCanvasSizes();
        window.addEventListener( 'resize', ::this.setCanvasSizes );
    }

    setCanvasSizes() {
        this.canvas.setDimensions( CanvasWidth, CanvasHeight, false, true );
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmooth( false );
    }

    initGame() {
        this.addElement( Background );
        this.addElement( Player );
        this.addElement( Tests );
        requestAnimationFrame( this.renderFrame );
    }

    addElement( Element ) {
        this.elements.push( new Element( this ) );
    }

    renderElements() {
        this.elements.forEach( item => item.render() );
    }

    renderFrame = () => {
        this.ctx.clearCanvas();
        this.renderElements();
        requestAnimationFrame( this.renderFrame );
    };
}
