import { CanvasWidth, CanvasHeight } from './constants/CanvasSizes';
import requestAnimationFrame from './utils/requestAnimationFrame';

export default class SpaceInvaders {
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
        requestAnimationFrame( this.renderFrame );
    }

    renderFrame = () => {
        requestAnimationFrame( this.renderFrame );
    };
}
