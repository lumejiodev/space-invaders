import { PlayerBulletColor } from '../../constants/Colors';
import { PlayerBulletWidth, PlayerBulletHeight } from '../../constants/Sizes';

export default function PlayerBullet( position, topAnchor ) {
    const topPosition = topAnchor - PlayerBulletHeight;
    const fireTime = Date.now();

    this.getRelativePosition = function() {
        return (Date.now() - fireTime) / this.speed;
    };

    this.render = function() {
        const relativePosition = this.getRelativePosition();
        if (relativePosition > 1) {
            this.alive = false;
        } else {
            let vertPosition = (topPosition + PlayerBulletHeight) * (1 - relativePosition) - PlayerBulletHeight;
            this.ctx
                .style( PlayerBulletColor )
                .fR( position, vertPosition, PlayerBulletWidth, PlayerBulletHeight );
        }

    };
}

PlayerBullet.prototype.alive = true;
PlayerBullet.prototype.speed = 1000;
