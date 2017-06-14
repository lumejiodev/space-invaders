import Element from './Element';
import { FrameWidth, FieldWidth, BorderWidth, BorderTopPosition } from '../constants/Sizes';
import { BackgroundColor, PlayerColor } from '../constants/Colors';

export default class Frame extends Element {
    render() {
        let { width, height } = this.ctx.canvas;
        this.ctx
            .style( PlayerColor ).fR( FrameWidth, BorderTopPosition, FieldWidth, -BorderWidth )
            .style( BackgroundColor )
                .fR( 0, 0, width, FrameWidth )
                .fR( 0, 0, FrameWidth, height)
                .fR( width, 0, -FrameWidth, height)
                .fR( 0, BorderTopPosition, width, height-BorderTopPosition );
    }
}
