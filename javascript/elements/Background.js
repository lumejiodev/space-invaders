import Element from './Element';
import { BackgroundColor } from '../constants/Colors';

export default class Background extends Element {
    render() {
        let { width, height } = this.ctx.canvas;
        this.ctx.style( BackgroundColor ).fR( 0, 0, width, height );
    }
}
