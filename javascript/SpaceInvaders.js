import { CanvasWidth, CanvasHeight } from './constants/CanvasSizes';

export default class SpaceInvaders {
    constructor( canvas ) {
        this.canvas = canvas;
        this.setCanvasSizes();
    }

    setCanvasSizes() {
        this.canvas.width = CanvasWidth;
        this.canvas.height = CanvasHeight;
        this.ctx = this.canvas.getContext('2d');
    }
}
