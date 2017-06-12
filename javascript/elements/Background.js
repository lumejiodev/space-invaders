import Element from './Element';
import { CanvasHeight, BorderWidth, BorderOffset } from '../constants/Sizes';
import { BackgroundColor, PlayerColor } from '../constants/Colors';

export default class Background extends Element {
    render() {
        let { width, height } = this.ctx.canvas;
        this.ctx
            .style( BackgroundColor ).fR( 0, 0, width, height )
            .style( PlayerColor ).fR( 0, Math.round( CanvasHeight - BorderOffset ), width, -BorderWidth );
    }
}
