import Element from './Element';
import { BackgroundColor } from '../constants/Colors';

export default class Background extends Element {
    render() {
        let { canvas } = this.ctx;
        this.ctx.fillStyle = BackgroundColor;
        this.ctx.fillRect( 0, 0, canvas.width, canvas.height );
    }
}
