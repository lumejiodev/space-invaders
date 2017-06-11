import { CanvasWidth, CanvasHeight } from './constants/CanvasSizes';
import requestAnimationFrame from './utils/requestAnimationFrame';

import Background from './elements/Background';

export default class SpaceInvaders {
    elements = [];

    constructor( canvas ) {
        this.canvas = canvas;
        this.setCanvasSizes();
        this.init();
    }

    setCanvasSizes() {
        this.canvas.width = CanvasWidth;
        this.canvas.height = CanvasHeight;
        this.ctx = this.canvas.getContext('2d');
    }

    init() {
        this.addElement( Background );
        requestAnimationFrame( this.renderFrame );
    }

    addElement( Element ) {
        this.elements.push( new Element( this.ctx ) );
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
