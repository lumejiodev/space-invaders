import { CanvasWidth, CanvasHeight } from './constants/CanvasSizes';
import requestAnimationFrame from './utils/requestAnimationFrame';

import Background from './elements/Background';

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
    }

    initGame() {
        this.addElement( Background );
        requestAnimationFrame( this.renderFrame );
    }

    addElement( Element ) {
        this.elements.push( new Element( this ) );
    }

    renderElements() {
        this.elements.forEach( item => item.render() );
    }

    renderFrame = () => {
        this.ctx.clearRect( 0, 0, CanvasWidth, CanvasHeight );
        this.renderElements();
        requestAnimationFrame( this.renderFrame );
    };
}
