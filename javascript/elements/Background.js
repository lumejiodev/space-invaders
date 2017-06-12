import Element from './Element';
import { FrameWidth, FieldWidth, BorderWidth, BorderTopPosition } from '../constants/Sizes';
import { BackgroundColor, PlayerColor } from '../constants/Colors';

export default class Background extends Element {
    render() {
        let { width, height } = this.ctx.canvas;
        this.ctx
            .style( BackgroundColor ).fR( 0, 0, width, height )
            .style( PlayerColor ).fR( FrameWidth, BorderTopPosition, FieldWidth, -BorderWidth );
    }
}
